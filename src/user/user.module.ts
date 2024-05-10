import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRol } from './user_rol/entities/user_rol.entity';
import { ConfigurationModule } from 'src/configuration/configuration.module';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigurationModule,
    TypeOrmModule.forFeature([User,UserRol])
  ],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
