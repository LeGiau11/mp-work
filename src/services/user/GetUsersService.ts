import { WithId, Document } from "mongodb";

import clientPromise from "@/libs/mongodb";
import { User } from "@/models/User";

export default async function GetUsersService() {
  const client = await clientPromise;
  try {
    const db = client.db("my_work");
    console.log("Connected to MongoDB successfully");

    const usersWithId: WithId<Document>[] = await db
      .collection("users")
      .find()
      .toArray();

    const users: User[] = usersWithId.map((user) => {
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
        isActive: user.isActive,
        name: user.name,
      };
    });

    return { success: true, data: users };
  } catch (ex) {
    console.log("ex", ex);
    return { success: false, error: "Unable to fetch user" };
  } finally {
    client.close();
  }
}
