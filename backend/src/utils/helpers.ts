import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.NODEMAIL_EMAIL;
const pass = process.env.NODEMAIL_PASSWORD;

export const generateRandomPassword = (length: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
};

const generateMessage = (
  name: string,
  email: string,
  role: string,
  password: string,
) => {
  const html = `<html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome as ${role}</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; margin: 20px;">
            <h1>Hello ${name},</h1>
            <p>You are registered as ${role.toLowerCase()}</p>
            ${
              password
                ? `<h3>Your credentials</h3>
            <div>
            <span>Your email: </span>
            <span>${email}</span>
            </div>
            <div>
            <span>Your password:   </span>
            <span>${password}</span>
            </div>`
                : ""
            }
            <p>Sincerely,<br> The gym</p>
        </div>
    </body>
    </html>
    `;
  return html;
};

export const sendEmail = async (
  name: string,
  email: string,
  role: string,
  password: string,
) => {
  const subject = "Welcome " + name;
  const message = generateMessage(name, email, role, password);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
  await transporter.sendMail({
    from: `${name} <${email}>`,
    to: email,
    subject,
    html: message,
  });
};

export const generateResetPasswordMessage = (
  name: string,
  password: string,
) => {
  const html = `<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; margin: 20px;">
            <h1>Hello ${name},</h1>
            <h3>Your new password is: <span>${password}</span>
            </h3>
            <p>Sincerely,<br> The gym</p>
        </div>
    </body>
    </html>
    `;
  return html;
};
