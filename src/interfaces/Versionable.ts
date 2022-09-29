/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Versionable
 */

/**
 * A `Versionable` structure is capable of being identified by a
 * particular version value.
 */
export interface Versionable<T extends number | string> {
  version: T
}
