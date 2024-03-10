export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface logEntityOptions {
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createAt: Date;
}
export class logEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createAt: Date;
  public origin: string;

  constructor(options: logEntityOptions) {
    this.message = options.message;
    this.level = options.level;
    this.createAt = options.createAt || new Date();
    this.origin = options.origin;
  }

  static fromJSON(json: string): logEntity {
    json = json === "" ? "{}" : json;
    const { message, createAt, level, origin } = JSON.parse(json);
    const log = new logEntity({ level, message, origin, createAt });
    log.createAt = new Date(createAt);
    return log;
  }
  static fromObject = ( object: { [key: string]: any } ): logEntity => {
    const { message, level, createAt, origin } = object;
    const log = new logEntity({
      message, level, createAt, origin
    });
    return log;
  }

}
