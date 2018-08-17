import qiniu from 'qiniu';

const mac = new qiniu.auth.digest.Mac(
  process.env.QINIU_ACCESS_KEY,
  process.env.QINIU_SECRET_KEY,
);

const options = {
  scope: 'daydream',
  // 单位为妙
  expires: 10,
};

const putPolicy = new qiniu.rs.PutPolicy(options);

export const fileController = {
  async certificate(ctx) {
    const uploadToken = putPolicy.uploadToken(mac);
    return ctx.body = {
      token: uploadToken,
    };
  },
};
