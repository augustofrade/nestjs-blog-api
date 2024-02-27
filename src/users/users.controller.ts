import { Body, Controller, Delete, Get, Ip, NotFoundException, Param, Post, Put } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { FindUserPipe } from "./pipes/find-user.pipe";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    createUserDto.ip = ip;
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(":username")
  async findOne(@Param("username", FindUserPipe) user: User) {
    const { ip, password, id, ...result } = user;
    return result;
  }

  @Put(":username")
  async update(@Param("username") username: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(username, updateUserDto);
    if(user == null)
      throw new NotFoundException("User not found");
    return user;
  }

  @Delete(":username")
  async remove(@Param("username", FindUserPipe) user: User) {
    return await this.userService.remove(user);
  }
}
