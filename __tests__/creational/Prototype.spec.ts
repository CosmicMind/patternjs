/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import {
  it,
  expect,
  describe,
} from 'vitest'

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

describe('Prototype', () => {
  it('Prototype: equal properties and functions', () =>  {
    const name = 'daniel'
    const count = 38
    const location = 'CR'
    const a = new A(name, count, location)
    const b = a.clone()
    expect(a.name).toBe(name)
    expect(a.count).toBe(count)
    expect(a.location).toBe(location)
    expect(b.name).toBe(a.name)
    expect(b.count).toBe(a.count)
    expect(b.location).toBe(a.location)
    expect(b.subtractCount(3)).toBe(a.subtractCount(3))
  })

  it('Prototype: instances refs not equal', () =>  {
    const name = 'daniel'
    const count = 38
    const location = 'CR'
    const a = new A(name, count, location)
    const b = a.clone()
    expect(a).not.toBe(b)
  })

  it('Prototype: clone equal to clone', () =>  {
    const name = 'daniel'
    const count = 38
    const location = 'CR'
    const a = new A(name, count, location)
    const b = a.clone()
    const c = b.clone()
    expect(b.name).toBe(name)
    expect(b.count).toBe(count)
    expect(b.location).toBe(location)
    expect(c.name).toBe(b.name)
    expect(c.count).toBe(b.count)
    expect(c.location).toBe(b.location)
    expect(c.subtractCount(5)).toBe(b.subtractCount(5))
  })

  it('Prototype: correct instanceof detection', () =>  {
    const name = 'daniel'
    const count = 38
    const location = 'CR'
    const a = new A(name, count, location)
    const b = a.clone()
    const c = b.clone()
    expect(a instanceof A).toBeTruthy()
    expect(b instanceof A).toBeTruthy()
    expect(c instanceof A).toBeTruthy()
  })
})
