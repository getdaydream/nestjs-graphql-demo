/**
 * 用户
 */
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String,unique: true },
  password: String,
  username: { type: String },
  avatar: { type: String },
  githubID: { type: String },
  githubUsername: { type: String },
  githubAccessToken: { type: String },
  create_at: { type: Date,default: Date.now },
  update_at: { type: Date,default: Date.now },
});

UserSchema.methods.comparePassword = async function(password: string) {
  return password === this.password;
};

UserSchema.pre('save', function(next) {
  const now = new Date();
  this.update_at = now;
  next();
});

export const User = model('User', UserSchema);
