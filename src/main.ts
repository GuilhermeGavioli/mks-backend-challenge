import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { TasksService } from './Services/task.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // for jwt

  // new TasksService().handleCron()

  const config = new DocumentBuilder()
  .setTitle('MKS: Documentação da API com Swagger')
  .setDescription(
    `API CRUD de filmes com simples autenticação JWT, sem refresh (ainda), onde o requisito para criar, ler, deletar ou mudar um filme é estar autenticado, 
    isto é, criar uma conta (/signup) e logar (/signin), a partir de uma resposta de sucesso das rotas, é possivel acessar todos os outros endpoints, do contrario,
    voce será negado.
    `,
  )
  .setVersion('1.0')
  .addTag('users')
  .addTag('movies')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(80);
}

bootstrap();
