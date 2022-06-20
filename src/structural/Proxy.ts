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
  PartialRecord,
  clone,
  guardFor,
  FoundationTypeError,
} from '@cosmicverse/foundation'

export type ProxyPropertyKey<T> = keyof T extends string | symbol ? keyof T : never

export type ProxyPropertyValidator<T> = PartialRecord<keyof T, { validate(value: T[keyof T], state: Readonly<T>): boolean }>

/**
 * The `ProxyValidationError`.
 */
export class ProxyValidationError extends FoundationTypeError {}

export function createProxyHandler<T extends object>(validator: ProxyPropertyValidator<T>): ProxyHandler<T> {
  let state = clone({}) as Readonly<T>

  return {
    construct(target: T): T {
      state = clone(target) as Readonly<T>
      return target
    },

    /**
     * The `has` checks whether a value exists in the
     * model definition, or in the instance itself.
     * The search is ordered as: immutable, mutable, virtual,
     * and then instance.
     */
    has<P extends ProxyPropertyKey<T>>(target: T, prop: P): boolean {
      return Reflect.has(target, prop)
    },

    /**
     * The `get` fetches the property value for the give property
     * key. The search is ordered as: immutable, mutable, virtual,
     * and then instance.
     */
    get<P extends ProxyPropertyKey<T>, V extends T[P]>(target: T, prop: P): V {
      return Reflect.get(target, prop)
    },

    /**
     * The `set` updates the given property with the given value.
     * The property key and value are checked against the
     * `ProxySchema`. The search is ordered as: immutable, virtual,
     * and then mutable.
     */
    set<P extends ProxyPropertyKey<T>, V extends T[P]>(target: T, prop: P, value: V): boolean | never {
      if (!guardFor(validator) || true !== validator[prop].validate(value, state)) {
        throw new ProxyValidationError(`${String(prop)} is invalid`)
      }
      else {
        state = clone(target) as Readonly<T>
        return Reflect.set(target, prop, value)
      }
    },

    /**
     * The `deleteProperty` deletes the given property so long as
     * the property is not defined in the `ProxySchema`. The
     * search is ordered as: immutable, mutable, and then virtual.
     */
    deleteProperty<P extends ProxyPropertyKey<T>>(target: T, prop: P): boolean {
      return Reflect.deleteProperty(target, prop)
    },
  }
}

export function createProxyTarget<T extends object>(target: T): T {
  return {
    ...target,
  }
}

export function createProxy<T extends object>(target: T, validator: ProxyPropertyValidator<T>): T {
  return new Proxy(createProxyTarget(target), createProxyHandler(validator))
}