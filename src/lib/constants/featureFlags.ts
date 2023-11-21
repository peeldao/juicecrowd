export type FeatureFlag =
  | 'CREATE_PROJECT'
  | 'PROJECT_EMAILS'
  | 'JC01_HARDCODE_START_DATE'

export const FEATURE_FLAGS: { [k in FeatureFlag]: string } = {
  CREATE_PROJECT: 'createProject',
  PROJECT_EMAILS: 'projectEmails',
  JC01_HARDCODE_START_DATE: 'jc01HardcodeStartDate',
}
