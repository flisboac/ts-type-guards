import { primitive, Classy, InterfaceDescriptor, InterfaceFromDescriptor, SliceGuardDescriptor } from "./types";
import { isBoolean, isNumber, isString, isSymbol, isNull, isUndefined, isPrimitive, isNonPrimitive, is, isLike, isImplementationOf, isSliceOf } from "./is";

export function isArrayOfBooleans(x: any): x is boolean[] {
    return isArrayOfLike(true)(x);
}

export function isArrayOfNumbers(x: any): x is number[] {
    return isArrayOfLike(1)(x);
}

export function isArrayOfStrings(x: any): x is string[] {
    return isArrayOfLike("")(x);
}

export function isArrayOfSymbols(x: any): x is symbol[] {
    return isArrayOfLike(Symbol())(x);
}

export function isArrayOfNulls(x: any): x is null[] {
    return isArrayOfLike(null)(x);
}

export function isArrayOfUndefineds(x: any): x is undefined[] {
    return isArrayOfLike(undefined)(x);
}

export function isArrayOfPrimitives(x: any): x is primitive[] {
    return is(Array)(x) && x.every(isPrimitive);
}

export function isArrayOfObjects(x: any): x is object[] {
    return is(Array)(x) && x.every(isNonPrimitive);
}

export function isArrayOf<T>(type: Classy<T>): (xs: any) => xs is T[] {
    return (xs: any): xs is T[] => is(Array)(xs) && xs.every(is(type));
}

export function isArrayOfLike<T>(reference: T): (x: any) => x is T[] {
    return (x: any): x is T[] => is(Array)(x) && x.every(isLike(reference));
}

export function isArrayOfImplementations<D extends InterfaceDescriptor>(
    map: D
): (x: any) => x is InterfaceFromDescriptor<D>[] {
    return (x: any): x is InterfaceFromDescriptor<D>[] => is(Array)(x) && x.every(isImplementationOf(map));
}

export function isArrayOfSlices<T extends object = object, K extends keyof T = keyof T>(
    map: SliceGuardDescriptor<T, K>
): (x: any) => x is Pick<T, K>[] {
    return (x: any): x is T[] => is(Array)(x) && x.every(isSliceOf(map));
}