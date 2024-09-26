import { WithId, Document } from "mongodb";

import clientPromise from "@/libs/mongodb";
import { User } from "@/models/User";

export default async function GetUserService(field: string, key: string) {
  const client = await clientPromise;
  try {
    if (!field) throw new Error("Chưa có field. Hãy nhập vào");

    if (!key) throw new Error("Chưa có key. Hãy nhập vào");

    const db = client.db("my_work");
    console.log("Connected to MongoDB successfully");

    const query = { [field]: key };

    const data: WithId<Document> | null = await db
      .collection("users")
      .findOne(query);

    if (!data) throw new Error("Không tìm thấy User");

    const user: User = {
      id: data._id.toString(),
      username: data.username,
      password: data.password,
      isActive: data.isActive,
      name: data.name,
    };

    return { success: true, data: user };
  } catch (ex) {
    console.log("ex", ex);

    return {
      success: false,
      error: ex instanceof Error ? ex.message : "Unable to fetch user",
    };
  } finally {
    client.close();
  }
}
