import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule, UserModule, ConfigurationModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
