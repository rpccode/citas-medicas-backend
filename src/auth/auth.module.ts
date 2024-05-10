import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
