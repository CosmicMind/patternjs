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

import { guardFor } from '@cosmicverse/foundation'
import test from 'ava'

import {
  createProxy,
  ProxyPropertyHandler,
  ProxyValidationError,
} from '../../src'

interface User {
  readonly id: string
  readonly created: Date
  name: string
}

class Person {
  readonly id: string
  readonly created: Date
  name: string

  get displayName(): string {
    return this.name
  }

  constructor(id: string, created: Date, name: string) {
    this.id = id
    this.created = created
    this.name = name
  }

  makeNameUpperCase(): void {
    this.name = this.name.toUpperCase()
  }
}

test('Proxy: interface', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target: User = {
    id,
    created,
    name: 'jonathan',
  }

  const proxy = createProxy(target)
  proxy.name = 'daniel'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
})

test('Proxy: interface initialize validator', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target: User = {
    id,
    created,
    name: 'E',
  }

  const handler: ProxyPropertyHandler<User> = {
    id: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
    created: {
      validate(value: Date): boolean {
        return value instanceof Date
      },
    },
    name: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
  }

  try {
    const proxy = createProxy(target, handler)
    t.is(name, proxy.name)
    t.false(true)
  }
  catch (error) {
    if (error instanceof ProxyValidationError) {
      t.is(error.name, 'ProxyValidationError')
      t.is(error.message, 'name is invalid')
      t.is(error.toString(), `[${error.name} ${error.message}]`)
    }
    else {
      t.false(true)
    }
  }
})

test('Proxy: interface property validator', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target: User = {
    id,
    created,
    name: 'jonathan',
  }

  const handler: ProxyPropertyHandler<User> = {
    id: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
    created: {
      validate(value: Date): boolean {
        return value instanceof Date
      },
    },
    name: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
  }

  const proxy = createProxy(target, handler)

  try {
    proxy.name = 'E'
    t.false(true)
  }
  catch (error) {
    if (error instanceof ProxyValidationError) {
      t.is(error.name, 'ProxyValidationError')
      t.is(error.message, 'name is invalid')
      t.is(error.toString(), `[${error.name} ${error.message}]`)
    }
    else {
      t.false(true)
    }
  }

  proxy.name = 'daniel'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
})

test('Proxy: partial validator', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target: User = {
    id,
    created,
    name: 'jonathan',
  }

  const handler: ProxyPropertyHandler<User> = {
    created: {
      validate(value: Date): boolean {
        return value instanceof Date
      },
    },
  }

  const proxy = createProxy(target, handler)

  proxy.name = ''

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.not(name, proxy.name)
})

test('Proxy: class', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target = new Person(id, created, 'jonathan')

  const proxy = createProxy(target)
  proxy.name = 'daniel'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
  t.is(name, proxy.displayName)
})

test('Proxy: class initialize validator', t => {
  const id = '123'
  const created = new Date()
  const name = 'E'

  const target = new Person(id, created, name)

  const handler: ProxyPropertyHandler<Person> = {
    id: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
    created: {
      validate(value: Date): boolean {
        return value instanceof Date
      },
    },
    name: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
  }

  try {
    const proxy = createProxy(target, handler)
    t.is(name, proxy.name)
    t.false(true)
  }
  catch (error) {
    if (error instanceof ProxyValidationError) {
      t.is(error.name, 'ProxyValidationError')
      t.is(error.message, 'name is invalid')
      t.is(error.toString(), `[${error.name} ${error.message}]`)
    }
    else {
      t.false(true)
    }
  }
})

test('Proxy: class property validator', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target = new Person(id, created, name)

  const handler: ProxyPropertyHandler<Person> = {
    id: {
      validate(value: string): boolean {
        return 2 < value.length
      },
    },
    created: {
      validate(value: Date): boolean {
        return value instanceof Date
      },
    },
    name: {
      validate(value: string): boolean {
        return 'undefined' !== typeof value
      },
    },
  }

  const proxy = createProxy(target, handler)

  try {
    proxy.name = 'E'
    t.false(true)
  }
  catch (error) {
    if (error instanceof ProxyValidationError) {
      t.is(error.name, 'ProxyValidationError')
      t.is(error.message, 'name is invalid')
      t.is(error.toString(), `[${error.name} ${error.message}]`)
    }
    else {
      t.false(true)
    }
  }

  proxy.name = 'daniel'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
  t.is(name, proxy.displayName)
})

test('Proxy: class computed', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target = new Person(id, created, 'jonathan')

  const proxy = createProxy(target)

  t.is('jonathan', proxy.displayName)

  proxy.name = 'daniel'

  t.is(name, proxy.displayName)

  proxy.name = 'daniel'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
  t.is(name, proxy.displayName)
})

test('Proxy: class function', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'

  const target = new Person(id, created, 'jonathan')

  const proxy = createProxy(target)

  t.is('jonathan', proxy.displayName)

  proxy.name = 'daniel'

  t.is(name, proxy.displayName)

  proxy.makeNameUpperCase()

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name.toUpperCase(), proxy.name)
  t.is(name.toUpperCase(), proxy.displayName)
})

interface EmailValue {
  value: string
}

type Member = User & {
  readonly email: EmailValue
}

test('Proxy: nested interface', t => {
  const id = '123'
  const created = new Date()
  const name = 'daniel'
  const email = createProxy({
    value: 'my@email.com',
  }, {
    value: {
      validate(value: string, state: Readonly<EmailValue>): boolean {
        return 5 < value.length && value !== state.value
      },
    },
  })

  const target: Member = {
    id,
    created,
    name,
    email,
  }

  const proxy = createProxy(target, {
    email: {
      validate(value: EmailValue): boolean {
        return guardFor(value)
      },
    },
  })

  t.is(email.value, proxy.email.value)

  proxy.email.value = 'address@domain.com'

  t.is(id, proxy.id)
  t.is(created, proxy.created)
  t.is(name, proxy.name)
  t.is('address@domain.com', proxy.email.value)
})