import {
  CURRENCY_ETH,
  CURRENCY_USD,
  CurrencyAmount,
} from '@/components/CurrencyAmount'
import { Input } from '@/components/Input'
import { LoadingButton } from '@/components/LoadingButton'
import { Form, FormField } from '@/components/ui/Form'
import { useToast } from '@/components/ui/useToast'
import { useJbProject } from '@/hooks/useJbProject'
import { usePayProjectTx } from '@/hooks/usePayProjectTx'
import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Address, isAddress, parseEther } from 'viem'
import { z } from 'zod'
import { useProjectPay } from '../providers/ProjectPayContext'
import { ProjectPayBeneficiaryInput } from './ProjectPayBeneficiaryInput'
import { ProjectPayFormItem } from './ProjectPayFormItem'
import { ProjectPayMessageInput } from './ProjectPayMessageInput'
import { useEthUsdPrice } from '@/components/EthUsdPriceProvider'

const WEI = 1e-18

export const ProjectPayFormSchema = z.object({
  paymentAmount: z.union([
    z.coerce
      .number({
        errorMap: () => ({ message: 'Invalid payment' }),
      })
      .min(WEI, 'Payment amount must be greater than 1e-18 (1 wei)'),
    z.literal(''),
  ]),
  paymentCurrency: z.union([z.literal(CURRENCY_ETH), z.literal(CURRENCY_USD)]),
  beneficiary: z
    .string()
    .optional()
    .refine(value => {
      if (!value) return true
      return isAddress(value)
    }, 'Invalid wallet address')
    .transform(value => (value ? (value as Address) : undefined)),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().max(256).optional(),
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

  const { usdToEth } = useEthUsdPrice()

  const form = useFormContext<z.infer<typeof ProjectPayFormSchema>>()

  const { nftRewardIds } = useProjectPay()

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

  const paymentAmount = form.watch('paymentAmount')
  const paymentCurrency = form.watch('paymentCurrency')
  const etherPayment = useMemo(() => {
    if (!paymentAmount || isNaN(paymentAmount)) return 0n
    const bigUnitPay = parseEther(`${paymentAmount}`)

    if (paymentCurrency === CURRENCY_ETH) return bigUnitPay

    // payment is in usd so we need to convert to real wei
    return usdToEth(bigUnitPay)
  }, [paymentAmount, paymentCurrency, usdToEth])

  const totalPayment = useMemo(() => {
    return totalNftSelectionPrice + etherPayment
  }, [etherPayment, totalNftSelectionPrice])

  const [attachedUrl, setAttachedUrl] = useState<string | undefined>(undefined)
  const formMessage = form.watch('message')

  const memo = useMemo(() => {
    let memo = formMessage ?? ''
    memo += attachedUrl ? `\n${attachedUrl}` : ''
    return memo
  }, [attachedUrl, formMessage])

  const tiersToMint = useMemo(() => {
    const nftsToMint = nfts?.filter(nft => nftRewardIds.includes(nft.id)) ?? []
    if (nftsToMint.length) return nftsToMint
  }, [nftRewardIds, nfts])

  const beneficiaryAddress = form.watch('beneficiary')

  const { prepare, contractWrite, transaction } = usePayProjectTx({
    amountWei: totalPayment,
    memo,
    tiersToMint,
    beneficiaryAddress,
  })

  const { toast } = useToast()

  const onSubmit = useCallback(
    async (values: z.infer<typeof ProjectPayFormSchema>) => {
      // TODO: Send email although maybe after transaction successful
      contractWrite.write?.()
    },
    [contractWrite],
  )

  /**************
   * Use Effects
   **************/

  /**
   * Determines if the transaction is successful and redirects to success page.
   */
  useEffect(() => {
    if (!transaction.isSuccess) return

    router.push(
      `/p/${projectId.toString()}/pay/success?amount-eth=${totalPayment}&currency=${paymentCurrency}`,
    )
  }, [transaction.isSuccess, projectId, router, totalPayment, paymentCurrency])

  /**
   * Displays error toast if contract write fails or is terminated.
   */
  useEffect(() => {
    if (!contractWrite.error || !contractWrite.isError) return
    toast({
      title: 'Error',
      description: (contractWrite.error?.cause as any)?.shortMessage,
      variant: 'destructive',
    })
  }, [toast, contractWrite.error, contractWrite.isError])

  return (
    <Form {...form}>
      <form
        className={twMerge('mx-auto flex flex-col gap-6', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
          <CurrencyAmount amount={totalPayment} />
        </div>

        <LoadingButton
          className="mt-2 h-14 w-full"
          type="submit"
          disabled={
            !form.formState.isValid || prepare.isError || totalPayment === 0n
          }
          loading={
            prepare.isLoading ||
            transaction.isLoading ||
            contractWrite.isLoading
          }
        >
          Pay project
        </LoadingButton>
        {prepare.error && (
          <div className="text-red-500">
            {(prepare.error as any).cause.shortMessage}
          </div>
        )}

        <div className="text-center text-xs leading-5 text-gray-400 md:mt-8">
          All transactions are paid in Ethereum (ETH). Payments are
          non-refundable.
        </div>
      </form>
    </Form>
  )
}
