import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UpdateUserDto } from './user.dto';



@Injectable()
export class UsersService {

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

    findAll(): User[] {
        return this.users;
    }

    getUserById(id: string) {
        const position = this.findOne(id);
        if (position === -1) throw new Error("User not found")  ;
        const user = this.users[position];
        if (user.id === '1') {
          throw new ForbiddenException("Access to this user is forbidden");
        }
        return user;
    }

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    delete(id: string): User {
        const userIndex = this.findOne(id);
        const deletedUser = this.users.splice(userIndex, 1)[0];
        return deletedUser;
    }

    update(id: string, changes: UpdateUserDto): User {
      const position = this.findOne(id);
      const currentData = this.users[position];
      const updateUser = {
        ...currentData,
        ...changes
      }
      this.users[position] = updateUser;
      return updateUser;
    }


    private findOne(id: string) {
        const position = this.users.findIndex(user => user.id === id);
        if (position === -1) throw new Error("User not found");
        return position;
    }
}
