import qiniu from 'qiniu';
import { getConnection } from 'typeorm';
import { Image } from 'entity';
import { keysSnakeCase } from 'util/tools';

const mac = new qiniu.auth.digest.Mac(
  process.env.QINIU_ACCESS_KEY,
  process.env.QINIU_SECRET_KEY,
);

const options = {
  scope: process.env.QINIU_BUCKET,
  // 单位为秒
  expires: 10,
  // 自定义响应内容 http://developer.qiniu.com/kodo/manual/1654/response-body
  returnBody: JSON.stringify({
    key: '$(key)',
    name: '$(fname)',
    size: '$(fsize)',
    type: '$(mimeType)',
    hash: '$(etag)',
    width: '$(imageInfo.width)',
    height: '$(imageInfo.height)',
  }),
};

const putPolicy = new qiniu.rs.PutPolicy(options);

export const fileController = {
  async certificate(ctx) {
    const uploadToken = putPolicy.uploadToken(mac);
    return (ctx.body = {
      token: uploadToken,
    });
  },
  async publish(ctx) {
    let { files } = ctx.request.body;
    const { id: user_id } = ctx.state.user;
    files = files.map(f => {
      f.user_id = user_id;
      return keysSnakeCase(f);
    });
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Image)
      .values(files)
      .execute();
    ctx.body = result;
  },
};
