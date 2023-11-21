'use client'

import { Toaster } from '@/components/ui/Toaster'
import { useInstallJuicecrowdWindowObject } from '@/hooks/useInstallJuicecrowdWindowObject'

/**
 * Root components that are only rendered on the client.
 */
export const ClientRootComponents = () => {
  useInstallJuicecrowdWindowObject()
  return <Toaster />
}
