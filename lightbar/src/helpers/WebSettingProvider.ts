export class WebSettingProvider {  
  private static ReturnURL: string = ((<any>window).callbackAddr).replace(/&amp;/g, '&');
  
  public static ProductReference: string = (<any>window).product_reference;

  public static isReturnURLValid () {
    return WebSettingProvider.ReturnURL !== '';
  }

  public static GetReturnUri(customisationPayload : string)
  {
    return WebSettingProvider.ReturnURL + customisationPayload;
  }
}