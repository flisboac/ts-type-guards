export type primitive = boolean | number | string | symbol | null | undefined;

export type Classy<T> = Function & { prototype: T };

export type TypeGuard<T> = (x: any) => x is T;

export type InterfaceDescriptor<K extends string | number | symbol = string | number | symbol> = {
    [Key in K]: TypeGuard<any>;
}

export interface InterfaceGuardFromDescriptor<D extends InterfaceDescriptor> {
    (value: any): value is InterfaceFromDescriptor<D>;
}

export type InterfaceFromDescriptor<D> = 
    D extends { [Key in keyof D]: TypeGuard<any> } ? { [Key in keyof D]: D[Key] extends TypeGuard<infer V> ? V : never }
    : never;

export interface SliceGuard<T, K extends keyof T = keyof T> {
    (value: any): value is Pick<T, K>;
};

export type SliceGuardDescriptor<T, K extends keyof T = keyof T> = {
    [Key in K]: TypeGuard<T[K]>;
};
