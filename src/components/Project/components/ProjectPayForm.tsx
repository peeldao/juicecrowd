import { ConnectKitButton } from '@/components/ConnectKitButton'
import { CurrencyAmount } from '@/components/CurrencyAmount'
import { useEthUsdPrice } from '@/components/EthUsdPriceProvider'
import { Input } from '@/components/Input'
import { LoadingButton } from '@/components/LoadingButton'
import { Button } from '@/components/ui/Button'
import { Form, FormField } from '@/components/ui/Form'
import { useToast } from '@/components/ui/useToast'
import { useCountdown } from '@/hooks/useCountdown'
import { useJbProject } from '@/hooks/useJbProject'
import { usePayProjectTx } from '@/hooks/usePayProjectTx'
import { JC01_DATES } from '@/lib/constants'
import { WEI } from '@/lib/constants/currency'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { JB_CURRENCIES } from 'juice-hooks'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Address, isAddress, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { useProjectPay } from '../providers/ProjectPayContext'
import { LabeledFormControl } from './LabeledFormControl'
import { ProjectPayBeneficiaryInput } from './ProjectPayBeneficiaryInput'
import { ProjectPayMessageInput } from './ProjectPayMessageInput'

export const ProjectPayFormSchema = z.object({
  paymentAmount: z.union([
    z.coerce
      .number({
        errorMap: () => ({ message: 'Invalid payment' }),
      })
      .min(WEI, 'Payment amount must be greater than 1e-18 (1 wei)'),
    z.literal(''),
  ]),
  paymentCurrency: z.union([
    z.literal(JB_CURRENCIES.ETH),
    z.literal(JB_CURRENCIES.USD),
  ]),
  beneficiary: z
    .string()
    .optional()
    .refine(value => {
      if (!value) return true
      return isAddress(value)
    }, 'Invalid wallet address')
    .transform(value => (value ? (value as Address) : undefined)),
  email: z.string().email('Invalid email address'),
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
  const { isConnecting, isConnected } = useAccount()

  const { isComplete } = useCountdown(JC01_DATES.PROJECTS_RUN)

  const { usdToEth, ethToUsd } = useEthUsdPrice()

  const form = useFormContext<z.infer<typeof ProjectPayFormSchema>>()

  const { nftRewardIds } = useProjectPay()

  const totalNftSelectionPriceUsd = useMemo(
    () =>
      nftRewardIds.reduce((acc, nftId) => {
        if (!nfts) return acc
        const nft = nfts.find(nft => nft.id === nftId)
        if (!nft) return acc
        return acc + nft.price
      }, 0n),
    [nftRewardIds, nfts],
  )
  const totalNftSelectionPriceEth = usdToEth(totalNftSelectionPriceUsd)

  const paymentAmount = form.watch('paymentAmount')
  const paymentCurrency = form.watch('paymentCurrency')
  const etherPayment = useMemo(() => {
    if (!paymentAmount || isNaN(paymentAmount)) return 0n
    const bigUnitPay = parseEther(`${paymentAmount}`)

    if (paymentCurrency === JB_CURRENCIES.ETH) return bigUnitPay

    // payment is in usd so we need to convert to real wei
    return usdToEth(bigUnitPay)
  }, [paymentAmount, paymentCurrency, usdToEth])

  const totalPaymentWei = useMemo(() => {
    return totalNftSelectionPriceEth + etherPayment
  }, [etherPayment, totalNftSelectionPriceEth])

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
    amountWei: totalPaymentWei,
    memo,
    tiersToMint,
    beneficiaryAddress,
  })

  const { toast } = useToast()

  const [submittedEmail, setSubmittedEmail] = useState<string | undefined>()

  const onSubmit = useCallback(
    async (values: z.infer<typeof ProjectPayFormSchema>) => {
      if (isComplete) return
      contractWrite.write?.()
      setSubmittedEmail(values.email)
    },
    [contractWrite, isComplete],
  )

  const [pushingToSuccess, setPushingToSuccess] = useState(false)

  /**************
   * Use Effects
   **************/

  /**
   * Determines if the transaction is successful and redirects to success page.
   */
  useEffect(() => {
    const routerPush = () => {
      router.push(
        `/p/${projectId.toString()}/pay/success?amount-eth=${totalPaymentWei}&currency=${paymentCurrency}`,
      )
    }
    const payEmailSuccess = async () => {
      if (!transaction.data) return
      await axios.post('/api/pay/success', {
        email: submittedEmail,
        walletAddress: transaction.data.from,
        transactionHash: transaction.data.transactionHash,
        projectId: projectId.toString(),
      })
    }

    if (!transaction.isSuccess) return
    setPushingToSuccess(true)
    if (submittedEmail) {
      payEmailSuccess().finally(() => routerPush())
    } else {
      routerPush()
    }
  }, [
    transaction.isSuccess,
    projectId,
    router,
    totalPaymentWei,
    paymentCurrency,
    transaction.data,
    submittedEmail,
  ])

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
            <LabeledFormControl
              className="mt-6"
              label="NFTs and rewards will be sent to"
            >
              <ProjectPayBeneficiaryInput {...field} />
            </LabeledFormControl>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <LabeledFormControl
              required
              label="Email"
              description="Enter email to receive reward confirmation & updates"
            >
              <Input
                placeholder="example@juicecrowd.gg"
                prefix={<EnvelopeIcon className="h-5 w-5 text-gray-500" />}
                {...field}
              />
            </LabeledFormControl>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <LabeledFormControl label="Message (Optional)">
              <ProjectPayMessageInput
                attachedUrl={attachedUrl}
                setAttachedUrl={setAttachedUrl}
                {...field}
              />
            </LabeledFormControl>
          )}
        />

        <div className="mt-6 flex justify-between font-medium">
          <div className="text-base">Total to pay</div>
          <div className="flex items-center gap-2">
            <CurrencyAmount amount={totalPaymentWei} />
            <CurrencyAmount
              amount={ethToUsd(totalPaymentWei)}
              currency={JB_CURRENCIES.USD}
              className="text-xs text-gray-500"
            />
          </div>
        </div>

        {!isComplete ? (
          isConnected ? (
            <LoadingButton
              className="mt-2 h-14 w-full"
              type="submit"
              disabled={prepare.isError || totalPaymentWei === 0n}
              loading={
                prepare.isLoading ||
                transaction.isLoading ||
                contractWrite.isLoading ||
                pushingToSuccess
              }
            >
              Pay project
            </LoadingButton>
          ) : (
            <ConnectKitButton
              disabled={totalPaymentWei === 0n || isConnecting}
              variant="default"
              connectText="Connect wallet to pay"
            />
          )
        ) : (
          <Button className="mt-2 h-14 w-full" disabled>
            Project finished
          </Button>
        )}
        {prepare.error && (
          <div className="text-red-500">
            {(prepare.error as any).cause.shortMessage}
          </div>
        )}

        <div className="text-center text-xs leading-5 text-gray-400">
          <p>
            Payments in Ether (ETH) and are non-refundable. Rewards are minted
            as NFTs.
          </p>
          <p>
            Claim your reward by contacting the project using the links
            provided.
          </p>
        </div>
      </form>
    </Form>
  )
}
