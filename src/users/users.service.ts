import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found');

      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found!');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      ...createUserDto,
      id: usersByHighestId[0].id + 1,
    };
    this.users.push(newUser);

    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
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
