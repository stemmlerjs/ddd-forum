
export class TextUtil {
  
  public static validateEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public static atLeast (text: string, length: number): boolean {
    if (!!text === false || text.length >= length) return false;
    return true;
  }

  public static atMost (text: string, length: number): boolean {
    if (!!text === false || text.length <= length) return false;
    return true;
  }
}