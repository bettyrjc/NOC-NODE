import { logDatasource } from "../../domain/datasources/log-datasource";
import { LogSeverityLevel, logEntity } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements logDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path: string) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(newLog: logEntity): Promise<void> {
    const logJSON = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logJSON);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logJSON);
    } else {
      fs.appendFileSync(this.highLogsPath, logJSON);
    }
  }

  private getLogsFromFile = (path: string): logEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => logEntity.fromJSON(log));
    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${LogSeverityLevel} not found`);
    }
  }
}
