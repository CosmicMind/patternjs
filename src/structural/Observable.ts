/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Observable
 */

import {
  async,
  guardFor,
} from '@cosmicverse/foundation'

export type ObservableFn<T> = (message: T) => void

export type ObservableTopics = {
  readonly [K: string]: unknown
}

export type ObservableTopicMap<T extends ObservableTopics> = {
  [K in keyof T]: Set<ObservableFn<T[K]>>
}

export abstract class Observable<T extends ObservableTopics> {
  protected readonly topics: Partial<ObservableTopicMap<T>>

  protected constructor() {
    this.topics = {}
  }

  subscribe<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void {
    if (!this.topics[topic]) {
      this.topics[topic] = new Set()
    }
    const topics = this.topics[topic]
    if (guardFor(topics)) {
      for (const cb of fn) {
        topics?.add(cb)
      }
    }
  }

  once<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void {
    const cb = (message: T[K]): void => {
      this.unsubscribe(topic, cb)
      for (const cb of fn) {
        cb(message)
      }
    }
    this.subscribe(topic, cb)
  }

  unsubscribe<K extends keyof T>(topic: K, ...fn: ObservableFn<T[K]>[]): void {
    if (this.topics[topic]) {
      const topics = this.topics[topic]
      if (guardFor(topics)) {
        for (const cb of fn) {
          topics?.delete(cb)
        }
      }
    }
  }

  protected publish<K extends keyof T>(topic: K, message: T[K]): () => void {
    return async((): void => {
      const topics = this.topics[topic]
      if (guardFor(topics)) {
        for (const fn of topics) {
          fn(message)
        }
      }
    })
  }

  protected publishSync<K extends keyof T>(topic: K, message: T[K]): void {
    const topics = this.topics[topic]
    if (guardFor(topics)) {
      for (const fn of topics) {
        fn(message)
      }
    }
  }
}
