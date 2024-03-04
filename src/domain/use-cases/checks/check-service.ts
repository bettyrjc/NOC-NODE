interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallback = () => void;
type errorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
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
      this.successCallback();
 
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      console.log("error", error);
      return false;
    }
  }
}
