import { Repository } from "typeorm";
import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) {}

    async createUser(username: string, password: string ) : Promise<User>{
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await this.repository.create({username, password: encryptedPassword});

        return await this.repository.save(user);
    }
      
}