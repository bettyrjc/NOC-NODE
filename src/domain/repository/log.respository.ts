import { LogSeverityLevel, logEntity } from "../entities/log.entity";

export abstract class logRespository {
  abstract saveLog(log: logEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]>;
}