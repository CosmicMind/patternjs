// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

/**
 * @module Typeable
 */

/**
 * A `Typeable` structure is capable of being identified by a
 * particular type value.
 */
export interface Typeable<T extends string> {
  type: T
}
