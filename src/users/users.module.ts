import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ProfilesModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
