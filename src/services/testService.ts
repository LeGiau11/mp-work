import clientPromise from "@/libs/mongodb";

export async function GetUsers() {
  try {
    const client = await clientPromise; // Wait for MongoDB client connection
    const db = client.db("my_work"); // Use the correct database name
    console.log("Connected to MongoDB successfully");

    // Fetch users from the "users" collection
    const users = await db.collection("users").find().toArray(); // Ensure this collection exists
    console.log("Fetched users:", users);

    client.close();
    return { success: true, data: users };
  } catch (ex) {
    console.log("ex", ex);
    return { success: false, error: "Unable to fetch user" };
  }
}

export async function createUser(userData: {
  user_name: string;
  password: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db("my_work"); // Đảm bảo rằng tên database là đúng
    console.log("Connected to MongoDB successfully");

    const result = await db.collection("users").insertOne(userData); // Chèn dữ liệu vào collection
    client.close();
    return { success: true, data: result };
  } catch (ex) {
    console.error("Error creating user:", ex);
    return { success: false, error: "Unable to create user" };
  }
}
