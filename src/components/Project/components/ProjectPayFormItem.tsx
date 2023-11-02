import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { PropsWithChildren } from 'react'

export type ProjectPayFormItemProps = {
  className?: string
  label: string
  description?: string
}

export const ProjectPayFormItem: React.FC<
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
