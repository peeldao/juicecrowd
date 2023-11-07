export type FeatureFlag = 'CREATE_PROJECT'

export const FEATURE_FLAGS: { [k in FeatureFlag]: string } = {
  CREATE_PROJECT: 'createProject',
}
