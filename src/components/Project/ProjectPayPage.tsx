import { useJbProject } from '@/hooks/useJbProject'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../ui/Button'
import { ProjectPayForm } from './components/ProjectPayForm'
import { ProjectPayRewards } from './components/ProjectPayRewards'
import { projectPayReducer } from './providers/projectPayReducer'
import { ProjectPayContext } from './providers/ProjectPayContext'

export const ProjectPayPage = () => {
  const { name } = useJbProject()
  const [state, dispatch] = React.useReducer(projectPayReducer, {
    nftRewardIds: [],
  })

  return (
    <ProjectPayContext.Provider value={{ ...state, dispatch }}>
      <div className="block md:flex">
        {/* Left panel */}
        <div className="mt-32 flex-1 px-4 pb-14 md:mt-10 md:px-8">
          <div className="md:mx-auto md:max-w-lg">
            <BackButton className="hidden md:flex" />
            <div className="md:mt-12">
              <h1 className="text-sm font-medium text-gray-500">
                You are paying
              </h1>
              <h2 className="mt-4 font-heading text-2xl font-medium">{name}</h2>

              <h3 className="mt-10 font-medium text-gray-800 md:mt-12">
                Select a reward
              </h3>

              <ProjectPayRewards className="mt-5" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-gray-50 px-4 pb-24 pt-12 md:px-8 md:pt-[148px]">
          <ProjectPayForm className="md:max-w-lg" />
        </div>
      </div>
    </ProjectPayContext.Provider>
  )
}

type BackButtonProps = {
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const { projectId } = useJbProject()
  return (
    <Link href={`/p/${projectId}`}>
      <Button
        className={twMerge('item-center gap-1 p-0', className)}
        size="xs"
        variant="link"
      >
        <ChevronLeftIcon className="h-5 w-5" />
        Back
      </Button>
    </Link>
  )
}
