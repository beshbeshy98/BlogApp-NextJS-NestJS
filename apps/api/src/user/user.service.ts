import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    const { password, email, ...rest } = createUserInput;

    const existingUser = await this.prisma.user.findUnique({
      where : {email}
    })

    if(existingUser){
      throw new BadRequestException("Email already registered")
    }

    const hashedPassword = await hash(password)

    return await this.prisma.user.create({
      data: {
        ...rest,
        email,
        password: hashedPassword,
      },
    });
  }
}
