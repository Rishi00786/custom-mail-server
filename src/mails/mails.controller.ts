import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { MailService } from './mails.service';
import { SendMailDto } from './DTO/send-mail.dto';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Headers('Authorization') authHeader: string,
    @Body() sendMailDto: SendMailDto,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const authToken = authHeader.replace('Bearer ', '');

    const { to, subject, body } = sendMailDto;
    const result = await this.mailService.sendEmail(
      authToken,
      to,
      subject,
      body,
    );

    return {
      message: 'Email sent successfully',
      result,
    };
  }

  @Get('inbox')
  async getInbox(@Headers('Authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is required');
    }

    // Remove 'Bearer ' from the Authorization header
    const authToken = authHeader.replace('Bearer ', '');

    // Fetch the emails from the IMAP service
    const emails = await this.mailService.fetchEmails(authToken);
    return {
      message: 'Emails fetched successfully',
      emails,
    };
  }
}
