# getdaydream-server

> Server for getdaydream.

## Dependencies
- [koa-router](https://github.com/alexmingoia/koa-router)
- [got](https://github.com/sindresorhus/got): Simplified HTTP requests.
- middlewares
  - [koa-bodyparser](https://github.com/koajs/bodyparser): A body parser for koa, base on co-body. support json, form and text type body.
  - [koa2-cors](https://github.com/zadzbw/koa2-cors)
  - [koa-jwt](https://www.npmjs.com/package/koa-jwt): This module lets you authenticate HTTP requests using JSON Web Tokens in your Koa (node.js) applications.

## Bug
- request github access_token twice

## TODO

* upload avatar
* Gravatar random avatar
* email verification
* [移花接木：针对OAuth2的攻击](http://insights.thoughtworkers.org/attack-aim-at-oauth2/)
* token expire
* 密码非对称加密
* https