export interface Crowd {
  id: number
  name: string
  shortName: string
  projectIds: number[]
  description?: string
  shordDescription?: string
}

export const CROWDS: Crowd[] = [
  {
    id: 1,
    name: 'Juicecrowd 01',
    shortName: 'JC01',
    shordDescription:
      "Juicecrowd's first cohort focused on web3 and blockchain projects.",
    description:
      "Introducing JC01, Juicecrowd's first cohort focused on web3 and blockchain projects.",
    projectIds: [600, 599, 598, 597, 596, 595, 594, 593],
  },
]

export const ACTIVE_CROWD = CROWDS[0]
