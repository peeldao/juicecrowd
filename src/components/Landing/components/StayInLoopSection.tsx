import { useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'
import * as z from 'zod'
import { Form, FormField, FormMessage } from '@/components/ui/Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/useToast'

export type StayInLoopSectionProps = {
  className?: string
}

const emailSubscriptionsSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const StayInLoopSection: React.FC<StayInLoopSectionProps> = ({
  className,
}) => {
  const [submitEmailLoading, setSubmitEmailLoading] = useState(false)

  const form = useForm<z.infer<typeof emailSubscriptionsSchema>>({
    resolver: zodResolver(emailSubscriptionsSchema),
    defaultValues: {
      email: '',
    },
  })

  const { toast } = useToast()

  const handleSubmit = async (
    values: z.infer<typeof emailSubscriptionsSchema>,
  ) => {
    setSubmitEmailLoading(true)
    try {
      await axios.post('/api/emailSubscription', values)
      setSubmitEmailLoading(false)
      toast({
        title: 'Subscribed!',
        description: 'You have been subscribed to our email list.',
      })
    } catch (e: any) {
      setSubmitEmailLoading(false)
      toast({
        title: 'Failed to subscribe!',
        description: e.response.data,
        variant: 'destructive',
      })
    }
  }

  return (
    <div
      className={twMerge('bg-gray-800 px-5 py-12 text-sm md:px-12', className)}
    >
      <div className="m-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center md:gap-5">
        <div>
          <h3 className="pb-2 font-heading text-2xl font-medium text-white">
            Want to stay in the loop?
          </h3>
          <div className="text-gray-400">
            Be the first to know about new crowds, features and launches.
          </div>
        </div>
        <Form {...form}>
          <div className="flex w-full flex-1 flex-col justify-end gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="relative flex w-full flex-col items-start md:max-w-xs">
                  <Input
                    className="h-12 border-gray-500 bg-transparent text-base text-white outline-2"
                    placeholder="Enter your email"
                    {...field}
                  />
                  <FormMessage className="absolute -bottom-6" />
                </div>
              )}
            />
            <div className="relative">
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                loading={submitEmailLoading}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
