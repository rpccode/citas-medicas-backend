import { Module } from '@nestjs/common';
import { SpecialtyController } from './specialty/specialty.controller';
import { ServicesController } from './services/services.controller';
import { RolController } from './rol/rol.controller';
import { CompanyController } from './company/company.controller';
import { SpecialtyService } from './specialty/specialty.service';
import { ServicesService } from './services/services.service';
import { SchedulesService } from './schedules/schedules.service';
import { CompanyService } from './company/company.service';
import { RolService } from './rol/rol.service';
import { SchedulesController } from './schedules/schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './specialty/entities/specialty.entity';
import { Service } from './services/entities/service.entity';
import { Schedule } from './schedules/entities/schedule.entity';
import { Rol } from './rol/entities/rol.entity';
import { Company } from './company/entities/company.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Specialty,Service,Schedule,Rol,Company])
  ],
  controllers:[SpecialtyController,ServicesController,SchedulesController,RolController,CompanyController],
  providers:[SpecialtyService,ServicesService,SchedulesService,CompanyService, RolService],
  exports: [SpecialtyService,ServicesService,SchedulesService,CompanyService,RolService]

})
export class ConfigurationModule {}
