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

import test from 'ava'

import {
  guardFor,
  RequiredOnly,
  OptionalOnly,
} from '@cosmicverse/foundation'

import { Builder } from '../../src'

interface Query {
  readonly project?: string
  version: number
  tags?: string[]
}

interface Request {
  readonly url: string
  query?: Query
}

const url = 'http://localhost:8080'
const project = 'projects'
const version = 1
const tags = [
  'typescript',
  'coding',
  'language'
]

test('Builder: set', t => {
  const qb = new Builder<Required<Query>>({
    project,
    version,
    tags,
  })

  qb.set('project', project)
  qb.set('tags', tags)

  const q = qb.build()

  t.false('undefined' === typeof q.project)
  t.is(project, q.project)
  t.is(version, q.version)
  t.is(tags, q.tags)
})

test('Builder: map', t => {
  const qb = new Builder<Query, 'project' | 'tags'>({
    version,
  })

  qb.map({
    project,
    tags,
  })

  const q = qb.build()

  t.true(guardFor(q, ...Object.keys(q) as (keyof Query)[]))
  t.is(project, q.project)
  t.is(version, q.version)
  t.is(tags, q.tags)
})

test('Builder: undefined', t => {
  const qb = new Builder<Query, 'project' | 'tags'>()

  const q = qb.build()

  t.true(guardFor(q, ...Object.keys(q) as (keyof Query)[]))
  t.true('undefined' === typeof q.project)
  t.true('undefined' === typeof q.version)
  t.true('undefined' === typeof q.tags)
})

test('Builder: RequiredOnly', t => {
  const req = new Builder<RequiredOnly<Request>>()

  req.set('url', url)

  const r = req.build()

  t.is(url, r.url)
})

test('Builder: RequiredOnly', t => {
  const qb = new Builder<Query>()
  const q = qb.build()

  const req = new Builder<OptionalOnly<Request>>()

  req.set('query', q)

  const r = req.build()

  t.is(q, r.query)
})
