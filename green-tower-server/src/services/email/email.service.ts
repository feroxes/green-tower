import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';

import { SupportedLanguages } from '../../api/types/common.types';

import { AuthConstants } from '../../utils/constants';
import { defaultParameters } from './templates/default-parameters';
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

    const options = {
      title: registrationConfirmationTemplate.title[language],
      body: ejs.render(registrationConfirmationTemplate.body[language], {
        greenTowerUrl: defaultParameters.greenTowerUrl,
        confirmationLink,
        confirmationLinkTtl: AuthConstants.EMAIL_CONFIRMATION_EXPIRES_HOURS,
      }),
      footer: defaultTemplate.footer[language],
      greenTowerLogoUrl: 'https://i.postimg.cc/zDL0D3Hc/logo.png', //TODO move to AWS bucket
    };

    const html = ejs.render(defaultTemplate.layout, options);

    const mailOptions = {
      from: defaultParameters.from,
      to: email,
      subject: registrationConfirmationTemplate.subject[language],
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
