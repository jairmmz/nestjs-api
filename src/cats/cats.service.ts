import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { IUserActive } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) { }


  async create(createCatDto: CreateCatDto, user: IUserActive) {
    const breed = await this.breedRepository.findOneBy({ name: createCatDto.breed })

    if (!breed) {
    throw new BadRequestException('Breed not found');
    }

    const cat = this.catRepository.create({
      name: createCatDto.name,
      age: createCatDto.age,
      breed,
      userId: user.id
    })

    return await this.catRepository.save(cat);
  }


  async findAll(user: IUserActive): Promise<Cat[]> {
    return await this.catRepository.find({
      where: { userId: user.id }
    });
  }


  async findOne(id: number, user: IUserActive): Promise<Cat | undefined> {
    const cat = await this.catRepository.findOneBy({
      id,
      userId: user.id
    });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    return cat;
  }


  async update(id: number, updateCatDto: UpdateCatDto, user: IUserActive) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    let breed: Breed | undefined;
    if (updateCatDto.breed) {
      breed = await this.breedRepository.findOneBy({ name: updateCatDto.breed });

      if (!breed) {
        throw new BadRequestException('Breed not found.');
      }
    }

    return await this.catRepository.update(id, {
      ...cat,
      ...updateCatDto,
      breed,
      userId: user.id
    })
  }

  
  async remove(id: number) {
    return await this.catRepository.softDelete({ id })
  }
}
