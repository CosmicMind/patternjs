/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import test from 'ava'

import { Prototype } from '../../src'

class A extends Prototype {
  private _name: string
  readonly count: number
  readonly location: string

  get name(): string {
    return this._name
  }

  constructor(name: string, count: number, location: string) {
    super()
    this._name = name
    this.count = count
    this.location = location
  }

  subtractCount(count: number): number {
    return this._subtractCount(count)
  }

  private _subtractCount(count: number): number {
    return this.count - count
  }
}

test('Prototype: equal properties and functions', t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  t.is(a.name, name)
  t.is(a.count, count)
  t.is(a.location, location)
  t.is(b.name, a.name)
  t.is(b.count, a.count)
  t.is(b.location, a.location)
  t.is(b.subtractCount(3), a.subtractCount(3))
})

test('Prototype: instances refs not equal', t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  t.not(a, b)
})

test('Prototype: clone equal to clone', t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  const c = b.clone()
  t.is(b.name, name)
  t.is(b.count, count)
  t.is(b.location, location)
  t.is(c.name, b.name)
  t.is(c.count, b.count)
  t.is(c.location, b.location)
  t.is(c.subtractCount(5), b.subtractCount(5))
})

test('Prototype: correct instanceof detection', t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  const c = b.clone()
  t.true(a instanceof A)
  t.true(b instanceof A)
  t.true(c instanceof A)
})
