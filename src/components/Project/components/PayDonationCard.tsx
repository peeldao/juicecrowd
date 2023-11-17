import { FormField } from '@/components/ui/Form'
import { JBCurrency } from 'juice-hooks'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { LabeledFormControl } from './LabeledFormControl'
import { PayCardBase, PayCardBaseProps } from './PayCardBase'
import { PayAmountInput } from '../../PayAmountInput'
import { ProjectPayFormSchema } from './ProjectPayForm'

export interface PayDonationCardProps extends PayCardBaseProps {}

export const PayDonationCard: React.FC<PayDonationCardProps> = ({
  className,
  ...props
}) => {
  const form = useFormContext<z.infer<typeof ProjectPayFormSchema>>()
  const currency = form.watch('paymentCurrency')
  const setCurrency = useCallback(
    (currency: JBCurrency) => {
      form.setValue('paymentCurrency', currency)
    },
    [form],
  )
  return (
    <PayCardBase
      className={twMerge('flex-col gap-2 p-2', className)}
      {...props}
    >
      <div className="text-base font-medium">Donate without a reward ❤️</div>
      <div className="text-sm text-gray-500">
        You understand that this is purely a donation.
      </div>

      <div
        onClick={e => {
          e.stopPropagation()
        }}
        className={twMerge('mt-2', !props.isSelected && 'hidden')}
      >
        <FormField
          control={form.control}
          name="paymentAmount"
          render={({ field }) => (
            <LabeledFormControl label="Donation amount">
              <PayAmountInput
                currency={currency}
                setCurrency={setCurrency}
                placeholder="0"
                {...field}
              />
            </LabeledFormControl>
          )}
        />
      </div>
    </PayCardBase>
  )
}
