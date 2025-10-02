import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return { user, token, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return { user, token, refreshToken };
};
