export class ColorMath {
  public static GetContrastColorHex(cHex: string | undefined): string 
  {
    if (cHex !== undefined)
    {
      let d = 0;
      const colorComponent = ColorMath.HexToRgb(cHex);
  
      if (colorComponent != null)
      {
        // Counting the perceptive luminance - human eye favors green color... 
        const a = 1 - ( 0.299 * colorComponent.r 
          + 0.587 * colorComponent.g + 0.114 * colorComponent.b) / 255;
  
        if (a < 0.5)
        {
          d = 0; // bright colors - black font
        }
        else
        {
          d = 255; // dark colors - white font
        }
      }
      else
      {
        console.error("GetContrastColorHex, the color component returns null");
      }

      return ColorMath.RgbToHex(d, d, d);
    }

    console.error("GetContrastColorHex: inputing Hex is undefined, returning black");
    return '#000000';
  }

  public static HexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  public static RgbToHex(r: number, g: number, b: number): string {
    return "#" + ColorMath.ComponentToHex(r) 
      + ColorMath.ComponentToHex(g) + ColorMath.ComponentToHex(b);
  }

  private static ComponentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
}
