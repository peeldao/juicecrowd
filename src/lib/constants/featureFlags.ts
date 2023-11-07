export type FeatureFlag = 'CREATE_PROJECT' | 'PROJECT_EMAILS'

export const FEATURE_FLAGS: { [k in FeatureFlag]: string } = {
  CREATE_PROJECT: 'createProject',
  PROJECT_EMAILS: 'projectEmails',
}
