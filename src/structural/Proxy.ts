/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicverse dot org>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module Proxy
 */

import {
  clone,
  guardFor,
  FoundationError,
} from '@cosmicverse/foundation'

/**
 * The `ProxyPropertyKey` defines the allowable keys for
 * a given type `T`.
 */
export type ProxyPropertyKey<T> = keyof T extends string | symbol ? keyof T : never

export type ProxyPropertyLifecycleHandlers<T, V> = {
  validate?(value: V, state: Readonly<T>): boolean | never,
  updated?(newValue: V, oldValue: V, state: Readonly<T>): void,
  deleted?(value: V, state: Readonly<T>): void,
}

/**
 * The `ProxyPropertyLifecycleHandlersMap` defined the `Record` types
 * used in handling property events.
 */
export type ProxyPropertyLifecycleHandlersMap<T> = {
  [P in keyof T]?: ProxyPropertyLifecycleHandlers<T, T[P]>
}

export type ProxyTargetLifecycleHandlers<T> = {
  trace?(target: Readonly<T>): void,
  created?(target: Readonly<T>): void,
  updated?(newTarget: T, oldTarget: T): void,
  properties?: ProxyPropertyLifecycleHandlersMap<T>
}

/**
 * The `ProxyError`.
 */
export class ProxyError extends FoundationError {}

/**
 * The `createProxyHandler` prepares the `ProxyTargetLifecycleHandlers` for
 * the given `handler`.
 */
export function createProxyHandler<T extends object>(target: T, handler: ProxyTargetLifecycleHandlers<T>): ProxyHandler<T> {
  let state = clone(target) as Readonly<T>

  return {
    /**
     * The `set` updates the given property with the given value..
     */
    set<P extends ProxyPropertyKey<T>, V extends T[P]>(target: T, prop: P, value: V): boolean | never {
      const handlers = handler.properties?.[prop]

      if (guardFor(handlers)) {
        if (!handlers.validate?.(value, state)) {
          throw new ProxyError(`${String(prop)} is invalid`)
        }
      }

      if (guardFor(target, prop)) {
        const oldValue = target[prop]
        const oldTarget = state

        try {
          return Reflect.set(target, prop, value)
        }
        finally {
          state = clone(target) as Readonly<T>

          if (guardFor(handlers)) {
            handlers.updated?.(value, oldValue, state)
          }

          if ('undefined' !== typeof oldTarget) {
            handler.updated?.(state, oldTarget)
            handler.trace?.(state)
          }
        }
      }
      else {
        return false
      }
    },
  }
}

/**
 * The `createProxy` creates a new `Proxy` instance with the
 * given `target` and `handler`.
 */
export const createProxy = <T extends object>(target: T, handler: ProxyTargetLifecycleHandlers<T> = {}): T | never => {
  if (guardFor(target)) {
    const properties = handler.properties

    if (guardFor(properties)) {
      for (const prop in properties) {
        if (!properties[prop]?.validate?.(target[prop], {} as Readonly<T>)) {
          throw new ProxyError(`${String(prop)} is invalid`)
        }
      }
    }

    const state = clone(target) as Readonly<T>
    handler.created?.(state)
    handler.trace?.(state)
  }

  return new Proxy(target, createProxyHandler(target, handler))
}