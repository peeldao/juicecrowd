export type FeatureFlag = 'CREATE_PROJECT' | 'JC01_HARDCODE_START_DATE'

export const FEATURE_FLAGS: { [k in FeatureFlag]: string } = {
  CREATE_PROJECT: 'createProject',
  JC01_HARDCODE_START_DATE: 'jc01HardcodeStartDate',
}
