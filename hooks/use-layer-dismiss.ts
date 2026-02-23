'use client'

import { RefObject, useEffect, useId, useMemo } from 'react'

const layerStack: string[] = []

function pushLayer(id: string) {
  if (!layerStack.includes(id)) layerStack.push(id)
}

function removeLayer(id: string) {
  const index = layerStack.lastIndexOf(id)
  if (index >= 0) layerStack.splice(index, 1)
}

function isTopLayer(id: string) {
  return layerStack[layerStack.length - 1] === id
}

type UseLayerDismissProps = {
  open: boolean
  onDismiss: () => void
  refs: Array<RefObject<HTMLElement | null>>
}

export function useLayerDismiss({ open, onDismiss, refs }: UseLayerDismissProps) {
  const localId = useId()
  const id = useMemo(() => localId, [localId])

  useEffect(() => {
    if (!open) {
      removeLayer(id)
      return
    }

    pushLayer(id)
    return () => removeLayer(id)
  }, [id, open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (!isTopLayer(id)) return
      event.preventDefault()
      event.stopPropagation()
      onDismiss()
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!isTopLayer(id)) return
      const target = event.target as Node | null
      if (!target) return

      const clickedInside = refs.some((ref) => {
        const element = ref.current
        return element ? element.contains(target) : false
      })

      if (!clickedInside) {
        onDismiss()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [id, onDismiss, open, refs])
}
