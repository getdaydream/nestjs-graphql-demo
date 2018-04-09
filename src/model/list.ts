/**
 * 清单
 */
import { model, Schema, SchemaTypes } from 'mongoose';

const ListSchema = new Schema({
  ownerID: { type: SchemaTypes.ObjectId, required: true },
  state: {
    type: String,
    enum: ['todo', 'processing', 'complete'],
    default: 'todo',
  },
  // 默认保留的分类 movie | book
  project: String,
  resource: SchemaTypes.ObjectId,

  content: String,
  subLists: [
    {
      content: String,
      completed: { type: Boolean, default: false },
    },
  ],
  priority: { type: Number, max: 5, min: 1, default: 2 },
  schedule: {
    before: Date,
    cycle: { type: String, enum: ['day', 'week', 'month', 'season', 'year'] },
  },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

ListSchema.pre('save', function(next) {
  this.update_at = new Date();
  next();
});

ListSchema.index({ userID: -1 });
ListSchema.index({ update_at: -1 });

export const List = model('List', ListSchema);
