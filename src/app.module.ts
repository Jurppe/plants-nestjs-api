import * as dotenv from 'dotenv';
dotenv.config()

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantsModule } from './plants/plants.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plant } from './models/plant.model';

@Module({
  imports: [PlantsModule, AuthModule, UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_DEFAULT,
      models: [Plant],
    }),],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
