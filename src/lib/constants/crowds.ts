import { MS_PER_MINUTE } from '../date/format'
import { formatDuration } from '@/lib/date/format'

export const JC01_DATE_STRINGS = {
  SUBMISSIONS_CLOSE: '08 November 2023',
  SUCCESSFUL_APPLICANTS_SELECTED: '10 November 2023',
  PROJECTS_LAUNCH: '20 November 2023',
  PROJECTS_RUN: '18 December 2023',
  PRIZE_POOL_AWARDED: '21 December 2023',
}

export const JC01_DATES = {
  SUBMISSIONS_CLOSE: new Date(JC01_DATE_STRINGS.SUBMISSIONS_CLOSE),
  SUCCESSFUL_APPLICANTS_SELECTED: new Date(
    JC01_DATE_STRINGS.SUCCESSFUL_APPLICANTS_SELECTED,
  ),
  PROJECTS_LAUNCH: new Date(JC01_DATE_STRINGS.PROJECTS_LAUNCH),
  PROJECTS_RUN: new Date(JC01_DATE_STRINGS.PROJECTS_RUN),
  PRIZE_POOL_AWARDED: new Date(JC01_DATE_STRINGS.PRIZE_POOL_AWARDED),
}

export const JC01SubmissionsClosed = () =>
  new Date() > JC01_DATES.SUBMISSIONS_CLOSE

export const JC01CampaignLengthSeconds =
  (JC01_DATES.PROJECTS_RUN.getTime() - JC01_DATES.PROJECTS_LAUNCH.getTime()) /
  MS_PER_MINUTE

export const JC01CampaignLengthString = formatDuration({
  duration: JC01CampaignLengthSeconds,
})
