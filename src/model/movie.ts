/**
 * 电影
 */
import { model, Schema } from 'mongoose';

// tslint:disable:variable-name
const MovieSchema = new Schema({
  from: {
    type: String,
    enum: ['douban']
  },
  id: { type: String, unique: true },
  // 中文名
  title: String,
  // 原名
  original_title: String,
  // 又名
  aka: [String],
  // 年代
  year: String,
  // 评分
  ratingValue: Number,
  // 评价人数
  ratingCount: Number,
  // 海报
  poster: String,
  // 制片国家 / 地区
  countries: [String],
  // 类型
  genres: [String],
  // 条目分类, movie或者tv
  subtype: {
    type: String,
    enum: ['movie', 'tv']
  },
  // 剧情简介
  summary: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

MovieSchema.pre('save', function(next) {
  const now = new Date();
  // tslint:disable:no-invalid-this
  this.update_at = now;
  next();
});

export const Movie = model('Movie', MovieSchema);
