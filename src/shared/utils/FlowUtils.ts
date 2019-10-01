
export class FlowUtils {
  public static delay (ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}