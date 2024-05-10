import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  private readonly logger = new LoggerClass(ServicesService.name);
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}
 async create(createServiceDto: CreateServiceDto) {
    try {
      const service = this.serviceRepository.create(createServiceDto);
      if (!service) throw new BadRequestException('No se pudo crear el servicio');

      await this.serviceRepository.save(service);
      return {
        ok: true,
        msg: 'Servicio creado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

async  findAll() {
    try {
      const servicios = await this.serviceRepository.find({
        where: {
          activo: true,
        },
      });
      if (!servicios) throw new BadRequestException('No se encontraron servicios');
      return servicios;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async findOne(id: number) {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      if (!service) throw new BadRequestException('Servicio no encontrado');
      return service;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      if (!service) throw new BadRequestException('Servicio no encontrado');
      await this.serviceRepository.update({ id: id }, updateServiceDto);
      await this.serviceRepository.save(updateServiceDto);
      return {
        ok: true,
        msg: 'Servicio actualizado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async remove(id: number) {
    try {
      const service = await this.serviceRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      if (!service) throw new BadRequestException('Servicio no encontrado');
      await this.serviceRepository.update({ id: id }, { activo: false });
      await this.serviceRepository.save(service);
      return {
        ok: true,
        msg: 'Servicio eliminado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }
}
