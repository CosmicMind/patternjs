/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import {
  it,
  expect,
  describe,
} from 'vitest'

import { guardFor } from '@cosmicmind/foundation'

import { Builder } from '../../src'

type Query = {
  project: string
  version: number
  tags?: string[]
}

const project = 'projects'
const version = 1
const tags = [
  'typescript',
  'coding',
  'language'
]

describe('Builder', () => {
  it('set', () => {
    const qb = new Builder<Query>({
      project,
      version,
    })

    qb.set('tags', tags)

    const q = qb.build()

    expect(guardFor(q, ...Object.keys(q) as (keyof Query)[])).toBeTruthy()

    expect(project).toBe(q.project)
    expect(version).toBe(q.version)

    expect('undefined' !== typeof q.tags).toBeTruthy()
    expect(tags).toBe(q.tags as string[])
  })

  it('map', () => {
    const qb = new Builder<Query>({
      project,
      version,
    })

    qb.map({
      tags,
    })

    const q = qb.build()

    expect(guardFor(q, ...Object.keys(q) as (keyof Query)[])).toBeTruthy()

    expect(project).toBe(q.project)
    expect(version).toBe(q.version)

    expect('undefined' !== typeof q.tags).toBeTruthy()
    expect(tags).toBe(q.tags as string[])
  })
})