import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { disconnect } from "@/libs/mongodb";
import GetUserService from "@/services/user/GetUserService";
import { User } from "@/models/User";
import { ResponseData } from "@/common/interface";

const JWT_SECRET = process.env.JWT_SECRET || "kongkong";
const EXPIRE = "1h";
/**
 * Hàm  login
 *
 * @param req NextApiRequest
 * @param res NextApiResponse
 *
 * Step 1: Kiểm tra method đầu vào
 * Step 2: Lấy thông tin user theo input username
 * Step 3: Kiểm tra kết quả dữ liệu trả về
 * Step 4: Kiểm tra thông tin Password có trùng khớp không
 * Step 5: Tạo token
 * Step 6: Trả lại token
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const data: ResponseData<User> = await GetUserService(
        "username",
        username
      );

      if (!data.success) return res.status(401).json({ message: data.error });

      const user: User = data.data;

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword)
        return res
          .status(401)
          .json({ message: "Invalid username or password" });

      const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: EXPIRE,
      });

      const result: ResponseData<string> = {
        success: true,
        data: token,
      };

      return res.status(200).json(result);
    } catch (ex) {
      console.log("Error->message:", ex);
      return res.status(500).json({
        message: ex instanceof Error ? ex.message : "Internal Server Error",
      });
    } finally {
      disconnect();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
