import { useJbProject } from '@/hooks/useJbProject'
import { WEI } from '@/lib/constants/currency'
import { InfuraPinResponse } from '@/lib/ipfs'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {
  Ether,
  JBProjectMetadata,
  JB_CURRENCIES,
  formatEther,
  useJbProjectsSetMetadataOf,
} from 'juice-hooks'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useWaitForTransaction } from 'wagmi'
import { z } from 'zod'
import { Breadcrumbs } from '../Breadcrumbs'
import { Input } from '../Input'
import { LoadingButton } from '../LoadingButton'
import { PayAmountInput } from '../PayAmountInput'
import { LabeledFormControl } from '../Project/components/LabeledFormControl'
import { RichEditor } from '../RichEditor'
import { UploadCard } from '../UploadCard'
import { YouTubeEmbed } from '../YouTubeEmbed'
import { Form, FormField } from '../ui/Form'
import { ManageHeader } from './components/ManageHeader'
import { useToast } from '../ui/useToast'

const JUICEBOX_MONEY_METADATA_DOMAIN = 0n

const ProjectGeneralSettingsFormSchema = z.object({
  name: z.string().max(256),
  introVideo: z.string().url(),
  introImage: z.string().url(),
  description: z.string(),
  logo: z.string().url(),
  coverPhoto: z.string().url(),
  softTargetAmount: z.union([
    z.coerce
      .number({
        errorMap: () => ({ message: 'Invalid payment' }),
      })
      .min(WEI, 'Payment amount must be greater than 1e-18 (1 wei)'),
    z.literal(''),
  ]),
  softTargetCurrency: z.union([
    z.literal(JB_CURRENCIES.ETH),
    z.literal(JB_CURRENCIES.USD),
  ]),
})

export const ManageProjectGeneralSettingsPage = () => {
  const projectData = useJbProject()
  const { toast } = useToast()

  const contractWrite = useJbProjectsSetMetadataOf()
  const mutation = useMutation({
    mutationFn: async (data: JBProjectMetadata) => {
      const ipfsRes = axios.post<InfuraPinResponse>('/api/ipfs/pinJson', data)
      const cid = (await ipfsRes).data.Hash

      contractWrite.write({
        args: [
          projectData.projectId,
          { domain: JUICEBOX_MONEY_METADATA_DOMAIN, content: cid },
        ],
      })
    },
  })
  const transaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  })
  const isLoading =
    mutation.isLoading || contractWrite.isLoading || transaction.isLoading

  /**
   * Displays error toast if contract write fails or is terminated.
   */
  useEffect(() => {
    if (!contractWrite.error || !contractWrite.isError) return
    toast({
      title: 'Failed to edit project details.',
      description: (contractWrite.error?.cause as any)?.shortMessage,
      variant: 'destructive',
    })
  }, [toast, contractWrite.error, contractWrite.isError])

  /**
   * Displays success toast if withdraw tx is successful.
   */
  useEffect(() => {
    if (!transaction.isSuccess) return
    toast({
      title: 'Project details were changed.',
      variant: 'default',
    })
  }, [toast, transaction.isSuccess])

  const form = useForm<z.infer<typeof ProjectGeneralSettingsFormSchema>>({
    resolver: zodResolver(ProjectGeneralSettingsFormSchema),
    defaultValues: {
      name: projectData.name,
      description: projectData.description,
      introVideo: projectData.introVideoUrl,
      logo: projectData.logoUri,
      coverPhoto: projectData.coverImageUri,
      softTargetAmount: parseFloat(formatEther(projectData.softTarget.amount)),
      softTargetCurrency: projectData.softTarget.currency,
    },
  })

  const softTargetCurrency = form.watch('softTargetCurrency')
  const introVideo = form.watch('introVideo')

  const submitMetadata = useCallback(
    async (data: z.infer<typeof ProjectGeneralSettingsFormSchema>) => {
      const softTargetAmount = data.softTargetAmount
        ? Ether.parse(data.softTargetAmount.toString(), 18).val
        : undefined
      const softTargetCurrency = data.softTargetCurrency

      // TODO: might not be exactly correct
      const metadata = {
        name: data.name,
        description: data.description,
        introVideoUrl: data.introVideo,
        logoUri: data.logo,
        coverImageUri: data.coverPhoto,
        softTargetAmount: softTargetAmount?.toString(),
        softTargetCurrency: softTargetCurrency.toString(),
      }
      // TODO: Send it
      await mutation.mutate(metadata)
    },
    [mutation],
  )

  return (
    <>
      <ManageHeader />
      <div className="mx-auto flex max-h-full w-full max-w-2xl flex-col gap-4 px-4 pb-24 md:gap-10 md:px-6">
        <Breadcrumbs rootKey="manage" delimiter=">" />

        <h1 className="text-2xl font-medium">General</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(submitMetadata)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <LabeledFormControl label="Name">
                  <Input {...field} />
                </LabeledFormControl>
              )}
            />

            <FormField
              control={form.control}
              name="introVideo"
              render={({ field }) => (
                <LabeledFormControl label="Campaign YouTube Video">
                  <>
                    <Input {...field} />
                    {introVideo && <YouTubeEmbed url={introVideo} />}
                  </>
                </LabeledFormControl>
              )}
            />
            <FormField
              control={form.control}
              name="introImage"
              render={({ field }) => (
                <LabeledFormControl
                  label="Campaign Image (Optional)"
                  description="This is a fallback option for a Campaign video. It is recommended to upload a video to YouTube instead."
                >
                  <UploadCard className="block" {...field} />
                </LabeledFormControl>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <LabeledFormControl label="Description">
                  <RichEditor {...field} />
                </LabeledFormControl>
              )}
            />

            <div className="flex flex-wrap gap-5">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <LabeledFormControl label="Logo">
                    <UploadCard className="block" {...field} />
                  </LabeledFormControl>
                )}
              />
              <FormField
                control={form.control}
                name="coverPhoto"
                render={({ field }) => (
                  <LabeledFormControl
                    className="min-w-[300px] flex-1"
                    label="Cover Photo"
                  >
                    <UploadCard className="block w-full" {...field} />
                  </LabeledFormControl>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="softTargetAmount"
              render={({ field }) => (
                <LabeledFormControl label="Soft Target">
                  <PayAmountInput
                    currency={softTargetCurrency}
                    setCurrency={currency => {
                      form.setValue('softTargetCurrency', currency)
                    }}
                    placeholder="0"
                    {...field}
                  />
                </LabeledFormControl>
              )}
            />

            <LoadingButton
              type="submit"
              className="h-14 md:w-fit md:self-end"
              loading={isLoading}
            >
              Submit
            </LoadingButton>
          </form>
        </Form>
      </div>
    </>
  )
}
