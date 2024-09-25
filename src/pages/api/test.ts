import { NextApiRequest, NextApiResponse } from "next";
import { GetUsers } from "@/services/testService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await GetUsers();

  return result.success
    ? res.status(200).json(result.data)
    : res.status(500).json(result.error);
}
