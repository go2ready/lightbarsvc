// fill="#044B94" fill-opacity="0.4"

export class DiodeColourHelper {
  public static DiodeMap: Map<string, string> = new Map([
    ['380', '#F07FFF'],
    ['410', '#EB56FF'],
    ['420', '#E535FC'],
    ['430', '#E419FF'],
    ['440', '#3B05FF'],
    ['450', '#0526FF'],
    ['460', '#054BFF'],
    ['470', '#0582FF'],
    ['480', '#05A7FF'],
    ['490', '#05C0FF'],
    ['500', '#05FFFA'],
    ['590', '#FF8205'],
    ['740', '#FF4747'],
    ['20kK', '#FBFF1E'],
    ['5kK', '#FFB01E'],
  ]);

  public static GetDiodeColorHexByName(name: string) : string {
    var c = DiodeColourHelper.DiodeMap.get(name);

    if (c)
    {
      return c;
    }

    return '#000000';
  }
}