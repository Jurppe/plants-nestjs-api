import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';
import { IsString, IsDateString, IsUrl, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdatePlantDto extends PartialType(CreatePlantDto) {
  @IsOptional()
  @Exclude()
  _id?: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsUrl()
  @IsOptional()
  picture: string; 

  @IsString()
  @IsOptional()
  about: string;

  @IsDateString()
  @IsOptional()
  last_watered: Date;

  @IsString()
  @IsOptional()
  watering_period: 'daily' | 'weekly' | 'monthly';
}
