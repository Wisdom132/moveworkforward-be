import { getUsers, createUser, findByEmail } from "../services/user";


interface IHelperResponse {
  success: boolean;
  status: number;
  data?: any;
  error?: string;
  message?: string;
}


export const createUserControler = async (payload: any): Promise<IHelperResponse> => {
  
  let exist = await findByEmail(payload.email)
  if (exist) {
    return {
      success: false,
      status: 400,
      error: "Account Already in use",
    };
  }
    const user = await createUser(payload);
    return {
      success: true,
      status: 200,
      message: "Account successfully created",
      data: user,
    };
}


export const getUserController = async (): Promise<IHelperResponse> => {
  const users = await getUsers();
  return {
    success: true,
    status: 200,
    data: users,
  };
};