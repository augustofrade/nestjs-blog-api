import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService
  ) {}
  
  async create(createProfileDto: CreateProfileDto) {
    const profile = this.profilesRepository.create(createProfileDto);
    const result = await this.profilesRepository.save(profile);
    const user = await this.usersService.findOne(createProfileDto.username);
    user.profile = result;
    return await this.usersRepository.save(user) != null;

  }

  update(uuid: string, updateProfileDto: UpdateProfileDto) {
    return this.profilesRepository.update({ uuid }, updateProfileDto);
  }

  remove(uuid: string) {
    return this.profilesRepository.delete({ uuid });
  }
}
