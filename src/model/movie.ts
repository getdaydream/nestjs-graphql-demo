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
  html: String,
  id: { type: String, unique: true },
  // 中文名
  title: String,
  // 原名
  originalTitle: String,
  // 又名
  aka: [String],
  // 年代
  year: Number,
  // 条目分类
  subtype: {
    type: String,
    enum: ['movie', 'tv', 'unknown']
  },
  // 评分
  ratingValue: Number,
  // 评价人数
  ratingCount: Number,
  // 评一星到五星的人数权重
  ratingOnWeight: [String],
  // 海报
  poster: String,
  // 导演
  directors: [{ id: String, name: String }],
  // 编剧
  writers: [{ id: String, name: String }],
  // 主演
  casts: [{ id: String, name: String }],
  // 制片国家 / 地区
  countries: [String],
  // 语言
  languages: [],
  // 类型
  genres: [String],
  // 片长
  durations: [String],
  // 首播日期或上映日期
  pubDates: [String],
  // 剧情简介
  summary: String,
  // 相关影视推荐
  recommendations: [String],
  // 用户标签
  userTags: [String],
  imdbID: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  },

  // tv only
  // 所有季对应的id
  seasons: [String],
  // 集数
  episodeCount: [String]
});

MovieSchema.pre('save', function(next) {
  const now = new Date();
  // tslint:disable:no-invalid-this
  this.update_at = now;
  next();
});

MovieSchema.index({ ratingValue: -1 });
MovieSchema.index({ ratingCount: -1 });
MovieSchema.index({ id: -1 });
MovieSchema.index({ title: -1 });
MovieSchema.index({ update_at: 1 });



export const Movie = model('Movie', MovieSchema);
