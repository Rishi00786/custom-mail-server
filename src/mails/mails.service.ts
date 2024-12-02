import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { simpleParser } from 'mailparser';
import * as Imap from 'imap';

@Injectable()
export class MailService {
  private transporter;

  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async sendEmail(
    authToken: string,
    to: string,
    subject: string,
    body: string,
  ) {
    try {
      const decodedToken = this.jwtService.decode(authToken) as {
        id: string;
      };

      console.log(decodedToken);
      const userId = decodedToken?.id;

      if (!userId) {
        throw new UnauthorizedException(
          'Invalid or missing authentication token',
        );
      }

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
      return info;
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async fetchEmails(authToken: string) {
    try {
      // Decode JWT to get userId
      const decodedToken = this.jwtService.decode(authToken) as {
        id: string;
      };
      const userId = decodedToken?.id;

      if (!userId) {
        throw new UnauthorizedException(
          'Invalid or missing authentication token',
        );
      }

      // Fetch user data (email and app password) from database
      const user: User = await this.databaseService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Set up IMAP connection
      const imap = new Imap({
        user: user.email,
        password: user.appPassword,
        host: 'imap.gmail.com', // Gmail IMAP server
        port: 993, // Port for secure IMAP
        tls: true, // Use TLS
        tlsOptions: {
          rejectUnauthorized: false, // Ignore self-signed certificates
        },
      });

      // Open IMAP connection and fetch emails
      const emails = await this.getEmails(imap);
      return emails;
    } catch (error) {
      throw new Error(`Failed to fetch emails: ${error.message}`);
    }
  }

  private getEmails(imap: Imap.ImapFlow) {
    return new Promise((resolve, reject) => {
      // Connect to the IMAP server
      imap.connect();

      // Listen for 'ready' event after connection
      imap.once('ready', () => {
        // Open the inbox folder
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imap.openBox('INBOX', false, (err, box) => {
          if (err) return reject(err);

          // Fetch the most recent 10 emails
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
              resolve(emails); // Resolve with the list of emails
              imap.end(); // Close the IMAP connection
            });
          });
        });
      });

      imap.once('error', (err) => reject(err));
    });
  }
}
