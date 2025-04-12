import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { AuthConstants } from '../../utils/constants';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendEmailConfirmation(email: string, token: string): Promise<void> {
    const confirmationUrl = `${this.configService.get('APP_URL')}/auth/confirmEmail/${token}`;

    const mailOptions = {
      from: this.configService.get('SMTP_FROM') as string,
      to: email,
      subject: 'Confirm your email address',
      html: `
        <h1>Welcome to Green Tower!</h1>
        <p>Please confirm your email address by clicking the link below:</p>
        <a href="${confirmationUrl}">Confirmation link</a>
        <p>This link will expire in ${AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS} hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
      `,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
