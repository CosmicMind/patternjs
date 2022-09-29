/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Prototype
 */

import { assign } from '@cosmicverse/foundation'

/**
 * A `Prototypeable` structure is capable of being cloned and producing
 * a new instance of its type.
 */
export interface Prototypeable {
  /**
   * Creates a copy of itself and returns it.
   */
  clone(): this
}

/**
 * A `Prototype` provides copies of itself rather than instantiating
 * newly created instances. The `assign` method is used to provide
 * the copy of the instance.
 */
export abstract class Prototype implements Prototypeable {
  /**
   * Creates a copy of itself and returns it.
   */
  clone(): this {
    return assign(Object.create(Object.getPrototypeOf(this) ?? null), this) as this
  }
}