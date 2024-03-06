import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface Attachements {
  filename?: string;
  path?: string;
}
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements: Attachements[];
}
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_PASSWORD,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });
      console.log("sendInformation", sendInformation);
      return true;
    } catch (error) {
      return false;
    }
  }
  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs";
    const htmlBody = "<h1>Logs</h1>";
    const attachements:Attachements[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
    ];

    this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
