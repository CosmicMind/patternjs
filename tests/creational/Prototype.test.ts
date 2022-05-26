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

import { Prototype } from '../../src'

class A extends Prototype {
  readonly name: string
  readonly age: number
  readonly location: string

  constructor(name: string, age: number, location: string) {
    super()
    this.name = name
    this.age = age
    this.location = location
  }

  myName(): string {
    return this.name
  }
}

test('Prototype: equal property', async t => {
  const name = 'daniel'
  const age = 38
  const location = 'CR'
  const a = new A(name, age, location)
  const b = a.clone()
  t.is(name, a.name)
  t.is(age, a.age)
  t.is(location, a.location)
  t.is(name, a.myName())
  t.is(a.name, b.name)
  t.is(a.age, b.age)
  t.is(a.location, b.location)
  t.is(a.myName(), b.myName())
})

test('Prototype: not equal instance', async t => {
  const name = 'daniel'
  const age = 38
  const location = 'CR'
  const a = new A(name, age, location)
  const b = a.clone()
  t.not(a, b)
})

test('Prototype: clone equal to clone', async t => {
  const name = 'daniel'
  const age = 38
  const location = 'CR'
  const a = new A(name, age, location)
  const b = a.clone()
  const c = b.clone()
  t.is(name, b.name)
  t.is(age, b.age)
  t.is(location, b.location)
  t.is(name, a.myName())
  t.is(b.name, c.name)
  t.is(b.age, c.age)
  t.is(b.location, c.location)
  t.is(b.myName(), c.myName())
})
