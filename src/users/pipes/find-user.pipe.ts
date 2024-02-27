
import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserPipe implements PipeTransform<string, Promise<User>> {
    constructor (
        private usersService: UsersService
    ){}

    async transform(value: string, metadata: ArgumentMetadata): Promise<User> {
        const user = await this.usersService.findOne(value);
        if(user == null)
            throw new NotFoundException("User not found");
        return user;
    }
}
