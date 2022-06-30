import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './utilities/prisma.service';

async function bootstrap() {
  // console.log(process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  console.log('server listening on port 3000...');
}
bootstrap();
