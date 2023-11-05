import { FormField } from '@/components/ui/Form'
import { PayCardBaseProps, PayCardBase } from './PayCardBase'
import { useFormContext } from 'react-hook-form'
import { ProjectPayAmountInput } from './ProjectPayAmountInput'
import { ProjectPayFormItem } from './ProjectPayFormItem'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export interface PayDonationCardProps extends PayCardBaseProps {}

export const PayDonationCard: React.FC<PayDonationCardProps> = ({
  className,
  ...props
}) => {
  const form = useFormContext()
  // TODO: Use proper currency formatting from juice_hooks when available
  // for now, 1n == eth, 2n == usd
  const [currency, setCurrency] = useState<1n | 2n>(1n)
  return (
    <PayCardBase
      className={twMerge('flex-col gap-2 p-2', className)}
      {...props}
    >
      <div className="font-medium">Donate without a reward ❤️</div>
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
            <ProjectPayFormItem label="Donation amount">
              <ProjectPayAmountInput
                currency={currency}
                setCurrency={setCurrency}
                placeholder="0"
                {...field}
              />
            </ProjectPayFormItem>
          )}
        />
      </div>
    </PayCardBase>
  )
}
