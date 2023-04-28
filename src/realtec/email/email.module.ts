import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  controllers: [],
  providers: [
    ConfigService,
    EmailService
  ],
  exports: [EmailService]
})
export class EmailModule {}
