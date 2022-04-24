
export type GuardResponse = string;

import { Result } from "./Result";

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  
  public static combine (guardResults: Result<any>[]): Result<GuardResponse> {
    for (let result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static greaterThan (minValue: number, actualValue: number): Result<GuardResponse> {
    return actualValue > minValue 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Number given {${actualValue}} is not greater than {${minValue}}`);
  }

  public static againstAtLeast (numChars: number, text: string): Result<GuardResponse> {
    return text.length >= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`);
  }

  public static againstAtMost (numChars: number, text: string): Result<GuardResponse> {
    return text.length <= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`);
  }

  public static againstNullOrUndefined (argument: any, argumentName: string): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(`${argumentName} is null or undefined`)
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  public static isOneOf (value: any, validValues: any[], argumentName: string) : Result<GuardResponse> {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Result.ok<GuardResponse>()
    } else {
      return Result.fail<GuardResponse>(`${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`);
    }
  }

  public static inRange (num: number, min: number, max: number, argumentName: string) : Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Result.fail<GuardResponse>(`${argumentName} is not within range ${min} to ${max}.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }

  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : Result<GuardResponse> {
    let failingResult: Result<GuardResponse> = null;

    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.isFailure) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return Result.fail<GuardResponse>(`${argumentName} is not within the range.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }
}