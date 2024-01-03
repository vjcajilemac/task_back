import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception.filter';
import { coorsConstants } from 'coors.constant';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.enableCors();
  const cors = require('cors');
  const corsOptions ={
      origin: coorsConstants.hosts, 
      credentials:true,  
      optionSuccessStatus:200
  }
  await app.use(cors(corsOptions));
  await app.listen(3001);
  
}
bootstrap();
