import { Controller, Get, Param } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: "1",
      name: "Max W",
      email: "max@gmail.com"
    },
    {
      id: "2",
      name: "Max 2",
      email: "max@gmail.com"
    }
  ]

  @Get()
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    if (this.users.find(user => user.id === id)) return this.users.find(user => user.id === id)
    else return { message: "User not found" }
  }
}

