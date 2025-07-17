import { useState, useEffect } from "react"

export function useTableDimensions(ref, initialHeight) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(initialHeight)

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setContainerWidth(ref.current.clientWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [ref])

  return { containerWidth, containerHeight }
}
