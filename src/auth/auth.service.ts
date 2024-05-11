/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { CompanyService } from '../configuration/company/company.service';
import { Company } from 'src/configuration/company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from 'src/configuration/rol/entities/rol.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRol } from 'src/user/user_rol/entities/user_rol.entity';

@Injectable()
export class AuthService {
  private readonly logger = new LoggerClass(AuthService.name);
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(UserRol)
    private UserRolRepository: Repository<UserRol>,
    @InjectRepository(Rol)
    private RolRepository: Repository<Rol>,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    try {
      const { correoElectronico, telefono, nombreEmpresa } = createAuthDto;
      const company = await this.companyRepository.findOne({
        where: [
          { correoElectronico: correoElectronico },
          { telefono: telefono },
          { nombreEmpresa: nombreEmpresa },
        ],
      });
      if (company)
        throw new BadRequestException(
          'Ya existe una compañia, verifique los datos',
        );
      const cp = await this.companyRepository.create({
        nombreEmpresa: createAuthDto.nombreEmpresa,
        direccion: createAuthDto.direccion,
        telefono: createAuthDto.telefono,
        correoElectronico: createAuthDto.correoElectronico,
        logotipo: createAuthDto.logotipo,
        otrosDetalles: createAuthDto.otrosDetalles,
      });


      const rol = await this.RolRepository.findOne({
        where: {
          nombre: 'Administrador',
        },
      });

      if (!rol) return new BadRequestException('El rol no existe');

      const user = await this.UserRepository.findOne({
        where: {
          correo: createAuthDto.correo,
        },
      });

      if (user) throw new BadRequestException('El usuario ya existe');
      await this.companyRepository.save(cp);

      const newUser = await this.UserRepository.create({
        nombre: createAuthDto.nombre,
        correo: createAuthDto.correo,
        clave: createAuthDto.clave,
        empresa: cp.id,
        activo: true,
      });
      await this.UserRepository.save(newUser);

      const rolUser = await this.UserRolRepository.create({
        rol: rol.id,
        empresa: cp.id,
        usuario: newUser.id,
        activo: true,
      });
      this.UserRolRepository.save(rolUser);
      return {
        ok: true,
        msg: '',
        data: {
          user: newUser,
          // rol: rolUser,
          company: cp,
        },
      };
    } catch (error) {
      // console.log(error);
      this.logger.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
