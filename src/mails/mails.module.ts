import { Module } from '@nestjs/common';
import { MailService } from './mails.service';
import { MailController } from './mails.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MailService, DatabaseService, JwtService],
  controllers: [MailController],
})
export class MailsModule {}
