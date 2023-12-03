import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async findOneUser(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findAll() {
    return await this.userRepository.find(); 
  }

  async findOne(id: number) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.userRepository.delete({ id });
  }
}
