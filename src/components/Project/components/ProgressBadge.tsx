import { twMerge } from "tailwind-merge";

export function ProgressBadge() {
  // TODO: hook to determine if project is in progress or complete (reuse for Withdraw button)
  const isComplete = false

  const colorClasses = isComplete ? 'bg-melon-50 text-melon-700' : 'bg-split-50 text-split-800'
  return (
    <div className={twMerge(
      "rounded-full px-2.5 flex items-center justify-center h-6",
      colorClasses
    )}>
      <span>{isComplete ? 'Complete' : 'In progress'}</span>
    </div>
  )
}
