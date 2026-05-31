import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { relativeTime } from '../relativeTime'

describe('relativeTime', () => {
  const FIXED = new Date('2026-05-31T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "today" for same-day ISO string', () => {
    expect(relativeTime('2026-05-31T08:00:00Z')).toBe('today')
  })

  it('returns "yesterday" for 1 day ago', () => {
    expect(relativeTime('2026-05-30T08:00:00Z')).toBe('yesterday')
  })

  it('returns "N days ago" for 2–29 days', () => {
    expect(relativeTime('2026-05-26T08:00:00Z')).toBe('5 days ago')
  })

  it('returns "1 month ago" for ~30 days', () => {
    expect(relativeTime('2026-05-01T08:00:00Z')).toBe('1 month ago')
  })

  it('returns "N months ago" for several months', () => {
    expect(relativeTime('2026-02-01T08:00:00Z')).toBe('3 months ago')
  })

  it('returns "over a year ago" for 12+ months', () => {
    expect(relativeTime('2024-01-01T08:00:00Z')).toBe('over a year ago')
  })
})
