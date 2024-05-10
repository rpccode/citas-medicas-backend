import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  private readonly logger = new LoggerClass(SpecialtyService.name);
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}
  async create(createSpecialtyDto: CreateSpecialtyDto) {
    try {
      const specialty = this.specialtyRepository.create(createSpecialtyDto);

      await this.specialtyRepository.save(specialty);
      return specialty;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const specialties = await this.specialtyRepository.find({
        where: {
          activo: true,
        },
      });
      if (!specialties)
        throw new NotFoundException('Especialidades no encontradas');
      return specialties;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const specialty = await this.specialtyRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      if (!specialty) throw new NotFoundException('Especialidad no encontrada');
      return specialty;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    try {
      const specialty = await this.specialtyRepository.findOne({
        where: { id: id },
      });
      if (!specialty) throw new NotFoundException('Especialidad no encontrada');
      await this.specialtyRepository.update({ id: id }, updateSpecialtyDto);
      await this.specialtyRepository.save(specialty);
      return {
        ok: true,
        msg: 'Especialidad Modificada correctamente',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const specialty = await this.specialtyRepository.findOne({
        where: { id: id },
      });
      if (!specialty) throw new NotFoundException('Especialidad no encontrada');
      await this.specialtyRepository.update({ id: id }, { activo: false });
      await this.specialtyRepository.save(specialty);
      return {
        ok: true,
        msg: 'Especialidad eliminada con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }
}
