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
    projectIds: [599, 598, 597, 596, 595, 594, 593],
  },
]
