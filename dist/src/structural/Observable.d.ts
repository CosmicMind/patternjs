export type ObservableFn<T> = (message: T) => void;
export type ObservableTopics = {
    readonly [K: string]: unknown;
};
export type ObservableTopicMap<T extends ObservableTopics> = {
    [K in keyof T]: Set<ObservableFn<T[K]>>;
};
export declare class Observable<T extends ObservableTopics> {
    protected readonly topics: Partial<ObservableTopicMap<T>>;
    constructor();
    subscribe<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void;
    once<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void;
    unsubscribe<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void;
    protected publish<K extends keyof T>(topic: K, message: T[K]): () => void;
    protected publishSync<K extends keyof T>(topic: K, message: T[K]): void;
}
