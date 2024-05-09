import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './common/config/index'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    snapshot: true,
  });

  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );



  await app.listen(3000);
}
bootstrap();
