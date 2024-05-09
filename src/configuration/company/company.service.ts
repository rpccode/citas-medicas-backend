import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ){}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companyRepository.create(createCompanyDto)
      return this.companyRepository.save(company)
    } catch (error) {
      console.log(error)
    }
  }

 async findAll() {
    try {
      const companys =  await this.companyRepository.find()
      return companys 
    } catch (error) {
      console.log(error)
    }
  }

 async findOne(id: number) {
    try {
      const companys =  await this.companyRepository.findOneBy({
        id:id
      })
      return companys 
    } catch (error) {
      console.log(error)
    }
  }

 async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company =  await this.companyRepository.findOneBy({
        id:id
      })
      if(!company) throw new NotFoundException('companñia no encontrada')

       await this.companyRepository.update({
        id:id
      },updateCompanyDto)

      return {
        ok:true,
        msg:'Compañia Modificada correctamente'
      }
    } catch (error) {
      console.log(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
