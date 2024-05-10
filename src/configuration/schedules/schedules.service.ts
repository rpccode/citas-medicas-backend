import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { LoggerClass } from 'src/common/helpers/logger.class';

@Injectable()
export class SchedulesService {
  private readonly logger = new LoggerClass(SchedulesService.name);
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
 async create(createScheduleDto: CreateScheduleDto) {
    try {
      const schedule = this.scheduleRepository.create(createScheduleDto);
      if (!schedule) throw new NotFoundException('Horario no encontrado');
      await this.scheduleRepository.save(schedule);
      return {
        ok: true,
        msg: 'Horario creado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

async  findAll() {
    try {
      const schedules = await this.scheduleRepository.find({
        where: {
          activo: true,
        },
      });
      if (!schedules) throw new NotFoundException('Horarios no encontrados');
      return schedules;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

async  findOne(id: number) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: {
          id: id,
          activo: true,
        },
      });
      if (!schedule) throw new NotFoundException('Horario no encontrado');
      return schedule;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { id: id },
      });
      if (!schedule) throw new NotFoundException('Horario no encontrado');
      await this.scheduleRepository.update({ id: id }, updateScheduleDto);
      await this.scheduleRepository.save(schedule);
      return {
        ok: true,
        msg: 'Horario Modificado correctamente',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

 async remove(id: number) {
   try {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
    });
    if (!schedule) throw new NotFoundException('Horario no encontrado');
    schedule.activo = false;
    await this.scheduleRepository.save(schedule);
    return {
      ok: true,
      msg: 'Horario eliminado con exito',
    };
   } catch (error) {
    this.logger.handleDBExceptions(error);
   }
  }
}
