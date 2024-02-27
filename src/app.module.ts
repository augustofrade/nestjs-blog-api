import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Blog } from './blogs/entities/blog.entity';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

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
    BlogsModule,
    UsersModule,
    ProfilesModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
