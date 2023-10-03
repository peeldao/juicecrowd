import { Tab } from '@headlessui/react'
import { CreateTab } from './components/CreateTab'
import { BasicsPanel, FundingPanel } from './components/panels'
import { Navbar } from '../layout/Navbar'

const CreatePage: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Navbar className="w-full flex-1" separator title="Create project" />
      <div className="mt-10 w-full max-w-xl flex-1">
        <Tab.Group>
          <Tab.List className="flex gap-8 border-b border-gray-200 px-16">
            <CreateTab>Basics</CreateTab>
            <CreateTab>Funding</CreateTab>
            <CreateTab>Details</CreateTab>
            <CreateTab>Rewards</CreateTab>
            <CreateTab>Launch</CreateTab>
          </Tab.List>

          <Tab.Panels className="mt-10">
            <Tab.Panel key={0}>
              <BasicsPanel />
            </Tab.Panel>
            <Tab.Panel key={1}>
              <FundingPanel />
            </Tab.Panel>
            <Tab.Panel key={2}>back!</Tab.Panel>
            <Tab.Panel key={3}>L</Tab.Panel>
            <Tab.Panel key={4}>F</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default CreatePage
