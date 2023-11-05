export interface Crowd {
  id: number
  name: string
  projectIds: number[]
  description?: string
}

export const CROWDS: Crowd[] = [
  {
    id: 1,
    name: 'Juicecrowd 01',
    description:
      "Introducing JC01, Juicecrowd's first cohort focused on web3 and blockchain projects.",
    projectIds: [590, 589, 588, 587, 586, 585, 584, 583, 582, 581],
  },
]
