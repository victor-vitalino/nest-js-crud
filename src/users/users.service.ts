import { Injectable } from '@nestjs/common';

interface UserData {
  email: string;
  id?: number;
  name: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

@Injectable()
export class UsersService {
  private users = [
    {
      email: 'john.doe@example.com',
      id: 1,
      name: 'John Doe',
      role: 'ENGINEER',
    },
    {
      email: 'jane.smith@example.com',
      id: 2,
      name: 'Jane Smith',
      role: 'ADMIN',
    },
    {
      email: 'emily.jones@example.com',
      id: 3,
      name: 'Emily Jones',
      role: 'INTERN',
    },
    {
      email: 'michael.brown@example.com',
      id: 4,
      name: 'Michael Brown',
      role: 'ENGINEER',
    },
    {
      email: 'laura.white@example.com',
      id: 5,
      name: 'Laura White',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  create(user: UserData) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      ...user,
      id: usersByHighestId[0].id + 1,
    };
    this.users.push(newUser);

    return newUser;
  }
  update(id: number, updatedUser: UserData) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const removerUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removerUser;
  }
}
