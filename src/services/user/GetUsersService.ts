import { WithId, Document } from 'mongodb';

import { ResponseData } from '@/common';
import { User } from '@/models/User';
import { connect, disconnect } from '@/libs/mongodb';

export default async function GetUsersService(): Promise<ResponseData<User[]>> {
  const db = await connect();
  try {
    const usersWithId: WithId<Document>[] = await db
      .collection('users')
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

    const result: ResponseData<User[]> = {
      success: true,
      data: users,
      message: 'OK',
    };

    return result;
  } catch (ex) {
    console.log('ex', ex);

    const result: ResponseData<User[]> = {
      success: false,
      data: [],
      message: 'Unable to fetch user',
    };
    return result;
    
  } finally {
    disconnect();
  }
}
