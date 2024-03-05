import { LogSeverityLevel, logEntity } from "../../entities/log.entity";
import { logRespository } from "../../repository/log.respository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallback = () => void | undefined;
type errorCallback = (error: string) => void | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRespository: logRespository,
    private readonly successCallback: successCallback,
    private readonly errorCallback: errorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(
          `Error: ${response.status} - ${response.statusText}- url: ${url}`
        );
      const msg = `services ${url} worked`;
      const log = new logEntity(msg, LogSeverityLevel.low); // Fix: Pass the correct value of LogSeverityLevel
      this.logRespository.saveLog(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMsg = `${url} is no ok. ${error}`;
      const log = new logEntity(errorMsg, LogSeverityLevel.high);
      this.logRespository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMsg);
      return false;
    }
  }
}
