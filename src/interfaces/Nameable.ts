// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

/**
 * @module Nameable
 */

/**
 * A `Nameable` structure is capable of being identified by a
 * particular name value.
 */
export interface Nameable<T extends string> {
  name: T
}
