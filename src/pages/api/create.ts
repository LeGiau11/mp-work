import { createUser } from "@/services/testService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userData = req.body; // Dữ liệu người dùng từ request body
    const result = await createUser(userData); // Gọi hàm createUser

    if (result.success) {
      return res.status(201).json(result.data); // Trả về status 201 nếu thành công
    } else {
      return res.status(500).json({ message: result.error }); // Trả về lỗi nếu thất bại
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`); // Xử lý phương thức không hỗ trợ
  }
}
