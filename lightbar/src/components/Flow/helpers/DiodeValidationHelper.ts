import { PresetHelper } from './PresetHelper';

import { LightBarStyle } from '../../../types/FlowState';

export class DiodeValidationHelper
{
  // return a sequence of invalid string
  // empty should be treated as valid
  public static IsValid(diodeSequence: string[]) : number[]
  {
    var result : number[] = [];

    for (var _i = 0; _i < diodeSequence.length; _i++) {
      if (diodeSequence[_i] === 'N/A')
      {
        result.push(_i);
      }
    }
  
    return result
  }

  public static IsPreset(diodeSequence: string[]) : string | undefined 
  {
    var lightBarStyle = DiodeValidationHelper.GetLightbarStyleByDiodeSeq(diodeSequence);
    if (lightBarStyle !== undefined)
    {
      var spectrumMap = DiodeValidationHelper.GetSpectrumMap(lightBarStyle);
      var resultkey = undefined;
      spectrumMap.forEach((value: string[], key: string) => {
        var mapValue = value.join('');
        var diodeValue = diodeSequence.join('');
        console.log(key);
        console.log(mapValue);
        console.log(diodeValue);
        if (mapValue === diodeValue)
        {
          resultkey = key;
        }
      });
    }

    return resultkey;
  }

  private static GetLightbarStyleByDiodeSeq(diodeSequence: string[]): LightBarStyle | undefined
  {
    var length = diodeSequence.length;
    switch(length)
    {
      case 18:
        return LightBarStyle.Sixty;
      case 24:
        return LightBarStyle.Ninety;
      case 36:
        return LightBarStyle.OneTwety;
    }

    return undefined;
  }

  private static GetSpectrumMap(lightBarStyle: LightBarStyle) {
    var rightMap = new Map<string, string[]>();
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        rightMap = PresetHelper.PresetMap600;
        break;
      case LightBarStyle.Ninety:
        rightMap = PresetHelper.PresetMap900;
        break;
      case LightBarStyle.OneTwety:
        rightMap = PresetHelper.PresetMap1200;
        break;
    }

    return rightMap;
  }
}