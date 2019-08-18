export class WebSettingProvider {  
  private static ReturnURL: string = ((<any>window).callbackAddr).replace(/&amp;/g, '&');
  
  public static ProductAttribute: string = (<any>window).productAttribute;
  public static ProductReference: string = (<any>window).productReference;

  public static isReturnURLValid () {
    return WebSettingProvider.ReturnURL !== '' && WebSettingProvider.ReturnURL !== '{{ callback_addr }}';
  }

  public static isProductAttributeValid () {
    return WebSettingProvider.ProductAttribute !== '' && WebSettingProvider.ProductAttribute !== '{{ product_attribute }}';
  }

  public static GetReturnUri(customisationPayload : string)
  {
    return WebSettingProvider.ReturnURL + customisationPayload;
  }
}