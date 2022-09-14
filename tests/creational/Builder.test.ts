// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

import test from 'ava'

import { guardFor } from '@cosmicverse/foundation'

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

test('Builder: set', t => {
  const qb = new Builder<Query>({
    project,
    version,
  })

  qb.set('tags', tags)

  const q = qb.build()

  t.true(guardFor(q, ...Object.keys(q) as (keyof Query)[]))

  t.is(project, q.project)
  t.is(version, q.version)

  t.true('undefined' !== typeof q.tags)
  t.is(tags, q.tags as string[])
})

test('Builder: map', t => {
  const qb = new Builder<Query>({
    project,
    version,
  })

  qb.map({
    tags,
  })

  const q = qb.build()

  t.true(guardFor(q, ...Object.keys(q) as (keyof Query)[]))

  t.is(project, q.project)
  t.is(version, q.version)

  t.true('undefined' !== typeof q.tags)
  t.is(tags, q.tags as string[])
})
