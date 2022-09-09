import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import { compareHashes } from 'src/plants/helper.functions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private JwtService: JwtService,
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    
    if (!user) {
      return null
    }
    else if (await compareHashes(password, user.password_hash)) {
      return {
        userId: user.id,
        username: user.name
      }
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId};
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}