export class DiodeToSpectrumHelper {
  public static wlLow: number = 380;
  public static wlHigh: number = 800;
  
  public static GetNarrowDiodeMap (wavelength: string)
  {
    var values = [];

    var wlnumber = +wavelength;
    var low2 = wlnumber - 20;
    var low1 = wlnumber - 10;
    var high1 = wlnumber + 10;
    var high2 = wlnumber + 20;

    for (var _i = this.wlLow; _i < this.wlHigh; _i += 10)
    {
      switch(_i)
      {
        case low2:
          values.push(0.2);
          break;
        case low1:
          values.push(0.6);
          break;
        case wlnumber:
          values.push(1);
          break;
        case high1:
          values.push(0.6);
          break;
        case high2:
          values.push(0.2);
          break;
        default:
          values.push(0);
          break;
      }
    }

    return values;
  }

  public static spectrum8kK: number[] = [
    //380
    0.0,
    //390
    0.0,
    //400
    0.01,
    //410
    0.03,
    //420
    0.05,
    //430
    0.1,
    //440
    0.7,
    //450
    0.68,
    //460
    0.6,
    //470
    0.65,
    //480
    0.55,
    //490
    0.35,
    //500
    0.3,
    //510
    0.35,
    //520
    0.47,
    //530
    0.5,
    //540
    0.55,
    //550
    0.56,
    //560
    0.56,
    //570
    0.58,
    //580
    0.51,
    //590
    0.48,
    //600
    0.46,
    //610
    0.44,
    //620
    0.4,
    //630
    0.36,
    //640
    0.29,
    //650
    0.25,
    //660
    0.21,
    //670
    0.18,
    //680
    0.16,
    //690
    0.14,
    //700
    0.12,
    //710
    0.11,
    //720
    0.09,
    //730
    0.06,
    //740
    0.05,
    //750
    0.04,
    //760
    0.03,
    //770
    0.02,
    //780
    0.01,
    //790
    0.0,
  ];

  public static spectrum20kK: number[] = [
    //380
    0.01,
    //390
    0.08,
    //400
    0.15,
    //410
    0.18,
    //420
    0.21,
    //430
    0.25,
    //440
    0.5,
    //450
    0.7,
    //460
    0.6,
    //470
    0.35,
    //480
    0.25,
    //490
    0.265,
    //500
    0.258,
    //510
    0.253,
    //520
    0.257,
    //530
    0.254,
    //540
    0.248,
    //550
    0.23,
    //560
    0.215,
    //570
    0.21,
    //580
    0.2,
    //590
    0.189,
    //600
    0.17,
    //610
    0.171,
    //620
    0.168,
    //630
    0.161,
    //640
    0.15,
    //650
    0.138,
    //660
    0.126,
    //670
    0.11,
    //680
    0.1,
    //690
    0.09,
    //700
    0.08,
    //710
    0.07,
    //720
    0.06,
    //730
    0.05,
    //740
    0.04,
    //750
    0.03,
    //760
    0.02,
    //770
    0.01,
    //780
    0.0,
    //790
    0.0,
  ];

  public static SpecialDiodeToSpectrum: Map<string, number[]> 
    = new Map([
      ['8kK', DiodeToSpectrumHelper.spectrum8kK],
      ['20kK', DiodeToSpectrumHelper.spectrum20kK],
    ]);
}