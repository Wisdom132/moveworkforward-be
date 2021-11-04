import { RequestHandler } from "express";
import { createUserControler, getUserController } from "../controller/user";



export const registerUser: RequestHandler = async (req, res) => {
  try {
      const {error,success, status,data,message} = await createUserControler(req.body);
      return res
        .status(status)
        .json({ success, data: data, error, message });
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      error: "Internal server error",
    });
  }
};


export const users: RequestHandler = async (req, res) => {
  try {
    const { success, error, status, data, message } = await getUserController();
    return res.status(status).json({ success, data, message });
  } catch (error) {
    return res.json({
      success: false,
      error: "Internal server error",
    });
  }
};
