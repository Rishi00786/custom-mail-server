import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, MailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
