import { logEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { logRespository } from "../../domain/repository/log.respository";
import { logDatasource } from "../../domain/datasources/log-datasource";

export class logRespositoryImpl implements logRespository {
  constructor(private readonly logDatasource: logDatasource) {}
  async saveLog(log: logEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
