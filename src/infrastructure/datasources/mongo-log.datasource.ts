import { LogModel } from "../../data/mongo";
import { logDatasource } from "../../domain/datasources/log-datasource";
import { LogSeverityLevel, logEntity } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements logDatasource {
  async saveLog(log: logEntity): Promise<void>{
    const newLog = await LogModel.create(log)
    console.log('Mongo log created', newLog.id)
  }
  async getLogs( severityLevel: LogSeverityLevel ): Promise<logEntity[]> {
    
    const logs = await LogModel.find({
      level: severityLevel
    });

    return logs.map( logEntity.fromObject );
  }
}