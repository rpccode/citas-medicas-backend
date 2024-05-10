import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  private readonly logger = new LoggerClass(RolService.name);
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}
  async create(createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolRepository.create(createRolDto);
      this.rolRepository.save(rol);
      return {
        ok: true,
        msg: 'Rol creado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const roles = await this.rolRepository.find({
        where: {
          activo: true,
        },
      });
      return roles;
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const rol = await this.rolRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      return rol;
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    try {
      await this.rolRepository.update({ id: id }, updateRolDto);

      await this.rolRepository.save(updateRolDto);
      return {
        ok: true,
        msg: 'Rol actualizado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async remove(id: number) {
    try {
      const rol = await this.rolRepository.findOneBy({ id: id });
      if (!rol) throw new BadRequestException('El rol no existe');
      rol.activo = false;
      await this.rolRepository.save(rol);
      return {
        ok: true,
        msg: 'Rol eliminado con exito',
      };
      
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }
}
