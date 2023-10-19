import { useJBContractContext, useJbProjectsOwnerOf } from 'juice-hooks'
import { twMerge } from 'tailwind-merge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { AboutTab } from './components/AboutTab'
import { ActivityTab } from './components/ActivityTab'
import { Stats } from './components/Stats'
import { TitleBlock } from './components/TitleBlock'
import { RewardsPanel } from './components/RewardsPanel'
import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'

export const ProjectPage = () => {
  const { projectId } = useJBContractContext()
  const { name } = useJBProjectMetadata()
  const { data: address } = useJbProjectsOwnerOf({
    args: [BigInt(projectId)],
  })

  return (
    <>
      {/* Cover image */}
      <div className={twMerge('relative h-72 max-h-72 w-full bg-orange-200')} />

      {/* Page Outer Body */}
      <div className="relative mb-40 px-4 md:px-6">
        {/* Project Logo */}
        <div
          className={twMerge(
            'absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-[calc(100%-20px)] rounded-xl border-[6px] border-white bg-red-400',
          )}
        />

        {/* Page Inner Body (Container)  */}
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <TitleBlock
            className="mt-10"
            // TODO: Real data
            title="A Trip To Transformation Documentary"
            subtitle="Support a groundbreaking documentary on psychedelic medicine."
            owner="xavierrous.eth"
            created={new Date()}
          />

          {/* Content */}
          <div className="mt-10 flex w-full gap-x-28">
            {/* Left column */}
            <div className="max-w-xl flex-1">
              {/* Hero Video */}
              <div
                className={twMerge('h-96 w-full rounded-lg bg-orange-200')}
              />

              <Tabs defaultValue="about" className="mt-20">
                <TabsList className="w-full">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <AboutTab />
                </TabsContent>
                <TabsContent value="activity">
                  <ActivityTab />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column */}
            <div className="mt-12 flex-1">
              <Stats />
              <RewardsPanel className="mt-28" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
