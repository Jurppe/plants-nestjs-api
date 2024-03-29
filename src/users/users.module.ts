import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
  ],
})
export class UsersModule {}
