import { useEffect, useState } from "react";

interface User {
  _id: string;
  user_name: string;
  password: string;
}

export default function Login() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const result = await fetch("http://localhost:3000/api/test");
    if (!result.ok) {
      console.error("Failed to fetch users");
      setUsers([]);
    }

    const users = await result.json();
    setUsers(users);
  };

  const handleCreateUser = async () => {
    const userData = {
      user_name: "john_doe",
      password: "password123",
    };

    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("User created successfully:", data);
    } else {
      console.error("Failed to create user:", res.statusText);
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Tao moi</button>
      <h1>Danh sách bài viết</h1>
      <ul>
        {!!users.length &&
          users.map((user) => (
            <li key={user._id}>
              <h2>{user.user_name}</h2>
              <p>{user.password}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
