import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Plant } from "../models/plant.model";

@Module({
  imports: [SequelizeModule.forFeature([Plant])],
  controllers: [PlantsController],
  providers: [
    PlantsService,
  ]
})
export class PlantsModule {}
