import { PartialType } from '@nestjs/mapped-types';

import { Gender } from '../types/gender.enum';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    flair?: string;
    gender: Gender;
    picture?: string;
    firstName: string;
    lastName?: string;
}
