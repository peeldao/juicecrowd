interface Crowd {
  id: number
  name: string
  projectIds: number[]
  description?: string
}

export const CROWDS: Crowd[] = [
  {
    id: 1,
    name: 'JC01',
    description:
      "Introducing JC01, Juicecrowd's first cohort focussed on web3 and blockchain projects",
    projectIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
]
