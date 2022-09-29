/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Builder
 */

/**
 * A `Buildable` structure is capable of constructing an instance
 * in multiple steps.
 */
export interface Buildable<T> {
  /**
   * Creates a concrete instance of type `T`.
   */
  build(): Readonly<T>
}

/**
 * A `Builder`
 */
export class Builder<T, K extends keyof T = keyof T> implements Buildable<T> {
  #props: T

  constructor(props: T) {
    this.#props = props
  }

  set<P extends K, V extends T[P]>(prop: P, value: V): this {
    Object.defineProperty(this.#props, prop, {
      configurable: true,
      enumerable: true,
      writable: false,
      value,
    })
    return this
  }

  map<P extends K, V extends T[P]>(props: Partial<Pick<T, K>>): this {
    for (const [ key, value ] of Object.entries(props)) {
      this.set(key as P, value as V)
    }
    return this
  }

  build(): Readonly<T> {
    const instance = this.#props
    this.#clear()
    return instance as T
  }

  #clear(): void {
    this.#props = {} as T
  }
}