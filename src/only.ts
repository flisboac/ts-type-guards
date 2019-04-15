import { primitive, Classy, SliceGuardDescriptor, InterfaceDescriptor, InterfaceFromDescriptor } from "./types";
import { isBoolean, isNumber, isString, isSymbol, isNull, isUndefined, isPrimitive, isNonPrimitive, is, isLike, isImplementationOf, isSliceOf } from "./is";

export function onlyBooleans(xs: any[]): boolean[] {
    return xs.filter(isBoolean);
}

export function onlyNumbers(xs: any[]): number[] {
    return xs.filter(isNumber);
}

export function onlyStrings(xs: any[]): string[] {
    return xs.filter(isString);
}

export function onlySymbols(xs: any[]): symbol[] {
    return xs.filter(isSymbol);
}

export function onlyNulls(xs: any[]): null[] {
    return xs.filter(isNull);
}

export function onlyUndefineds(xs: any[]): undefined[] {
    return xs.filter(isUndefined);
}

export function onlyPrimitives(xs: any[]): primitive[] {
    return xs.filter(isPrimitive);
}

export function onlyObjects(xs: any[]): object[] {
    return xs.filter(isNonPrimitive);
}

export function only<T>(type: Classy<T>): (xs: any[]) => T[] {
    return (xs: any[]): T[] => xs.filter(is(type));
}

export function onlyLike<T>(reference: T): (xs: any[]) => T[] {
    return (xs: any[]): T[] => xs.filter(isLike(reference));
}

export function onlyImplementationsOf<D extends InterfaceDescriptor>(
    map: D
): (xs: any[]) => InterfaceFromDescriptor<D>[] {
    return (xs: any) => xs.filter(isImplementationOf(map));
}

export function onlySlicesOf<T extends object = object, K extends keyof T = keyof T>(
    map: SliceGuardDescriptor<T, K>
): (xs: any[]) => Pick<T, K>[] {
    return (xs: any) => xs.filter(isSliceOf(map));
}
