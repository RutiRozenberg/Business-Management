
import mongoose, { Schema, Model } from 'mongoose';

interface UserDetails {
  name: string;
  email: string;
  password: string;
}

interface User extends UserDetails{
  _id: string;
}

const userSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String,
});

const userModel: Model<User> = mongoose.model<User>('user', userSchema);

export { userModel , User , UserDetails};