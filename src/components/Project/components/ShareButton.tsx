import { Input } from '@/components/Input'
import { ShareIcon } from '@/components/icon/ShareIcon'
import { XLogo } from '@/components/icon/XLogo'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { twitterShare } from '@/lib/twitter'
import { template } from 'lodash'
import { useCallback, useState } from 'react'

export type ShareButtonProps = {
  className?: string
}

const twitterMessage = template('Check out <%= projectName %> on Juicecrowd:')

export const ShareButton: React.FC<ShareButtonProps> = ({ className }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        <Button
          variant="outline"
          className="flex h-14 w-full gap-2 text-sm md:h-fit"
        >
          <ShareIcon className="h-5 w-5" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="font-heading text-2xl font-medium">
          Share
        </DialogHeader>

        <DialogDescription>
          <div className="flex flex-col gap-4 md:flex-row">
            <Button
              variant="secondary"
              className="flex flex-1 gap-2"
              onClick={() => {
                twitterShare(
                  twitterMessage({
                    projectName: 'Project Name',
                  }),
                  currentUrl,
                )
              }}
            >
              <XLogo className="h-4 w-4" />
              Share on X
            </Button>
          </div>
          <div className="mt-8">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Page link
            </label>
            <div className="mt-1.5 flex flex-col items-center gap-2 md:flex-row">
              <Input
                name="link"
                className="h-12 flex-1"
                readOnly
                value={currentUrl}
              />
              <CopyButton />
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

const CopyButton: React.FC = () => {
  const [buttonText, setButtonText] = useState('Copy link')
  const [currentTimer, setCurrentTimer] = useState<NodeJS.Timeout | null>(null)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const onClick = useCallback(() => {
    if (currentTimer) {
      clearTimeout(currentTimer)
    }
    navigator.clipboard.writeText(currentUrl)
    setButtonText('Copied!')
    const timer = setTimeout(() => {
      setButtonText('Copy link')
    }, 1000)
    setCurrentTimer(timer)
  }, [currentTimer, currentUrl])

  return (
    <Button className="h-12 w-full md:w-fit" onClick={onClick}>
      {buttonText}
    </Button>
  )
}
