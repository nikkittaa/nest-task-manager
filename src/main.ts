import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('Task Management API')   
  .setDescription('API documentation for the Task Management App') 
  .setVersion('1.0')              
  .addTag('tasks')                  
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
