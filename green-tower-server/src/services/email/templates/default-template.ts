export const defaultTemplate = {
  layout: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html;  charset=utf-8" />
          <title><%=title%></title>
        </head>
        <body style="padding: 0; margin: 0; font-family: Roboto, sans-serif; background: linear-gradient(to right bottom, #f9f1e3, #dfd2bf); color: #39383d;">
          <div style="margin: 0 auto; max-width: 580px; padding: 24px 0;">
              <div style="padding: 0px; margin: 0 0 24px 0; border-radius: 16px; background-color: #fff9ef; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);">
                <!-- HEADER -->
                <div style="border-bottom: 1px solid #ece2d3; padding: 8px 0 8px 24px; display: flex; align-items: center;">
                  <img height="40px" alt="Green Tower Logo" src="<%= greenTowerLogoUrl %>" />
                    <p style="margin-left: 8px; font-weight: bold; color: #0e620b;">Зелена</p>
                    <p style="margin-left: 4px; font-weight: bold;">Вежа</p>
                </div>
                <!-- BODY -->
                <div style="background-color: #fff9ef; border-radius: 16px;">
                  <%- body %>
                </div>
              </div>
              <!-- FOOTER -->
              <%- footer %>
          </div>
        </body>
      </html>`,
  footer: {
    en: `
      <div style="max-width: 560px;">
        <p style="margin: 8px 0 0 0; text-align: center; font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 18px; letter-spacing: 0px;">Do you think this is spam? Then please email us at <a style="color: #39383d;" href="mailto:<%= smtpFrom %>"><%= smtpFrom %></a></p>
      </div>
      `,

    uk: `
        <div style="max-width: 560px;">
          <p style="margin: 8px 0 0 0; text-align: center; font-family: Roboto, sans-serif; font-size: 13px; font-weight: 400; line-height: 18px; letter-spacing: 0px;">Ви вважаєте що це спам? Тоді, будь ласка, напишіть нам на <a style="color: #39383d;" href="mailto:<%= smtpFrom %>"><%= smtpFrom %></a></p>
        </div>
      `,
  },
};
