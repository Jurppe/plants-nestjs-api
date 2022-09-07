import { IsString, IsDateString, IsUrl, IsNotEmpty, IsOptional, IsNumber, Matches, IsIn } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsOptional()
  picture: string; 

  @IsString()
  @IsOptional()
  about: string;

  @IsDateString()
  @IsNotEmpty()
  bought: Date;

  @IsDateString()
  @IsOptional()
  last_watered: Date;

  @IsIn(['daily', 'weekly', 'monthly'])
  @IsNotEmpty()
  watering_period: string;
}
