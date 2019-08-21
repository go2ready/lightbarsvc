export class WebSettingProvider {  
  public static ReturnURL: string = ((window as any).callbackAddr).replace(/&amp;/g, '&');
  
  public static ProductAttribute: string = (window as any).productAttribute;
  public static ProductReference: string = (window as any).productReference;

  public static isReturnURLValid () {
    return WebSettingProvider.ReturnURL !== '' && WebSettingProvider.ReturnURL !== '{{ callback_addr }}';
  }

  public static isProductAttributeValid () {
    return WebSettingProvider.ProductAttribute !== '' && WebSettingProvider.ProductAttribute !== '{{ product_attribute }}';
  }
}