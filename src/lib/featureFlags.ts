import { NETWORK } from './backend/config'

export enum NetworkName {
  localhost = 'localhost',
  mainnet = 'mainnet',
  goerli = 'goerli',
}

/**
 * Example usage:
 *  
 [FEATURE_FLAGS.NFT_MP4]: {
    mainnet: true,
    goerli: true,
  }
 */
const FEATURE_FLAG_DEFAULTS: {
  [featureFlag: string]: { [networkName in NetworkName]?: boolean }
} = {}

const featureFlagKey = (baseKey: string) => {
  return `${baseKey}_${NETWORK ?? 'mainnet'}`
}

export const setFeatureFlag = (featureFlag: string, enabled: boolean) => {
  localStorage &&
    localStorage.setItem(featureFlagKey(featureFlag), JSON.stringify(enabled))
  console.info('featureflags::setFeatureFlag', featureFlag, enabled)
}

export const enableFeatureFlag = (featureFlag: string) => {
  setFeatureFlag(featureFlag, true)
}

export const disableFeatureFlag = (featureFlag: string) => {
  setFeatureFlag(featureFlag, false)
}

const featureFlagDefaultEnabled = (featureFlag: string): boolean => {
  // if default-enabled for this environment, return true
  const defaultEnabled =
    FEATURE_FLAG_DEFAULTS[featureFlag]?.[NETWORK ?? 'mainnet']

  return Boolean(defaultEnabled)
}

export const featureFlagEnabled = (featureFlag: string): boolean => {
  // if default-enabled for this environment, return true
  const defaultEnabled = featureFlagDefaultEnabled(featureFlag)

  try {
    const localStorageEnabled = localStorage
      ? JSON.parse(localStorage.getItem(featureFlagKey(featureFlag)) || 'null')
      : null

    return localStorageEnabled ?? defaultEnabled
  } catch (e) {
    return defaultEnabled
  }
}

export function installJuicecrowdWindowObject() {
  if (!window) {
    return
  }

  ;(window as any).jc = {
    enableFeatureFlag,
    disableFeatureFlag,
    featureFlagEnabled,
  }
}
