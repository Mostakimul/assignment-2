/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder, TUser } from './user.interface';
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
  // check if user already exist
  if (!(await User.isUserExist(userId))) {
    throw new Error();
  }

  const result = await User.findOne({ userId });

  return result;
};
const updateUser = async (userId: string, payload: Partial<TUser>) => {
  // check if user already exist
  if (!(await User.isUserExist(Number(userId)))) {
    throw new Error();
  }
  const { fullName, address, hobbies, ...userData } = payload;

  const updatedUserData: Partial<TUser> = { ...userData };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach((key) => {
      const nameKey = `fullName.${key}` as keyof Partial<TUser>;
      (updatedUserData as any)[nameKey] =
        fullName[key as keyof typeof fullName];
    });
  }
  if (address && Object.keys(address).length > 0) {
    Object.keys(address).forEach((key) => {
      const addressKey = `address.${key}` as keyof Partial<TUser>;
      (updatedUserData as any)[addressKey] =
        address[key as keyof typeof address];
    });
  }

  if (hobbies) {
    const result = await User.findOne({ userId });
    if (result) {
      updatedUserData.hobbies = [...(result.hobbies ?? []), ...hobbies];
    }
  }

  const result = await User.findOneAndUpdate(
    { userId: userId },
    updatedUserData,
    {
      new: true,
    },
  );

  return result;
};

const deleteUserService = async (userId: number) => {
  // check if user already exist
  if (!(await User.isUserExist(userId))) {
    throw new Error();
  }
  const result = await User.deleteOne({ userId });

  return result;
};

const newProductAddService = async (userId: string, payload: TOrder) => {
  // check if user already exist
  if (!(await User.isUserExist(Number(userId)))) {
    throw new Error();
  }

  let result = null;
  const user = await User.findOne({ userId });
  if (user) {
    user.orders = [...(user.orders ?? []), payload];
    result = await User.findOneAndUpdate({ userId: userId }, user);
  }

  return result;
};

export const UserService = {
  createUserService,
  getAllUserService,
  getSingleUserService,
  updateUser,
  deleteUserService,
  newProductAddService,
};
