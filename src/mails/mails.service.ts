import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as nodemailer from 'nodemailer';
import { User } from '@prisma/client';
import * as Imap from 'imap';
import { simpleParser } from 'mailparser';

@Injectable()
export class MailService {
  private transporter;

  constructor(private databaseService: DatabaseService) {}

  async sendEmail(userId: string, to: string, subject: string, body: string) {
    try {
      const user: User = await this.databaseService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user.email,
          pass: user.appPassword,
        },
      });

      const mailOptions = {
        from: user.email,
        to: to,
        subject: subject,
        text: body,
      };

      const info = await this.transporter.sendMail(mailOptions);

      const mail = await this.databaseService.email.create({
        data: {
          senderId: userId,
          senderEmail: user.email,
          recipientEmail: to,
          subject: subject,
          body: body,
        },
      });

      return { mail, info };
    } catch (error) {
      throw new BadRequestException(`Failed to send email: ${error.message}`);
    }
  }

  async fetchEmails(userId: string) {
    try {
      const user: User = await this.databaseService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const imap = new Imap({
        user: user.email,
        password: user.appPassword,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: {
          rejectUnauthorized: false,
        },
      });

      const emails = await this.getEmails(imap);
      return emails;
    } catch (error) {
      throw new BadRequestException(`Failed to fetch emails: ${error.message}`);
    }
  }

  private getEmails(imap: Imap.ImapFlow) {
    return new Promise((resolve, reject) => {
      imap.connect();

      imap.once('ready', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imap.openBox('INBOX', false, (err, box) => {
          if (err) return reject(err);

          imap.search(['ALL'], (err, results) => {
            if (err) return reject(err);

            const fetch = imap.fetch(results.reverse().slice(0, 10), {
              bodies: '',
            });

            const emails = [];
            fetch.on('message', (msg) => {
              let email = '';
              msg.on('body', (stream) => {
                stream.on('data', (chunk) => {
                  email += chunk;
                });
              });

              msg.once('end', () => {
                simpleParser(email).then((parsedEmail) => {
                  emails.push({
                    subject: parsedEmail.subject,
                    from: parsedEmail.from.text,
                    to: parsedEmail.to.text,
                    date: parsedEmail.date,
                    text: parsedEmail.text,
                  });
                });
              });
            });

            fetch.once('end', () => {
              resolve(emails);
              imap.end();
            });
          });
        });
      });

      imap.once('error', (err) => reject(err));
    });
  }
}
