import { JBProjectMetadata } from 'juice-hooks'
import { createContext, useContext } from 'react'

export const JBProjectMetadataContext = createContext<
  JBProjectMetadata & {
    // TODO: Remove once added to juice-hooks
    infoUri: string | undefined
  }
>({
  name: '',
  projectTagline: '',
  logoUri: '',
  coverImageUri: undefined,
  description: '',
  twitter: undefined,
  discord: undefined,
  telegram: undefined,
  infoUri: undefined,
})

export function useJBProjectMetadata() {
  return useContext(JBProjectMetadataContext)
}
