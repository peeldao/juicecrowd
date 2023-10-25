import React from 'react'
import {
  ProjectPayAction,
  ProjectPayState,
  projectPayReducer,
} from './projectPayReducer'

export type ProjectPayContextType = ProjectPayState & {
  dispatch: React.Dispatch<ProjectPayAction>
}

export const ProjectPayContext = React.createContext<ProjectPayContextType>({
  nftRewardIds: [],
  dispatch: () => {
    console.error('ProjectPayContext not initialized')
  },
})

export const useProjectPay = () => React.useContext(ProjectPayContext)
