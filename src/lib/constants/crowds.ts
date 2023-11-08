export const JC01_DATE_STRINGS = {
  SUBMISSIONS_CLOSE: '08 November 2023',
  SUCCESSFUL_APPLICANTS_SELECTED: '10 November 2023',
  PROJECTS_LAUNCH: '17 November 2023',
  PROJECTS_RUN: '15 December 2023',
  PRIZE_POOL_AWARDED: '18 December 2023',
}

export const JC01_DATES = {
  SUBMISSIONS_CLOSE: new Date(1699506000000),
}

export const JC01SubmissionsClosed = () =>
  new Date() > JC01_DATES.SUBMISSIONS_CLOSE
