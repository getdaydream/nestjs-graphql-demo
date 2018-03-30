/**
 * 用户登录注册
 */
import * as Router from 'koa-router';
import { User } from '../../model/user';
import { genToken } from '../../util';

export const router = new Router();

router.get('/', async ctx => {
  console.log(ctx.body);
  ctx.body = { result: 'success' };
});

// 用户注册
router.post('/signup', async ctx => {
  const { username, email, password } = ctx.request['body'];
  try {
    if (await User.findOne({ username })) {
      ctx.body = {
        error: '昵称 已被使用，换一个吧'
      };

      return;
    }
    if (await User.findOne({ email })) {
      ctx.body = {
        error: '邮箱 已被使用，换一个吧'
      };

      return;
    }
    const user = new User({
      username,
      email,
      password
    });
    const { _id } = await user.save();
    ctx.body = {
      token: genToken(_id),
      success: '恭喜你 注册成功'
    };
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});

// 用户登录
router.post('/login', async ctx => {
  const { email, password } = ctx.request['body'];
  try {
    const user = await User.findOne({ email });
    if (!user) {
      ctx.body = {
        error: '未注册的邮箱'
      };

      return;
    }
    // FIXME: possible-timing-attack
    const isMatch = user['password'] === password;
    if (!isMatch) {
      ctx.body = {
        error: '密码错误'
      };

      return;
    }
    console.log(user);
    ctx.body = {
      token: genToken(user._id),
      user: {
        avatar: user['avatar'],
        username: user['username'] || user['githubUsername'],
        userID: user['userID']
      },
      message: '登录成功'
    };
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});

// 绑定第三方账号
router.post('/bind', async () => {
  // TODO
});
