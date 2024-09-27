import { WithId, Document } from "mongodb";

import { connect, disconnect } from "@/libs/mongodb";
import { User } from "@/models/User";

export default async function GetUsersService() {
  const db = await connect();
  try {
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
    disconnect();
  }
}
