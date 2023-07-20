export type Buildable<T> = {
    build(): Readonly<T>;
};
export declare class Builder<T, K extends keyof T = keyof T> implements Buildable<T> {
    #private;
    constructor(props: T);
    set<P extends K, V extends T[P]>(prop: P, value: V): this;
    map<P extends K, V extends T[P]>(props: Partial<Pick<T, K>>): this;
    build(): Readonly<T>;
}
