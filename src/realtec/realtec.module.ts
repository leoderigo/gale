import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';

@Module({
  imports: [EmailModule],
  controllers: [ContactController],
  providers: [
    ContactService
  ]
})
export class RealtecModule {}
