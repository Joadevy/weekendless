import nodemailer, { Transporter } from "nodemailer";
import * as handlebars from "handlebars";

import { welcomeTemplate } from "./template";

const handleSendEmail = async (
  emailTo: string,
  subject: string,
  html: string,
) => {
  let transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: emailTo,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export const compileWelcomeTemplate = (
  name: string,
  eventName: string,
  eventDate: string,
  venueName: string,
  venueAddress: string,
  number: string,
  description: string,
  value: string,
) => {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name,
    eventName,
    eventDate,
    venueName,
    venueAddress,
    number,
    description,
    value,
  });

  return htmlBody;
};

export default handleSendEmail;
