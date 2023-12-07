import { CrowdProps, HeroActiveCrowdSection } from './HeroActiveCrowdSection'
import { HeroPrelaunchSection } from './HeroPrelaunchSection'

export function HeroSection({
  activeCrowd,
}: {
  activeCrowd: CrowdProps | undefined
}) {
  return activeCrowd ? (
    <HeroActiveCrowdSection {...activeCrowd} />
  ) : (
    <HeroPrelaunchSection />
  )
}
