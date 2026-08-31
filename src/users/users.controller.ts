import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
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
    const user = this.users.find(user => user.id === id);
    if (user) return user;
    else throw new NotFoundException("User not found");
  }

  @Post()
  createUser(@Body() userData: Omit<User, 'id'>) {
    if (!isValidEmail(userData.email)) {
      throw new NotFoundException("Invalid email format");
    }
    const newUser = { ...userData, id: Date.now().toString() };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) throw new NotFoundException("User not found");
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }


  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: Partial<Omit<User, 'id'>>) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) throw new NotFoundException("User not found");
    const updatedUser = { ...this.users[userIndex], ...userData };
    if (userData.email && !isValidEmail(userData.email)) {
      throw new NotFoundException("Invalid email format");
    }
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
}

