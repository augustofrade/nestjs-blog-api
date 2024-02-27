import { Gender } from "../types/gender.enum";

export class CreateProfileDto {
    username: string;
    flair?: string;
    gender: Gender;
    picture?: string;
    firstName: string;
    lastName?: string;
}
