import { LightBarStyle } from '../../../types/FlowState';
import { WebSettingProvider } from '../../../helpers/WebSettingProvider';

export class BuyUrlHelper {
  private static customProductAttribute: number = 26; // TODO: change this to the custom product attribute

  public static ConstructBuyUrl(style : LightBarStyle, bracket: boolean, preset: string | undefined = undefined) : string | undefined {
    // http://51.140.8.145/module/ps_buybuttonlite/RedirectManager?id_product={0}\&action=1\&id_product_attribute={1}\&custom_text=
    if (WebSettingProvider.isReturnURLValid())
    {
      var url = WebSettingProvider.ReturnURL;

      if (preset !== undefined)
      {
        var attriProduct = BuyUrlHelper.CombinationMap.get(preset+style+bracket);

        if (attriProduct !== undefined)
        {
          return url + '&id_product_attribute=' + attriProduct.toString();
        }
      }
      else
      {
        url = url + '&id_product_attribute=' + BuyUrlHelper.customProductAttribute.toString();
        return url + '&custom_text=' + preset;
      }
    }

    return undefined;
  }

  // Order as, spectrum name+style+bracket
  public static CombinationMap: Map<string, number> = new Map([
    ['Rapid Growth' + LightBarStyle.Sixty + false, 0],
    ['Nature Sun' + LightBarStyle.Sixty + false, 0],
    ['Fluorescent' + LightBarStyle.Sixty + false, 0],

    ['Rapid Growth' + LightBarStyle.Ninety + false, 0],
    ['Nature Sun' + LightBarStyle.Ninety + false, 0],
    ['Fluorescent' +  + LightBarStyle.Ninety + false, 0],
  
    ['Rapid Growth' + LightBarStyle.OneTwety + false, 0],
    ['Nature Sun' + LightBarStyle.OneTwety + false, 0],
    ['Fluorescent' +  + LightBarStyle.OneTwety + false, 0],

    ['Rapid Growth' + LightBarStyle.Sixty + true, 0],
    ['Nature Sun' + LightBarStyle.Sixty + true, 0],
    ['Fluorescent' + LightBarStyle.Sixty + true, 0],

    ['Rapid Growth' + LightBarStyle.Ninety + true, 0],
    ['Nature Sun' + LightBarStyle.Ninety + true, 0],
    ['Fluorescent' +  + LightBarStyle.Ninety + true, 0],
  
    ['Rapid Growth' + LightBarStyle.OneTwety + true, 0],
    ['Nature Sun' + LightBarStyle.OneTwety + true, 0],
    ['Fluorescent' +  + LightBarStyle.OneTwety + true, 0],
  ]);
}