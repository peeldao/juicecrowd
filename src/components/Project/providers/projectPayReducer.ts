export type ProjectPayAction =
  | { type: 'addNftReward'; id: bigint }
  | { type: 'removeNftReward'; id: bigint }

export type ProjectPayState = {
  nftRewardIds: bigint[]
}

export const projectPayReducer = (
  state: ProjectPayState,
  action: ProjectPayAction,
): ProjectPayState => {
  switch (action.type) {
    case 'addNftReward':
      return {
        ...state,
        nftRewardIds: [...state.nftRewardIds, action.id],
      }
    case 'removeNftReward':
      return {
        ...state,
        nftRewardIds: state.nftRewardIds.filter(id => id !== action.id),
      }
    default:
      return state
  }
}
