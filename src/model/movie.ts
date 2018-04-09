/**
 * 电影
 */
import { model, Schema } from 'mongoose';
import * as path from 'path';
import { config } from '../config';

const MovieSchema = new Schema({
  from: {
    type: String,
    enum: ['douban', 'imdb'],
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
    enum: ['movie', 'tv', 'unknown'],
  },
  // 评分
  ratingValue: Number,
  // 评价人数
  ratingCount: Number,
  // 评一星到五星的人数权重
  ratingOnWeight: [String],
  // 豆瓣海报
  doubanPoster: String,
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
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },

  // tv only
  // 所有季对应的id
  seasons: [String],
  // tv only
  // 集数
  episodeCount: [String],

  // 海报在本地是否有缓存
  posterCache: {
    type: String,
    enum: ['fulfilled', 'rejected'],
  },

  // deprecated
  // poster : 作为虚拟属性，如果本地缓存，就用本地的，否则就用doubanPoster
  // maybe deprecated
  //   traversed
  //   html
});

MovieSchema.pre('save', function(next) {
  const now = new Date();
  this.update_at = now;
  next();
});

// 电影的海报如果在服务器已经缓存，就使用服务器的
MovieSchema.virtual('poster').get(function() {
  if (
    this.doubanPoster &&
    this.posterCache &&
    this.posterCache === 'fulfilled'
  ) {
    return `${config.host}/poster/${this.id}${path.extname(this.doubanPoster)}`;
  } else {
    return this.doubanPoster;
  }
});

MovieSchema.index({ ratingCount: -1 });
MovieSchema.index({ ratingValue: -1 });
MovieSchema.index({ title: -1 });
MovieSchema.index({ update_at: 1 });

export const Movie = model('Movie', MovieSchema);
