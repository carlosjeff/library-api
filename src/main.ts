import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TokenExpiryTimeInHeaderInterceptor } from './shared/Interceptors/token-expiry-time-in-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TokenExpiryTimeInHeaderInterceptor())


  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Livraria de Artigos')
    .setVersion('1.0')
    .addTag('Authors')
    .addTag('Pepers')
    .addTag('Users')
    .addTag('Login')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      in: "header"
    }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
