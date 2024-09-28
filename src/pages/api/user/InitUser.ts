import { NextApiRequest, NextApiResponse } from "next";

import { POST } from "@/common";
import CreateInitUser from "@/services/user/InitUserService";
import { disconnect } from "@/libs/mongodb";

/**
 * Handler 
 * 
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns status
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === POST) {
    const password: string = "mp_work@123";
    try {
      const data = await CreateInitUser(password);

      if (!data?.success) return res.status(401).json({ message: data?.error });

      return res.status(200).json({ message: "Create user successfully!" });
    } catch (ex) {
      return res.status(500).json({
        message: ex instanceof Error ? ex.message : "Internal Server Error",
      });
    } finally {
      disconnect();
    }
  } else {
    res.setHeader("Allow", POST);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
