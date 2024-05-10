import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new LoggerClass(UserService.name);

    constructor(
      @InjectRepository(User)
    private UserRepository: Repository<User>,
    ){}

 async create(createUserDto: CreateUserDto) {
    try {
      const exit = await this.UserRepository.findOneBy({correo:createUserDto.correo,nombre:createUserDto.nombre});
      if(!exit) throw new BadRequestException('El usuario y/o E-mail existe');
      const user = await this.UserRepository.create(createUserDto);
      await this.UserRepository.save(user);
      return {
        ok:true,
        msg:'Usuario creado con exito'
      }
      
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async findAll() {
    try {
          const users = await this.UserRepository.find();
        return users;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async findOne(id: string) {
    try {
      const user = await this.UserRepository.findOneBy({id:id});
      return user;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    try {
        const user = await this.UserRepository.findOneBy({id:id});
        if(!user) throw new BadRequestException('El usuario no existe');
        await this.UserRepository.update({id:id},updateUserDto);
        await  this.UserRepository.save(updateUserDto);
        return {
          ok:true,
          msg:'Usuario actualizado con exito'
        }

    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async remove(id: string) {
    try {
      const user = await this.UserRepository.findOneBy({id:id});
      if(!user) throw new BadRequestException('El usuario no existe');
      user.activo = false;
      await this.UserRepository.save(user);
      return {
        ok:true,
        msg:'Usuario eliminado con exito'
      }
      
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }
}
