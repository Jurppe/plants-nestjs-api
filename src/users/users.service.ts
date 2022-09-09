import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { hash } from 'src/plants/helper.functions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}


  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        name: username,
      }
    })
  }
}