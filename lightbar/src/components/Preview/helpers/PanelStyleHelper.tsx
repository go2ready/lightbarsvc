import { LightBarStyle } from '../../../types/FlowState';

export class PanelStyleHelper {
  public static GetPanelStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          height:175,
        };
      case LightBarStyle.Ninety:
        return {
          height:175,
        };
      case LightBarStyle.OneTwety:
        return {
          height:175,
        };
      default:
        break;
    }
    return {};
  }

  public static GetBgStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          height: 120,
          width: 900,
        };
      case LightBarStyle.Ninety:
        return {
          height: 140,
          width: 1350,
        };
      case LightBarStyle.OneTwety:
        return {
          height: 160,
          width: 1800,
        };
      default:
        break;
    }
    return {};
  }

  public static GetDiodeContainerStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          height: 120,
          top: 2,
          left: 25,
          width: 850,
        };
      case LightBarStyle.Ninety:
        return {
          height: 100,
          top: 22,
          left: 35,
          width: 1280,
        };
      case LightBarStyle.OneTwety:
        return {
          height: 80,
          top: 42,
          left: 40,
          width: 1720,
        };
      default:
        break;
    }
    return {};
  }

  public static GetDiodeTextContainerStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          marginTop: -30,
          height: 10,
          top: 0,
          left: 25,
          width: 850,
        };
      case LightBarStyle.Ninety:
        return {
          height: 10,
          top: 5,
          left: 35,
          width: 1280,
        };
      case LightBarStyle.OneTwety:
        return {
          height: 10,
          top:30,
          left: 40,
          width: 1720,
        };
      default:
        break;
    }
    return {};
  }

  public static GetDiodeCellStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          padding: 5,
        };
      case LightBarStyle.Ninety:
        return {
          padding: 5,
        };
      case LightBarStyle.OneTwety:
        return {
          padding: 5,
        };
      default:
        break;
    }
    return {};
  }

  public static GetDiodeTextCellStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          width: 40,
          padding: 5,
        };
      case LightBarStyle.Ninety:
        return {
          width: 40,
          padding: 5,
        };
      case LightBarStyle.OneTwety:
        return {
          width: 40,
          padding: 5,
        };
      default:
        break;
    }
    return {};
  }

  public static GetDiodeCellTextStyle(lightBarStyle: LightBarStyle | undefined)
  {
    switch(lightBarStyle)
    {
      case LightBarStyle.Sixty:
        return {
          top: 45,
        };
      case LightBarStyle.Ninety:
        return {
          top: 35,
        };
      case LightBarStyle.OneTwety:
        return {
          top: 25,
        };
      default:
        break;
    }
    return {};
  }
}