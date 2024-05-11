import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule,
    ConfigurationModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
