import { twMerge } from 'tailwind-merge'

type SpinnerProps = {
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <svg
      className={twMerge('animate-spin', className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="white"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  )
}
