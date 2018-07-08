import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {
    security: {
      csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: (ctx) => ctx.ip === ctx.ip,
      },
    },
  };
  return config;
};
