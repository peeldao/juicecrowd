export type FeatureFlag =
  | 'CREATE_PROJECT'
  | 'PROJECT_EMAILS'
  | 'SUBMISSIONS_LOCKED'

export const FEATURE_FLAGS: { [k in FeatureFlag]: string } = {
  CREATE_PROJECT: 'createProject',
  PROJECT_EMAILS: 'projectEmails',
  SUBMISSIONS_LOCKED: 'submissionsLocked',
}
