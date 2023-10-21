import { JBProjectMetadata } from 'juice-hooks'
import { createContext, useContext } from 'react'

export const JBProjectMetadataContext = createContext<
  JBProjectMetadata & {
    // TODO: Remove once added to juice-hooks
    twitter: string | undefined
    discord: string | undefined
    telegram: string | undefined
    infoUri: string | undefined
  }
>({
  name: '',
  projectTagline: '',
  logoUri: '',
  description: '',
  twitter: undefined,
  discord: undefined,
  telegram: undefined,
  infoUri: undefined,
})

export function useJBProjectMetadata() {
  return useContext(JBProjectMetadataContext)
}
