import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userepository : UserRepository){}

    async createUser(createUserDto: CreateUserDto) : Promise<User>{
        return this.userepository.createUser(createUserDto.username, createUserDto.password);
    }
}

