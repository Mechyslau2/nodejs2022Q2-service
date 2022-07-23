import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { cwd as getRootPath } from 'node:process';

import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootDir = getRootPath();

  const swaggerFile = await readFile(`${rootDir}/doc/api.yaml`);
  const swaggerDocument = parse(swaggerFile.toString());

  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(4000);
}
bootstrap();
