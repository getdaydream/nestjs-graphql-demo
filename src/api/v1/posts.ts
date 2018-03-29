/**
 * 用户发帖
 */
import * as Router from 'koa-router';
import { Post } from '../../model/post';

export const router = new Router();

// 查询帖子
router.get('/', async ctx => {
  const { category, id } = ctx.query;
  let posts;
  try {
    // 如果提供了id,根据id查找
    if (id) {
      posts = [await Post.findById(id)]
    } else { //否则返回所有相应的帖子
      posts = await Post.find({ category }).sort({update_at: -1});
    }
    ctx.body = {
      success: '查询成功',
      posts: posts
        ? posts.map(post => {
            return {
              category,
              id: post._id,
              content: post['content'],
              title: post['title'],
              update_at: post['update_at']
            };
          })
        : []
    };
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});

// 创建新的帖子
router.post('/', async ctx => {
  const { content, category, title } = ctx.request.body;
  const userID = ctx.state.user.id;
  const post = new Post({
    title,
    content,
    category,
    userID
  });
  if (!category) {
    return (ctx.body = {
      error: '未指定帖子种类'
    });
  }
  try {
    const result = await post.save();
    ctx.body = {
      success: '创建帖子成功',
      id: result.id
    };
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});

// 更新帖子
router.put('/', async ctx => {
  const { content, id, category, title } = ctx.request.body;
  const userID = ctx.state.user.id;
  try {
    const post = await Post.findOne({ userID, _id: id });
    if (post) {
      // category 从draft变为article说明文章发布
      Object.assign(post, {
        content,
        title,
        category: category ? category : post['category']
      });
      console.log(content);
      console.log(post);
      const result = await post.save();
      ctx.body = {
        success: '更新帖子成功',
        post: {
          id: result._id,
          category,
          content,
          title,
          update_at: post['update_at']
        }
      };
    } else {
      ctx.body = {
        error: '不存在的帖子'
      };
    }
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});

// 删除帖子
router.delete('/', async ctx => {
  const { id } = ctx.query;
  try {
    await Post.findByIdAndRemove(id);
    ctx.body = {
      success: '删除帖子成功'
    };
  } catch (e) {
    ctx.body = {
      error: e
    };
  }
});
