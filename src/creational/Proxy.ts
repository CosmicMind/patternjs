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
  Optional,
} from '@cosmicverse/foundation'

export type ProxyPropertyKey<T> = keyof T extends string | symbol ? keyof T : never

export type ProxyPropertyValidator<T> = Record<keyof T, { validate(value: T[keyof T], state: Readonly<T>): boolean }>

export function createProxyHandler<T extends object>(validator: ProxyPropertyValidator<T>): ProxyHandler<T> {
  let state = clone({})

  return {
    has<P extends ProxyPropertyKey<T>>(target: T, prop: P): boolean {
      return Reflect.has(target, prop)
    },

    set<P extends ProxyPropertyKey<T>, V extends T[P]>(target: T, prop: P, value: V): boolean {
      if (!validator[prop].validate.call(target, value, state as Readonly<T>)) {
        return false
      }
      state = clone(target)
      return Reflect.set(target, prop, value)
    },

    get<P extends ProxyPropertyKey<T>, V extends T[P]>(target: T, prop: P): V {
      return Reflect.get(target, prop)
    },

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

export function createProxy<T extends object, Q extends ProxyPropertyValidator<T>>(target: T, validator: Q): T {
  return new Proxy(createProxyTarget(target), createProxyHandler(validator))
}