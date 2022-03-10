import { IsString, IsDateString, IsUrl, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  watering_period: 'daily' | 'weekly' | 'monthly';

  @IsNotEmpty()
  @IsNumber()
  owner_id: number;
}
