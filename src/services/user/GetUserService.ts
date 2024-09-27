import { WithId } from "mongodb";

import { connect, disconnect } from "@/libs/mongodb";
import { User } from "@/models/User";

export default async function GetUserService(field: string, key: string) {
  const db = await connect();
  let user: User = {
    id: "",
    username: "",
    password: "",
    isActive: false,
    name: "",
  };
  try {
    if (!field) throw new Error("Chưa có field. Hãy nhập vào");

    if (!key) throw new Error("Chưa có key. Hãy nhập vào");

    const query = { [field]: key };

    const data = await db.collection("users").findOne<WithId<User>>(query);

    if (!data) throw new Error("Không tìm thấy User");

    for (const item in data) {
      if (item === "_id") {
        user.id = data[item].toString() || "";
      } else if (item in user) {
        const key = item as keyof User; // Ensure item is a key of User
        const value = data[key]; // Get the value from data
        const obj = {
          [key]: value,
        };
        user = Object.assign(user, obj);
      }
    }

    return { success: true, data: user };
  } catch (ex) {
    console.log("ex", ex);

    return {
      success: false,
      error: ex instanceof Error ? ex.message : "Unable to fetch user",
      data: user,
    };
  } finally {
    disconnect();
  }
}
