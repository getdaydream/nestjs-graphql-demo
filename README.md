# README

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## REFFERENCE

- [nestjs-boilerplate](https://github.com/Vivify-Ideas/nestjs-boilerplate)
- [Node.js 最佳实践](https://github.com/i0natan/nodebestpractices/blob/master/README.chinese.md#1-project-structure-practices)
- [node-interview](https://elemefe.github.io/node-interview/#/sections/zh-cn/)

## DEP

- [express-rate-limit](https://github.com/nfriedly/express-rate-limit): Use to limit repeated requests to public APIs and/or endpoints such as password reset.

## UNKONOWN

- cookie 过期处理

## TODO

- [passport](https://github.com/jaredhanson/passport)
- 在 `.module.ts` 中引用环境变量
- websocket 聊天
- 装饰器
- OpenAPI (Swagger)
- 测试
- 微服务
- 热重载
- [type-graphql](https://typegraphql.ml/)

## 备忘

- `nodemon.json`中`exec`添加`--file`参数，否则不会加载本地声明文件
- 跨域 cookie 设置不能使用 127.0.0.1 或者 localhost，前后端都是
