import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggerClass } from 'src/common/helpers/logger.class';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRol } from './user_rol/entities/user_rol.entity';
import { Rol } from 'src/configuration/rol/entities/rol.entity';

@Injectable()
export class UserService {
  private readonly logger = new LoggerClass(UserService.name);

  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(UserRol)
    private UserRolRepository: Repository<UserRol>,
    @InjectRepository(Rol)
    private RolRepository: Repository<Rol>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { correo, nombre, empresaId, rolId } = createUserDto;
      const exit = await this.UserRepository.findOneBy({
        correo: correo,
        nombre: nombre,
        empresaId: empresaId,
      });
      if (!exit) throw new BadRequestException('El usuario y/o E-mail existe');
      const user = await this.UserRepository.create(createUserDto);
      const rol = await this.RolRepository.findOneBy({
        id: rolId,
        activo: true,
      });
      if (!rol)
        throw new BadRequestException(
          'El rol no existe o no se encuentra activo',
        );
      const userRol = await this.UserRolRepository.create({});
      userRol.usuarioId = user.id;
      userRol.rolId = rol.id;
      userRol.empresaId = user.empresaId;

      Promise.all([
        this.UserRepository.save(user),
        this.UserRolRepository.save(userRol),
      ]);
      if (!user || !userRol)
        throw new BadRequestException('No se pudo crear el usuario');

      return {
        ok: true,
        msg: 'Usuario creado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async findAll(empresaId: string) {
    try {
      // Obtener todos los usuarios de la empresa
      const usuarios = await this.UserRepository.find({
        where: { activo: true, empresaId: empresaId },
      });

      // Para cada usuario, obtener sus roles
      for (const usuario of usuarios) {
        // Obtener los registros de roles para este usuario
        const userRoles = await this.UserRolRepository.find({
          where: { usuarioId: usuario.id },
          relations: ['roles.Rol'], 
        });

        // Agregar los roles al usuario
        usuario.roles = userRoles;
      }

      return usuarios;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.UserRepository.findOneBy({
        id: id,
        activo: true,
        empresaId: id,
      });
      if (!user)
        throw new BadRequestException(
          'El usuario no existe o no se encuentra activo',
        );
        const userRoles = await this.UserRolRepository.find({
          where: { usuarioId: user.id },
        });
        if (!userRoles) throw new BadRequestException('El usuario no tiene roles asignados');

        // Agregar los roles al usuario
        user.roles = userRoles;

      return user;
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.UserRepository.findOneBy({ id: id });
      if (!user) throw new BadRequestException('El usuario no existe');
      await this.UserRepository.update({ id: id }, updateUserDto);

      await this.UserRepository.save(updateUserDto);
      return {
        ok: true,
        msg: 'Usuario actualizado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.UserRepository.findOneBy({ id: id });
      if (!user) throw new BadRequestException('El usuario no existe');
      user.activo = false;
      await this.UserRepository.save(user);
      return {
        ok: true,
        msg: 'Usuario eliminado con exito',
      };
    } catch (error) {
      this.logger.handleDBExceptions(error);
    }
  }
}
