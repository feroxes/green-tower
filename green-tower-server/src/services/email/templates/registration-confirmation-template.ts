import { defaultTemplate } from './default-template';

export const registrationConfirmationTemplate = {
  ...defaultTemplate,
  subject: {
    en: 'Confirm your registration',
    uk: 'Підтвердіть Вашу реєстрацію',
  },
  title: {
    en: 'Confirm your registration',
    uk: 'Підтвердіть Вашу реєстрацію',
  },
  body: {
    en: `
      <div style="padding: 16px 32px;">
        <div style="margin: 16px 0 24px 0;">
          <p style="font-size: 14px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 20px; letter-spacing: 0px;">Hello,</p>
          <p style="margin: 0; font-family: Roboto, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: 0px; text-align: left;">we've received a request to create a new farm in <a style="color: #2196F3;" href="<%= greenTowerUrl %>">Green Tower</a> service.</p>
          <div style="width: 100%; text-align: center;">
            <p style="font-family: Roboto, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: 0px; margin-top: 8px;">Complete your request by clicking the button below.</p>
            <a style="text-decoration: none; display: inline-block;" href="<%= confirmationLink %>" target="_blank">
              <div style="color: #fff; background-color: #2e7d32; min-width: 10px; height: 28px; padding: 12px 12px 0; border-radius: 5.4px; font-family: Roboto, sans-serif; font-size: 14px; font-weight: 500; line-height: 16px; letter-spacing: 0px; text-align: center; margin-top: 16px;">Confirm registration</div>
            </a>
              <p style="color: #bababa; font-family: Roboto, sans-serif; font-size: 12px; font-weight: 400; line-height: 20px; letter-spacing: 0; font-style: italic; margin-top: 8px;">This button is active for <%= confirmationLinkTtl %> hours.</p>
          </div>
        </div>
      </div>
    `,
    uk: `
      <div style="padding: 16px 32px;">
        <div style="margin: 16px 0 24px 0;">
          <p style="font-size: 14px; font-family: Roboto, sans-serif; font-weight: 400; line-height: 20px; letter-spacing: 0px;">Вітання,</p>
          <p style="margin: 0; font-family: Roboto, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: 0px; text-align: left;">ми отримали запит на створення нової ферми в сервісі <a style="color: #2196F3;" href="<%= greenTowerUrl %>">Зелена Вежа</a>.</p>
          <div style="width: 100%; text-align: center;">
            <p style="font-family: Roboto, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; letter-spacing: 0px; margin-top: 8px;">Завершіть свій запит, натиснувши кнопку нижче.</p>
            <a style="text-decoration: none; display: inline-block;" href="<%= confirmationLink %>" target="_blank">
              <div style="color: #fff; background-color: #2e7d32; min-width: 10px; height: 28px; padding: 12px 12px 0; border-radius: 5.4px; font-family: Roboto, sans-serif; font-size: 14px; font-weight: 500; line-height: 16px; letter-spacing: 0px; text-align: center; margin-top: 16px;">Підтвердити реєстрацію</div>
            </a>
              <p style="color: #bababa; font-family: Roboto, sans-serif; font-size: 12px; font-weight: 400; line-height: 20px; letter-spacing: 0; font-style: italic; margin-top: 8px;">Ця кнопка активна <%= confirmationLinkTtl %> години.</p>
          </div>
        </div>
      </div>
    `,
  },
};
