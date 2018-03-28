/**
 * 用户发帖
 */
import * as Router from 'koa-router';
import { Post } from '../../model/post';

export const router = new Router();

// 创建新的帖子
router.post('/', async ctx => {
  const { content, category } = ctx.request.body;
  const userID = ctx.state.user.id;
  const post = new Post({
    content,
    category,
    userID
  });
  try {
    const result = await post.save();
    ctx.body = {
      success: '创建帖子成功',
      id: result.id
    };
  } catch (e) {
    ctx.throw('创建帖子失败');
  }
});

// 更新帖子
router.put('/', async ctx => {
  const { content, id, category } = ctx.request.body;
  const userID = ctx.state.user.id;
  try {
    const post = await Post.findOne({ userID, _id: id });
    if (post) {
      Object.assign(post, { content, category });
      const result = await post.save();
      ctx.body = {
        success: '更新帖子成功',
        post: {
          id: result._id,
          category,
          content,
          update_at: post['update_at']
        }
      };
    } else {
      ctx.body = {
        error: '不存在的帖子'
      };
    }
  } catch (e) {
    ctx.throw('更新帖子失败');
  }
});

// 删除帖子
router.delete('/', async ctx => {
  const { id } = ctx.request.body;
  try {
    await Post.findByIdAndRemove(id);
    ctx.body = {
      success: '删除帖子成功'
    };
  } catch (e) {
    ctx.throw('删除帖子失败');
  }
});
