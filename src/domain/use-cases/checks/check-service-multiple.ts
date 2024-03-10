import { LogSeverityLevel, logEntity } from "../../entities/log.entity";
import { logRespository } from "../../repository/log.respository";
interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallback = () => void | undefined;
type errorCallback = (error: string) => void | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRespository: logRespository[],
    private readonly successCallback: successCallback,
    private readonly errorCallback: errorCallback
  ) {}

  private callLogs (log: logEntity) {
    this.logRespository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }
  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          `Error: ${response.status} - ${response.statusText}- url: ${url}`
        );
      const msg = `services ${url} worked`;
      const log = new logEntity({
        message: msg,
        level: LogSeverityLevel.low,
        origin: "CheckService",
        createAt: new Date(),
      }); // Fix: Pass the correct value of LogSeverityLevel
      this.callLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMsg = `${url} is no ok. ${error}`;
      const log = new logEntity({
        message: errorMsg,
        level: LogSeverityLevel.high,
        origin: "CheckService",
        createAt: new Date(),
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMsg);
      return false;
    }
  }
}
