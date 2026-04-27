import React from "react"
import { useIsMobileReturn } from "@/shared/interface/hooksInterface"

export const useIsMobile = (): useIsMobileReturn => {

  const MOBILE_BREAKPOINT = 768
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return { isMobile: !!isMobile }
}
