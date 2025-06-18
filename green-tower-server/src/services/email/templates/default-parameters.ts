export const getDefaultEmailParameters = () => ({
  from: {
    en: `Green Tower Care Service <${process.env.SMTP_FROM}>`,
    uk: `Служба турботи Зелена Вежа <${process.env.SMTP_FROM}>`
  },
  senderName: 'Green Tower',
  greenTowerUrl: process.env.APP_URL,
  greenTowerLogoUrl: 'https://green-tower-assets.s3.eu-north-1.amazonaws.com/logo.webp',
})
