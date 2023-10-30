import nodemailer, { Transporter } from "nodemailer";

const handleSendEmail = async (
  emailTo: string,
  subject: string,
  text: string,
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
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export default handleSendEmail;
