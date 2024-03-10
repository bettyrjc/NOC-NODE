import { logDatasource } from "../../domain/datasources/log-datasource";
import { LogSeverityLevel, logEntity } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";
const prismaClient = new PrismaClient();
const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};
export class PostgresLogDataSource implements logDatasource {
  async saveLog(log: logEntity): Promise<void> {
    await prismaClient.logModel.create({
      data: {
        origin: log.origin,
        message: log.message,
        createAt: log.createAt,
        level: severityEnum[log.level],
      },
    });
    console.log("Postgres log created");
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]> {
    const level = severityEnum[severityLevel];
    const dbLogs = await prismaClient.logModel.findMany({
      where: { level },
    });

    return dbLogs.map(logEntity.fromObject);
  }
}
