import { Input } from '@/components/Input'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

const WEI = 1e-18

const formSchema = z.object({
  paymentAmount: z
    .number()
    .min(WEI, 'Payment amount must be greater than 1e-18 (1 wei)'),
  // TODO: make more robust for eth addresses / ENS
  beneficiary: z.string().min(2, 'Beneficiary must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
  message: z.string().optional(),
})

export type ProjectPayFormProps = {
  className?: string
}

export const ProjectPayForm: React.FC<ProjectPayFormProps> = ({
  className,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentAmount: undefined,
      beneficiary: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }, [])

  // TODO
  const total = 0

  return (
    <Form {...form}>
      <form
        className={twMerge('mx-auto flex flex-col gap-6', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="paymentAmount"
          render={({ field }) => (
            <ProjectPayFormItem label="Payment amount">
              <Input {...field} />
            </ProjectPayFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beneficiary"
          render={({ field }) => (
            <ProjectPayFormItem
              className="mt-6"
              label="NFTs and rewards will be sent to"
            >
              <Input {...field} />
            </ProjectPayFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <ProjectPayFormItem
              label="Email"
              description="Enter email to receive confirmation & updates"
            >
              <Input {...field} />
            </ProjectPayFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <ProjectPayFormItem label="Message (Optional)">
              <Input {...field} />
            </ProjectPayFormItem>
          )}
        />

        <div className="mt-6 flex justify-between font-medium">
          <div>Total to pay</div>
          <div>{total} ETH</div>
        </div>

        <Button className="mt-2 h-14 w-full" type="submit">
          Pay project
        </Button>

        <div className="text-center text-xs leading-5 text-gray-400 md:mt-8">
          All transactions are paid in Ethereum (ETH). Payments are
          non-refundable.
        </div>
      </form>
    </Form>
  )
}

type ProjectPayFormItemProps = {
  className?: string
  label: string
  description?: string
}

const ProjectPayFormItem: React.FC<
  PropsWithChildren<ProjectPayFormItemProps>
> = ({ className, label, description, children }) => {
  return (
    <FormItem className={className}>
      <FormLabel className="text-gray-700">{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription className="text-xs text-gray-500">
        {description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}
