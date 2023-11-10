'use client'

import { installJuicecrowdWindowObject } from '@/lib/featureFlags'
import { useEffect } from 'react'

export const useInstallJuicecrowdWindowObject = () => {
  useEffect(() => {
    installJuicecrowdWindowObject()
  }, [])
}
