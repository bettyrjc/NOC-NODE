import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entity";
import { logRespository } from "../../repository/log.respository";

interface SendEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRespository: any
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email not sent");
      }
      const log = {
        level: LogSeverityLevel.low,
        message: `Email  sent to ${to}`,
        origin: "send-email-logs.ts",
        createAt: new Date(),
      };
      this.logRespository.saveLog(log); //log error
      return true;
    } catch (error) {
      const log = {
        level: LogSeverityLevel.high,
        message: `Email not sent ${error}`,
        origin: "send-email-logs.ts",
        createAt: new Date(),
      };
      this.logRespository.saveLog(log); //log error
      return false;
    }
  }
}
