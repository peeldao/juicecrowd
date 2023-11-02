import { useJbProject } from '@/hooks/useJbProject'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { Button } from '../ui/Button'
import { PayDonationCard } from './components/PayDonationCard'
import {
  ProjectPayForm,
  ProjectPayFormSchema,
} from './components/ProjectPayForm'
import { ProjectPayRewards } from './components/ProjectPayRewards'
import { ProjectPayContext } from './providers/ProjectPayContext'
import { projectPayReducer } from './providers/projectPayReducer'

const WEI = 1e-18

export const ProjectPayPage = () => {
  const { name } = useJbProject()
  const [state, dispatch] = React.useReducer(projectPayReducer, {
    nftRewardIds: [],
  })
  const [donationSelected, setDonationSelected] = React.useState(false)

  const form = useForm<z.infer<typeof ProjectPayFormSchema>>({
    resolver: zodResolver(ProjectPayFormSchema),
    defaultValues: {
      paymentAmount: '' as any as number,
      beneficiary: '',
      email: undefined,
      message: '',
    },
  })

  const donationCardClicked = React.useCallback(() => {
    if (donationSelected) {
      // Turning off donation
      form.setValue('paymentAmount', '' as any)
    }
    setDonationSelected(d => !d)
  }, [donationSelected, form])

  return (
    <ProjectPayContext.Provider value={{ ...state, dispatch }}>
      <FormProvider {...form}>
        <div className="block md:flex">
          {/* Left panel */}
          <div className="mt-32 flex-1 px-4 pb-14 md:mt-10 md:px-8">
            <div className="md:mx-auto md:max-w-lg">
              <BackButton className="hidden md:flex" />
              <div className="md:mt-12">
                <h1 className="text-sm font-medium text-gray-500">
                  You are paying
                </h1>
                <h2 className="mt-4 font-heading text-2xl font-medium">
                  {name}
                </h2>

                <h3 className="mt-10 font-medium text-gray-800 md:mt-12">
                  Select a reward
                </h3>

                <div className="mt-5">
                  <PayDonationCard
                    isSelected={donationSelected}
                    onClick={donationCardClicked}
                  />
                </div>

                <ProjectPayRewards className="mt-3" />
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 bg-gray-50 px-4 pb-24 pt-12 md:px-8 md:pt-[148px]">
            <ProjectPayForm className="md:max-w-lg" />
          </div>
        </div>
      </FormProvider>
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
