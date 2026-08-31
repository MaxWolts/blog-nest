import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';


function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.usersService.getUserById(id);
    if (user) return user;
    else throw new NotFoundException("User not found");
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    if (!isValidEmail(userData.email)) {
      throw new NotFoundException("Invalid email format");
    }
    const newUser = { ...userData, id: Date.now().toString() };
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }


  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.usersService.update(id, userData);
  }
}

