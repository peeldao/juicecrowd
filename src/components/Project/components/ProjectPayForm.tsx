import { CurrencyAmount } from '@/components/CurrencyAmount'
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
import { useJbProject } from '@/hooks/useJbProject'
import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useJBContractContext, usePayEthPaymentTerminal } from 'juice-hooks'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { isAddress, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { useProjectPay } from '../providers/ProjectPayContext'
import { ProjectPayAmountInput } from './ProjectPayAmountInput'
import { ProjectPayMessageInput } from './ProjectPayMessageInput'
import { ProjectPayBeneficiaryInput } from './ProjectPayBeneficiaryInput'

const WEI = 1e-18

const formSchema = z.object({
  paymentAmount: z.coerce
    .number()
    .min(WEI, 'Payment amount must be greater than 1e-18 (1 wei)'),
  // TODO: make more robust for eth addresses / ENS
  beneficiary: z
    .string()
    .optional()
    .refine(value => {
      if (!value) return true
      return isAddress(value)
    }, 'Invalid wallet address'),
  email: z.string().email('Invalid email address').optional(),
  message: z.string().optional(),
})

export type ProjectPayFormProps = {
  className?: string
}

export const ProjectPayForm: React.FC<ProjectPayFormProps> = ({
  className,
}) => {
  const router = useRouter()

  const {
    nftData: { data: nfts },
    projectId,
  } = useJbProject()
  const { nftRewardIds } = useProjectPay()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentAmount: undefined,
      beneficiary: '',
      email: '',
      message: '',
    },
  })

  // TODO: Use proper currency formatting from juice_hooks when available
  // for now, 1n == eth, 2n == usd
  const [currency, setCurrency] = useState<1n | 2n>(1n)

  const [attachedUrl, setAttachedUrl] = useState<string | undefined>(undefined)

  const totalNftSelectionPrice = useMemo(
    () =>
      nftRewardIds.reduce((acc, nftId) => {
        if (!nfts) return acc
        const nft = nfts.find(nft => nft.id === nftId)
        if (!nft) return acc
        return acc + nft.price
      }, 0n),
    [nftRewardIds, nfts],
  )

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      console.log(values)
      router.push(`/p/${projectId.toString()}/pay/success`)
    },
    [projectId, router],
  )

  const paymentAmount = form.watch('paymentAmount')

  // TODO - Account for usd conversion
  const total =
    totalNftSelectionPrice +
    (paymentAmount && !isNaN(paymentAmount)
      ? parseEther(`${paymentAmount}`)
      : 0n)

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
              <ProjectPayAmountInput
                currency={currency}
                setCurrency={setCurrency}
                placeholder="0"
                {...field}
              />
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
              <ProjectPayBeneficiaryInput {...field} />
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
              <Input
                placeholder="banny@juicebox.com"
                prefix={<EnvelopeIcon className="h-5 w-5 text-gray-500" />}
                suffix={
                  <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
                }
                {...field}
              />
            </ProjectPayFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <ProjectPayFormItem label="Message (Optional)">
              <ProjectPayMessageInput
                attachedUrl={attachedUrl}
                setAttachedUrl={setAttachedUrl}
                {...field}
              />
            </ProjectPayFormItem>
          )}
        />

        <div className="mt-6 flex justify-between font-medium">
          <div>Total to pay</div>
          <CurrencyAmount amount={total} />
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
