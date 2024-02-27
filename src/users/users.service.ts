import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({ ...createUserDto });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find({
      select: ["username"],
      relations: {
        profile: true
      }
    });
  }

  findOne(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      relations: {
        profile: true
      }
    });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(username);
    if(user == null)
      return null;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    return this.usersRepository.save(user);
  }

  remove(user: User) {
    return this.usersRepository.remove(user);
  }
}
