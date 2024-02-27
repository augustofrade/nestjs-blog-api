import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";

import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto);
  }

  @Patch(":uuid")
  async update(@Param("uuid", ParseUUIDPipe) uuid: string, @Body() updateProfileDto: UpdateProfileDto) {
    const result = await this.profilesService.update(uuid, updateProfileDto);
    return result?.affected == 1;
  }
}
