import { TUser } from './user.interface';
import { User } from './user.model';

const createUserService = async (userData: TUser) => {
  // check if user already exist
  if (await User.isUserExist(userData.userId)) {
    throw new Error('User already exist!');
  }

  // create user to db
  const result = await User.create(userData);
  return result;
};

const getAllUserService = async () => {
  const result = await User.find();

  return result;
};

const getSingleUserService = async (userId: number) => {
  const result = await User.findOne({ userId });

  return result;
};

export const UserService = {
  createUserService,
  getAllUserService,
  getSingleUserService,
};
