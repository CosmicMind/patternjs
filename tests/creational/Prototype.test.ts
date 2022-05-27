/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicverse dot com>
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

import { Prototype } from '../../src/internal'

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

test('Prototype: equal properties and functions', async t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  t.is(name, a.name)
  t.is(count, a.count)
  t.is(location, a.location)
  t.is(a.name, b.name)
  t.is(a.count, b.count)
  t.is(a.location, b.location)
  t.is(a.subtractCount(3), b.subtractCount(3))
})

test('Prototype: instances refs not equal', async t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  t.not(a, b)
})

test('Prototype: clone equal to clone', async t => {
  const name = 'daniel'
  const count = 38
  const location = 'CR'
  const a = new A(name, count, location)
  const b = a.clone()
  const c = b.clone()
  t.is(name, b.name)
  t.is(count, b.count)
  t.is(location, b.location)
  t.is(b.name, c.name)
  t.is(b.count, c.count)
  t.is(b.location, c.location)
  t.is(b.subtractCount(5), c.subtractCount(5))
})

test('Prototype: correct instanceof detection', async t => {
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
