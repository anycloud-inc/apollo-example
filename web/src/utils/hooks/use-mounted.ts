import { useCallback, useEffect, useRef } from 'react'

export function useMounted() {
  const mountedRef = useRef(true)
  const mounted = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    return () => void (mountedRef.current = false)
  }, [])

  return mounted
}
