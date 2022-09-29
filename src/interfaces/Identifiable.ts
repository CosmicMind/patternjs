/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Identifiable
 */

/**
 * A `Identifiable` structure is capable of being identified by a
 * particular id value.
 */
export interface Identifiable<T extends string | number | symbol> {
  id: T
}
