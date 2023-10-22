import { useJBProjectMetadata } from '@/contexts/ProjectMetadata'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import {
  useJBContractContext,
  useJBFundingCycleContext,
  useJb721DelegateTiers,
  useJbProjectsOwnerOf,
} from 'juice-hooks'
import { twMerge } from 'tailwind-merge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { AboutTab } from './components/AboutTab'
import { ActivityTab } from './components/ActivityTab'
import { RewardsPanel } from './components/RewardsPanel'
import { Stats } from './components/Stats'
import { TitleBlock } from './components/TitleBlock'
import ProjectLogo from '../ProjectLogo'
import { useJbProject } from '@/hooks/useJbProject'
import { CoverPhoto } from './components/CoverPhoto'

export const ProjectPage = () => {
  const { logoUri, name, projectId } = useJbProject()
  const { fundingCycleMetadata } = useJBFundingCycleContext()
  const nfts = useJb721DelegateTiers(fundingCycleMetadata?.data?.dataSource, {
    ipfsGatewayHostname: OPEN_IPFS_GATEWAY_HOSTNAME!,
  })

  return (
    <>
      <CoverPhoto />

      {/* Page Outer Body */}
      <div className="relative mb-40 px-4 md:px-6">
        {/* Project Logo */}
        <ProjectLogo
          className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-[calc(100%-26px)] rounded-xl border-[6px] border-white"
          projectId={projectId}
          uri={logoUri}
          name={name}
        />

        {/* Page Inner Body (Container)  */}
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <TitleBlock className="mt-10" />

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
