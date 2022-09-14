// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

/**
 * @module Serializable
 */

/**
 * The `Serializable` protocol defines the implementation
 * criteria that adheres to the given protocol.
 */
export interface Serializable {
  /**
   * Converts the implementation class to a serialized value.
   */
  get serialized(): string
}
