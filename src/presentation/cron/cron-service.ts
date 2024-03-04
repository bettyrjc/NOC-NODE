import { CronJob } from "cron";
type cronTime = string | Date;
type onTick = () => void;

export class CronService {
  public static createJob(cronTime: cronTime, onTick: onTick): CronJob {
    console.log("Cron service started");
    const job = new CronJob(cronTime, onTick);
    job.start();

    return job;
  }
}
