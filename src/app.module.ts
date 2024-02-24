import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Profile } from './users/profiles/entities/profile.entity';
import { Blog } from './blog/entities/blog.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        // port: 3306,
        username: process.env.DB_USERNAME,
        password: '',
        database: process.env.DB_NAME,
        entities: [User, Profile, Blog],
        synchronize: true
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BlogModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
