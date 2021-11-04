import User, { fields, userModel } from '../models/user';

export const createUser = async (payload: fields): Promise<fields> => {
  return User.create(payload);
};


export const getUsers = async (): Promise<any>=> {
  return User.find({});
};


export const findByEmail = async (email:string): Promise<any> => {
      return User.find({email:email});

}