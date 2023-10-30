import { EthereumAddress } from '@/components/EthereumAddress'
import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { Spinner } from '@/components/Spinner'
import { EthereumIconFilled } from '@/components/icon/EthereumIconFilled'
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
import { useIpfsFilePicker } from '@/hooks/useIpfsFilePicker/useIpfsFilePicker'
import { useJbProject } from '@/hooks/useJbProject'
import { publicClient } from '@/lib/viem/publicClient'
import {
  ChevronDownIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatEther } from 'juice-hooks'
import Image from 'next/image'
import {
  ChangeEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { isAddress, parseEther } from 'viem'
import { useAccount, useEnsName } from 'wagmi'
import { z } from 'zod'
import { useProjectPay } from '../providers/ProjectPayContext'

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
  const { nfts } = useJbProject()
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

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }, [])

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
          <div>{formatEther(total)} ETH</div>
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

type ProjectPayAmountInputProps = {
  currency: 1n | 2n
  setCurrency: (currency: 1n | 2n) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

const ProjectPayAmountInput: React.FC<ProjectPayAmountInputProps> = ({
  className,
  currency,
  setCurrency,
  ...props
}) => {
  const isEth = currency === 1n
  const toggleCurrency = useCallback(() => {
    setCurrency(isEth ? 2n : 1n)
  }, [isEth, setCurrency])

  return (
    <Input
      prefix={
        isEth ? (
          <EthereumIconFilled className="h-7 w-7 rounded-full bg-bluebs-50 fill-bluebs-500 p-1" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
            $
          </div>
        )
      }
      suffix={
        <Button
          type="button"
          size="child"
          variant="secondary"
          className={twMerge(
            'flex gap-1 rounded-sm py-1.5 pl-1 pr-2 text-xs',
            !isEth && 'bg-green-100 text-green-600',
          )}
          onClick={toggleCurrency}
        >
          <ChevronDownIcon className="h-4 w-4" />
          {isEth ? 'ETH' : 'USD'}
        </Button>
      }
      {...props}
    />
  )
}

type ProjectPayMessageInputProps = {
  attachedUrl: string | undefined
  setAttachedUrl: (url: string | undefined) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

const ProjectPayMessageInput: React.FC<ProjectPayMessageInputProps> = ({
  className,
  attachedUrl,
  setAttachedUrl,
  ...props
}) => {
  const acceptedFileTypes =
    'image/jpeg,image/png,image/gif,video/mp4,video/quicktime,video/x-m4v,video/webm'
  const {
    uploadedUrl,
    isUploading,
    selectedFile,
    uploadProgress,
    FileInput,
    openFilePicker,
    cancelUpload,
    removeFile,
  } = useIpfsFilePicker({
    accept: acceptedFileTypes,
    onFileUrlChange: url => setAttachedUrl(url),
  })
  return (
    <>
      {FileInput}
      <Input
        className="text-sm"
        placeholder="Attach an on-chain message to this payment"
        suffix={
          <Button
            type="button"
            size="child"
            variant="link"
            onClick={openFilePicker}
          >
            <PhotoIcon className="h-6 w-6 text-bluebs-500" />
          </Button>
        }
        {...props}
      />

      {isUploading ? (
        <div>
          <div className="mt-2 flex items-center justify-between">
            <div className="h-1 flex-1">
              <div
                role="progressbar"
                className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-bluebs-500"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              className="h-fit p-0"
              onClick={cancelUpload}
              aria-label="Cancel upload"
            >
              <XCircleIcon className="ml-4 h-5 w-5 flex-none text-gray-400" />
            </button>
          </div>
        </div>
      ) : (
        uploadedUrl &&
        selectedFile && (
          <div className="mt-4 flex">
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image fill src={uploadedUrl} alt={selectedFile.name} />
            </div>
            <button
              type="button"
              className="h-fit p-0"
              onClick={removeFile}
              aria-label="Remove attached file"
            >
              <XCircleIcon className="ml-2 h-5 w-5 flex-none text-gray-400" />
            </button>
            <span className="ml-8 max-w-xs truncate text-xs text-gray-500">
              Uploaded to: <Link href={uploadedUrl}>{uploadedUrl}</Link>
            </span>
          </div>
        )
      )}
    </>
  )
}

type ProjectPayBeneficiaryInputProps = {} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
>

const ProjectPayBeneficiaryInput: React.FC<ProjectPayBeneficiaryInputProps> = ({
  className,
  onChange: _onChange,
  ...props
}) => {
  const { address: ownerAddress } = useAccount()

  const currentAddress = useMemo(() => {
    if (!props.value) return ownerAddress
    if (!isAddress(props.value as string)) return ownerAddress

    return props.value as `0x${string}`
  }, [ownerAddress, props.value])

  const { data: currentEnsFromAddress } = useEnsName({
    address: currentAddress,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * hijacks the onChange event to check if the value is an ENS name or address
   */
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async e => {
      const value = e.target.value
      _onChange?.(e)
      if (isEnsName(value)) {
        setIsLoading(true)
        try {
          const ensAddress = await publicClient.getEnsAddress({ name: value })
          if (!ensAddress) return
          _onChange?.({ ...e, target: { ...e.target, value: ensAddress } })
          setIsEditing(false)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
        }
      } else if (isAddress(value)) {
        setIsEditing(false)
      }
    },
    [_onChange],
  )

  useEffect(() => {
    if (!isEditing) return
    inputRef.current?.focus()
  }, [isEditing])

  if (!isEditing) {
    return (
      <div className="flex h-11 justify-between gap-5 overflow-hidden rounded-lg border border-gray-200 bg-muted px-[14px] py-3 text-base leading-none">
        {currentAddress ? (
          <EthereumAddress showEnsIcon address={currentAddress} />
        ) : (
          <>Payer's address</>
        )}
        <Button
          size="child"
          variant="ghost"
          className="p-0"
          onClick={() => setIsEditing(true)}
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Input
        {...props}
        onChange={onChange}
        ref={inputRef}
        disabled={isLoading}
        suffix={
          isLoading ? <Spinner className="h-5 w-5 text-gray-900" /> : null
        }
        onBlur={() => setIsEditing(false)}
      />
    </>
  )
}

const isEnsName = (value: string) => {
  return value.endsWith('.eth')
}
