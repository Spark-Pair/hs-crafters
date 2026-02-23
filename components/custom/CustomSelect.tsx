'use client'

import { ChevronDown, Check } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useLayerDismiss } from '@/hooks/use-layer-dismiss'

type SelectOption = {
  value: string
  label: string
}

type CustomSelectProps = {
  value: string
  options: SelectOption[]
  placeholder?: string
  onChange: (value: string) => void
  className?: string
}

export function CustomSelect({
  value,
  options,
  placeholder = 'Select...',
  onChange,
  className = '',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const refs = useMemo(() => [containerRef], [])

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? null,
    [options, value],
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return options
    return options.filter((option) => option.label.toLowerCase().includes(term))
  }, [options, query])

  useLayerDismiss({
    open,
    onDismiss: () => setOpen(false),
    refs,
  })

  useEffect(() => {
    if (!open) return
    setActiveIndex(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    if (!open) return
    const node = listRef.current?.children.item(activeIndex) as HTMLElement | null
    node?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  const selectValue = (nextValue: string) => {
    onChange(nextValue)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3 text-left flex items-center justify-between"
      >
        <span style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--dark-grey)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-[120] rounded-3xl border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-3 shadow-xl">
          <input
            ref={inputRef}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)))
                return
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((prev) => Math.max(prev - 1, 0))
                return
              }
              if (event.key === 'Enter') {
                event.preventDefault()
                const picked = filtered[activeIndex]
                if (picked) selectValue(picked.value)
              }
            }}
            placeholder="Search..."
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-4 py-3"
            style={{ fontFamily: 'var(--font-abel)' }}
          />

          <div ref={listRef} className="mt-2 max-h-56 overflow-auto space-y-1">
            {filtered.map((option, index) => {
              const isSelected = option.value === value
              const isActive = index === activeIndex
              return (
                <button
                  key={option.value}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectValue(option.value)}
                  className={`w-full rounded-2xl px-4 py-2 text-left flex items-center justify-between ${
                    isActive ? 'bg-[var(--secondary-bg)]' : 'hover:bg-[var(--secondary-bg)]/70'
                  }`}
                >
                  <span style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
                    {option.label}
                  </span>
                  {isSelected ? <Check size={14} className="text-[var(--black)]" /> : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
