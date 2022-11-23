import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenExpiryTimeInHeaderInterceptor } from './shared/Interceptors/token-expiry-time-in-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TokenExpiryTimeInHeaderInterceptor())
  await app.listen(3000);
}
bootstrap();
