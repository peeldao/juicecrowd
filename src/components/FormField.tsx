import { PropsWithChildren, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type FormFieldProps = {
  className?: string
  label: ReactNode
  description?: ReactNode
  required?: boolean
}

export const FormField: React.FC<PropsWithChildren<FormFieldProps>> = ({
  className,
  label,
  description,
  required,
  children,
}) => {
  return (
    <div className={twMerge('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-1">
        <div className="font-medium">{label}</div>
        {required && <div className="text-red-600">*</div>}
      </div>
      {children}
      {description && (
        <div className="text-xs text-gray-600">{description}</div>
      )}
    </div>
  )
}
