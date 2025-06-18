import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthConstants } from '@utils/constants';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';

import { SupportedLanguages } from '@app-types/common.types';

import { getDefaultEmailParameters } from './templates/default-parameters';
import { defaultTemplate } from './templates/default-template';
import { registrationConfirmationTemplate } from './templates/registration-confirmation-template';

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

  async sendEmailConfirmation(email: string, language: SupportedLanguages, token: string): Promise<void> {
    const confirmationLink = `${this.configService.get('APP_URL')}/registrationConfirmation?token=${token}`;
    const defaultParameters = getDefaultEmailParameters()
    const options = {
      title: registrationConfirmationTemplate.title[language],
      body: ejs.render(registrationConfirmationTemplate.body[language], {
        greenTowerUrl: defaultParameters.greenTowerUrl,
        confirmationLink,
        confirmationLinkTtl: AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS,
      }),
      footer: ejs.render(defaultTemplate.footer[language], {
        smtpFrom: process.env.SMTP_FROM
      }),
      greenTowerLogoUrl: 'https://green-tower-assets.s3.eu-north-1.amazonaws.com/logo.webp',
    };

    const html = ejs.render(defaultTemplate.layout, options);

    const mailOptions = {
      from: defaultParameters.from[language],
      to: email,
      subject: registrationConfirmationTemplate.subject[language],
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
