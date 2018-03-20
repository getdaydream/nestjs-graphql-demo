/**
 *
 */
import * as got from 'got';
import * as Router from 'koa-router';
import * as querystring from 'querystring';
import { config } from '../../config';
import { User } from '../../model/user';
import { genToken } from '../../util';

export const router = new Router();

/**
 * Authorization options for OAuth Apps
 * https://developer.github.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/
 */

// Users are redirected to request their GitHub identity
router.get('/github', async ctx => {
  ctx.body = {
    redirect: `https://github.com/login/oauth/authorize?client_id=${
      config.GITHUB_OAUTH.clientID
    }&scope=${config.GITHUB_OAUTH.scope}`
  };
});

/**
 * receive code from user, exchange this code for an access token from github
 */
router.get('/github/callback', async ctx => {
  const { code } = ctx.query;
  try {
    const tokenResponse = await got.post(
      `https://github.com/login/oauth/access_token`,
      {
        body: querystring.stringify({
          client_id: config.GITHUB_OAUTH.clientID,
          client_secret: config.GITHUB_OAUTH.clientSecret,
          code
        })
      }
    );
    const { access_token } = querystring.parse(tokenResponse.body);
    console.log(`access_token ${access_token}`);
    // use access_token to request user data from github
    const userResponse = await got.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`
      }
    });
    /**
     * 用户信息数据结构
     * https://developer.github.com/v3/users/#get-the-authenticated-user
     */
    const githubUser = JSON.parse(userResponse.body);
    const githubID = githubUser.id;
    const oldUser = await User.findOne({ githubID });
    // 如果用户还不存在
    if (!oldUser) {
      const user = new User({
        githubID,
        githubUsername: githubUser.name,
        avatar: githubUser.avatar_url || githubUser.gravatar_id,
        githubAccessToken: access_token
      });
      const result = await user.save();
      console.log(result);
      const token = genToken(result._id);
      console.log(`token is ${token}`);
      ctx.body = {
        token
      };
    } else {
      const token = genToken(oldUser._id);
      ctx.body = {
        token
      };
    }
  } catch (e) {
    console.log(`/github/callback failed`);
    console.log(e);
  }
});