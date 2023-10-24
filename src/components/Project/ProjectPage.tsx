import { useJbProject } from '@/hooks/useJbProject'
import { OPEN_IPFS_GATEWAY_HOSTNAME } from '@/lib/ipfs'
import { useJBFundingCycleContext, useJb721DelegateTiers } from 'juice-hooks'
import { twMerge } from 'tailwind-merge'
import ProjectLogo from '../ProjectLogo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { AboutTab } from './components/AboutTab'
import { ActivityTab } from './components/ActivityTab'
import { CoverPhoto } from './components/CoverPhoto'
import { Rewards } from './components/Rewards'
import { RewardsPanel } from './components/RewardsPanel'
import { Stats } from './components/Stats'
import { TitleBlock } from './components/TitleBlock'
import { useEffect } from 'react'
import React from 'react'

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
          <ContentMobile className="mt-10 md:hidden" />
          <ContentDesktop className="mt-10 hidden md:flex" />
        </div>
      </div>
    </>
  )
}

export type ContentMobileProps = {
  className?: string
}

export const ContentMobile: React.FC<ContentMobileProps> = ({ className }) => {
  const tabRef = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    window.onscroll = () => {
      const sticky = tabRef.current?.offsetTop
      if (!sticky) return

      if (window.scrollY >= sticky) {
        tabRef.current?.classList.add('sticky', 'top-0')
      } else {
        tabRef.current?.classList.remove('sticky', 'top-0')
      }
    }
    return () => {
      window.onscroll = null
    }
  }, [])

  return (
    <div className={twMerge('w-full', className)}>
      <HeroVideo className="h-56" />
      <Stats className="mt-9" />

      <Tabs defaultValue="about" className="mt-14">
        <TabsList ref={tabRef} className="w-full bg-white">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <AboutTab />
        </TabsContent>
        <TabsContent value="rewards">
          <Rewards />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export type ContentDesktopProps = {
  className?: string
}

const ContentDesktop: React.FC<ContentDesktopProps> = ({ className }) => {
  return (
    <div className={twMerge('w-full gap-x-28', className)}>
      {/* Left column */}
      <div className="max-w-xl flex-1">
        <HeroVideo />

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
  )
}

type HeroVideoProps = {
  className?: string
}

const HeroVideo: React.FC<HeroVideoProps> = ({ className }) => {
  return (
    <div
      className={twMerge('h-96 w-full rounded-lg bg-orange-200', className)}
    />
  )
}
