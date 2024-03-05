import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { logRespositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";


const fileSystemLogRepository = new logRespositoryImpl(
  new FileSystemDataSource() //eventually can change to another datasource
);

export class Server {
  public static start() {
    console.log("Server started");
    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000/posts";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`url is ok ${url}`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
