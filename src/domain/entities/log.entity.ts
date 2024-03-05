export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class logEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createAt = new Date();
  }

  static fromJSON(json: string): logEntity {
    const { message, createAt, level } = JSON.parse(json);
    const log = new logEntity(level, message);
    log.createAt = new Date(createAt);
    return log;
  }
}
