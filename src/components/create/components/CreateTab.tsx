import { Tab } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const CreateTab: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tab as="button" className="select-none font-medium focus:outline-none">
      {({ selected }) => (
        <div
          className={twMerge(
            'pb-3 text-gray-600',
            selected && 'border-b-2 border-blue-500 text-blue-500',
          )}
        >
          {children}
        </div>
      )}
    </Tab>
  )
}
