/**
 * BSD 3-Clause License
 *
 * Copyright © 2025, CosmicMind, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
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
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {
    it,
    expect,
    describe,
} from 'vitest'

import {
    Plugin,
    PluginManager,
} from '@/index'

class RecordingPlugin extends Plugin<string[]> {
    constructor(private readonly pluginName: string) {
        super()
    }

    get name(): string {
        return this.pluginName
    }

    execute(...logs: string[][]): void {
        for (const log of logs) {
            log.push(this.name)
        }
    }
}

describe('PluginManager', () => {
    it('registers every supplied plugin and executes them in order with all arguments', () => {
        const manager = new PluginManager<string[]>()
        const first = new RecordingPlugin('first')
        const second = new RecordingPlugin('second')
        const third = new RecordingPlugin('third')
        const left: string[] = []
        const right: string[] = []

        expect(manager.register(first, second, third)).toBe(true)
        manager.execute(left, right)

        expect(left).toEqual(['first', 'second', 'third'])
        expect(right).toEqual(left)
    })

    it('skips duplicate names without skipping later registrations', () => {
        const manager = new PluginManager<string[]>()
        const first = new RecordingPlugin('first')
        const second = new RecordingPlugin('second')
        const third = new RecordingPlugin('third')
        const log: string[] = []

        expect(manager.register(first)).toBe(true)
        expect(manager.register(
            new RecordingPlugin('first'),
            second,
            new RecordingPlugin('second'),
            third
        )).toBe(true)
        expect(manager.register(first, second, third)).toBe(false)

        manager.execute(log)
        expect(log).toEqual(['first', 'second', 'third'])
    })

    it.each(['objects', 'names'] as const)('removes every supplied plugin by %s and retains unmentioned plugins', (kind) => {
        const manager = new PluginManager<string[]>()
        const first = new RecordingPlugin('first')
        const second = new RecordingPlugin('second')
        const third = new RecordingPlugin('third')
        const missing = new RecordingPlugin('missing')
        const log: string[] = []

        manager.register(first)
        manager.register(second)
        manager.register(third)

        const removed = kind === 'objects'
            ? manager.deregister(missing, new RecordingPlugin('first'), first, second)
            : manager.deregister(missing.name, first.name, first.name, second.name)

        expect(removed).toBe(true)
        expect(manager.deregister(first, second)).toBe(false)
        manager.execute(log)
        expect(log).toEqual(['third'])
    })

    it('reports false for empty calls and missing removals', () => {
        const manager = new PluginManager<string[]>()

        expect(manager.register()).toBe(false)
        expect(manager.deregister()).toBe(false)
        expect(manager.deregister(new RecordingPlugin('missing'))).toBe(false)
        expect(manager.deregister('missing', 'also missing')).toBe(false)
    })

    it('allows an individually removed name to be registered again at the end', () => {
        const manager = new PluginManager<string[]>()
        const first = new RecordingPlugin('first')
        const second = new RecordingPlugin('second')
        const log: string[] = []

        expect(manager.register(first)).toBe(true)
        expect(manager.register(second)).toBe(true)
        expect(manager.deregister(first.name)).toBe(true)
        expect(manager.register(new RecordingPlugin(first.name))).toBe(true)

        manager.execute(log)
        expect(log).toEqual(['second', 'first'])
    })
})
