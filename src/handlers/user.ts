import { RequestHandler } from "express";
import { createUserControler, getUserController } from "../controller/user";



export const registerUser: RequestHandler = async (req, res) => {
  try {
      const user = await createUserControler(req.body);
      return res.status(200).json({ success: true, data: user, message:"Success" });
  } catch (error) {
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
