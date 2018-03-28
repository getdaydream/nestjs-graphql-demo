/**
 * 帖子分为多种类型
 * article：markdown 文章
 * draft：article的草稿
 * moments：动态
 */
import { model, Schema } from 'mongoose';

// tslint:disable:variable-name
const PostSchema = new Schema({
  // 用户id
  userID: {
    type: String,
    required: true
  },
  // 帖子类型
  category: {
    type: String,
    enum: ['article','draft' ,'moments']
  },
  // 帖子内容
  content: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

PostSchema.pre('save', function(next) {
  const now = new Date();
    // tslint:disable:no-invalid-this
  this.update_at = now;
  next();
});

export const Post = model('Post', PostSchema);