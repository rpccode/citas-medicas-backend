import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerClass } from 'src/common/helpers/logger.class';

@Injectable()
export class CompanyService {
  private readonly logger = new LoggerClass('CompanyService');
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companyRepository.create(createCompanyDto);
      await this.companyRepository.save(company);
      return {
        ok: true,
        msg: 'Compañia creada con exito',
      };
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const companys = await this.companyRepository.find();
      return companys;
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const companys = await this.companyRepository.findOneBy({
        id: id,
      });
      return companys;
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.companyRepository.findOneBy({
        id: id,
      });
      if (!company) throw new NotFoundException('companñia no encontrada');

      await this.companyRepository.update(
        {
          id: id,
        },
        updateCompanyDto,
      );

      return {
        ok: true,
        msg: 'Compañia Modificada correctamente',
      };
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
