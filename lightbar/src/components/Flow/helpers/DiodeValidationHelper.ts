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
}