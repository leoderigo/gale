import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicModule } from './public/public.module';
import { EmailModule } from './email/email.module';
import { RealtecModule } from './realtec/realtec.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PublicModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
    RealtecModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
