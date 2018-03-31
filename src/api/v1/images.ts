/**
 * 上传图片
 */
import * as fs from 'fs';
import * as Router from 'koa-router';
import * as path from 'path';
import { config } from '../../config';
import { User } from '../../model/user';

export const router = new Router();

// TODO 更换头像删除旧的 裁剪
// TODO refine
router.post('/avatar', async ctx => {
  const filePaths = [];
  const files = ctx.request.body.files || {};
  console.log('files');
  console.log(files);

  Object.keys(files).forEach(key => {
    console.log('key');
    console.log(key);
    const file = files[key];
    const fileName = file.path.split('\\').pop();
    const dstPath = path.join(__dirname, '../../../upload/avatar/', fileName);

    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(dstPath);
    reader.pipe(writer);
    filePaths.push(fileName);
  });

  const { id } = ctx.state.user;
  const user = await User.findById(id);
  Object.assign(user, { avatar: `${config.host}/avatar/${filePaths[0]}` });
  await user.save();

  ctx.body = {
    success: '上传头像成功',
    avatar: `${config.host}/avatar/${filePaths[0]}`
  };
});
