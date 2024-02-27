import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profilesRepository.update({ id }, updateProfileDto);
  }

  remove(id: number) {
    return this.profilesRepository.delete({ id });
  }
}
