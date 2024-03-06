import { logRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-log";
import { logRespository } from "../domain/repository/log.respository";

const fileSystemLogRepository = new logRespositoryImpl(
  new FileSystemDataSource() //eventually can change to another datasource
);
const emailService = new EmailService();

export class Server {
  public static start() {
    // console.log("Server started");
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://localhost:3000/posts";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`url is ok ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    // emailService.sendEmail({
    //   to: "bettyjimenez3010@gmail.com",
    //   subject: "mi primer correoooo!!!",
    //   htmlBody: "<h1>hola mundo</h1>",
    // });
    // emailService.sendEmailWithFileSystemLogs([
    //   "bettyjimenez3010@gmail.com",
    //   "betty@getnada.com",
    // ]);

    new SendEmailLogs(
      emailService,
      fileSystemLogRepository
    ).execute(["bettyjimenez3010@gmail.com","betty@getnada.com",]);
  }
}
