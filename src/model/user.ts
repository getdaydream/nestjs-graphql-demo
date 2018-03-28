/**
 * 用户
 */
import { model, Schema } from 'mongoose';

// tslint:disable:variable-name
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  nickname: { type: String },
  avatar: { type: String },
  githubID: { type: String },
  githubUsername: { type: String },
  githubAccessToken: { type: String },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.comparePassword = async function(password: string) {
  // tslint:disable:no-invalid-this
  // tslint:disable-next-line:possible-timing-attack
  return password === this.password;
};

UserSchema.pre('save', function(next) {
  const now = new Date();
  this.update_at = now;
  next();
});

export const User = model('User', UserSchema);