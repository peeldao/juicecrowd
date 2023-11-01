import { useJbProject } from '@/hooks/useJbProject'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { CurrencyAmount } from '../CurrencyAmount'
import { Ether } from 'juice-hooks'
import { Button } from '../ui/Button'
import { Link } from '../Link'
import Lottie from 'lottie-react'
import confettiAnimation from '@/data/lottie/confetti-animation.json'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const ProjectPaySuccessPage = () => {
  const { name, projectId } = useJbProject()

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center justify-center pt-48">
      <ConfettiBurst />

      <div className="rounded-full border-8 border-green-50">
        <CheckCircleIcon className="h-12 w-12 rounded-full border-8 border-green-100 bg-green-100 text-green-600" />
      </div>

      <h1 className="mt-8 font-heading text-2xl font-medium">
        Payment successful!
      </h1>
      <p className="mt-4 text-center text-gray-600">
        Your payment of{' '}
        <CurrencyAmount
          className="font-semibold"
          hideCurrencyIcon
          // TODO: Correct amount
          amount={Ether.parse('2', 18).val}
        />{' '}
        to {name} was successful.
      </p>
      <div className="mt-12 flex w-full flex-col justify-center gap-3 md:flex-row">
        {/* // TODO: Replace with share on X button component */}
        <Button className="flex-1" variant="outline">
          Share on X
        </Button>
        <Link className="flex flex-1" href={`/p/${projectId}`}>
          <Button className="w-full flex-1">Return to project</Button>
        </Link>
      </div>
    </div>
  )
}

const ConfettiBurst = () => {
  const [confettiVisible, setConfettiVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiVisible(false)
    }, 4500)
    return () => clearTimeout(timer)
  })

  if (!confettiVisible) return null

  return (
    <Lottie
      className={twMerge(
        'pointer-events-none absolute left-1/2 mx-auto w-full -translate-x-1/2',
      )}
      animationData={confettiAnimation}
    />
  )
}
