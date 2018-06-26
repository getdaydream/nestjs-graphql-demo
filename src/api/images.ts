/**
 * 上传图片
 */
import * as fs from 'fs';
import * as Router from 'koa-router';
import * as path from 'path';
import { config } from '../config';
import { User } from '../model/user';

export const router = new Router();

// TODO 更换头像删除旧的 裁剪
// TODO refine
router.post('/', async ctx => {
  const { directory } = ctx.query;
  let filePaths = [];
  const files = ctx.request.body.files || {};
  console.log('files');
  console.log(files);

  Object.keys(files).forEach(key => {
    const file = files[key];
    const fileName = file.path.split('\\').pop();
    const dstPath = path.join(
      __dirname,
      `../../../upload/${directory}/`,
      fileName,
    );
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(dstPath);
    reader.pipe(writer);
    filePaths.push(fileName);
  });

  // 如果上传的是头像，保存用户的头像
  if (directory === 'avatar') {
    const { id } = ctx.state.user;
    const user = await User.findById(id);
    Object.assign(user, {
      avatar: `${config.host}/${directory}/${filePaths[0]}`,
    });
    await user.save();
  }

  filePaths = filePaths.map(p => `${config.host}/${directory}/${p}`);

  ctx.body = {
    success: '上传图片成功',
    images: filePaths,
  };
});

// 删除图片
router.delete('/', async ctx => {
  const { filename, directory } = ctx.query;
  const filePath = path.resolve(
    __dirname,
    `../../../upload/${directory}/`,
    filename,
  );
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      ctx.body = {
        success: '删除成功',
      };
    } catch (e) {
      ctx.body = {
        error: e,
      };
    }
  } else {
    ctx.body = {
      error: '不存在的文件',
    };
  }
});
