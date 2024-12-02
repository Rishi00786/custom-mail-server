import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MailService } from './mails.service';
import { SendMailDto } from './DTO/send-mail.dto';
import { AuthGuard } from '../auth/auth.gaurd';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @UseGuards(AuthGuard)
  async sendMail(
    @Headers('Authorization') authHeader: string,
    @Body() sendMailDto: SendMailDto,
    @Request() req: any,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const { to, subject, body } = sendMailDto;

    const userId = req.user.id;

    const result = await this.mailService.sendEmail(userId, to, subject, body);

    return {
      message: 'Email sent successfully',
      result,
    };
  }

  @Get('inbox')
  @UseGuards(AuthGuard)
  async getInbox(
    @Headers('Authorization') authHeader: string,
    @Request() req: any,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const userId = req.user.id;

    const emails = await this.mailService.fetchEmails(userId);
    return {
      message: 'Emails fetched successfully',
      emails,
    };
  }
}
