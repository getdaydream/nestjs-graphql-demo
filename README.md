# getdaydream-server

> Server for getdaydream.

## Dependencies
- [koa-router](https://github.com/alexmingoia/koa-router)
- [got](https://github.com/sindresorhus/got): Simplified HTTP requests.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): JSON Web Token signing and verification.
- middlewares
  - [koa-body](https://github.com/dlau/koa-body): koa body parser middleware.
  - [koa2-cors](https://github.com/zadzbw/koa2-cors)
  - [koa-jwt](https://github.com/koajs/jwt): This module lets you authenticate HTTP requests using JSON Web Tokens in your Koa (node.js) applications.
  - [koa-static](https://github.com/koajs/static): Koa static file serving middleware, wrapper for koa-send.
  - [koa-logger](https://github.com/koajs/logger): Development style logger middleware for koa.

## Bug
- request github access_token twice
- 上传路径

## TODO
* 多条件搜索过慢
* 如果originalTitle == title,删除originalTitle字段
* data validation
* email verification
* [koa2-jwt-demo](https://github.com/yunzaifei/koa2-jwt-demo)
* ts and mongoose
* Gravatar random avatar
* [移花接木：针对OAuth2的攻击](http://insights.thoughtworkers.org/attack-aim-at-oauth2/)
* token expire
* 密码非对称加密
* https
* git flow
* IMDB
* pocket api
* 数据库

## Q
* mongoose query async
* post 传送数组参数