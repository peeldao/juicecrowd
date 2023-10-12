import { JBProjectMetadata } from 'juice-hooks'
import { createContext, useContext } from 'react'

export const JBProjectMetadataContext = createContext<JBProjectMetadata>({
  name: '',
  projectTagline: '',
  logoUri: '',
  description: '',
})

export function useJBProjectMetadata() {
  return useContext(JBProjectMetadataContext)
}
