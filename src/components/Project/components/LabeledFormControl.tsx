import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { PropsWithChildren } from 'react'

export type LabeledFormControlProps = {
  className?: string
  label: string
  description?: string
  required?: boolean
}

export const LabeledFormControl: React.FC<
  PropsWithChildren<LabeledFormControlProps>
> = ({ className, label, description, required, children }) => {
  return (
    <FormItem className={className}>
      <FormLabel className="text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription className="text-xs text-gray-500">
        {description}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}
