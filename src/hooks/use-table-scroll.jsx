"use client"

import { useState, useCallback } from "react"

export function useTableScroll(ref) {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleScroll = useCallback(() => {
    if (ref.current) {
      setScrollTop(ref.current.scrollTop)
      setScrollLeft(ref.current.scrollLeft)
    }
  }, [ref])

  return { scrollTop, scrollLeft, handleScroll }
}
