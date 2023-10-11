import { twMerge } from 'tailwind-merge'

export type GradientBackgroundProps = {
  className?: string
}

/**
 * Two elliptical smudges that are used as a background for the landing page.
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
}) => {
  className = twMerge(
    '-z-10 h-auto md:w-[120%] w-[165%] max-w-[1725px]',
    className,
  )

  return (
    <>
      <svg
        className={twMerge('md:hidden', className)}
        width="806"
        height="663"
        viewBox="0 0 806 663"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.64" filter="url(#filter0_f_4_1061)">
          <ellipse
            cx="253.389"
            cy="460.595"
            rx="155.984"
            ry="27.9071"
            transform="rotate(-30.6818 253.389 460.595)"
            fill="url(#paint0_linear_4_1061)"
          />
        </g>
        <g opacity="0.6" filter="url(#filter1_f_4_1061)">
          <ellipse
            cx="542.293"
            cy="181.297"
            rx="155.984"
            ry="27.9071"
            transform="rotate(158.431 542.293 181.297)"
            fill="url(#paint1_linear_4_1061)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_4_1061"
            x="0.193466"
            y="259.157"
            width="506.391"
            height="402.875"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="59.141"
              result="effect1_foregroundBlur_4_1061"
            />
          </filter>
          <filter
            id="filter1_f_4_1061"
            x="278.581"
            y="0.0559845"
            width="527.423"
            height="362.482"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="59.141"
              result="effect1_foregroundBlur_4_1061"
            />
          </filter>
          <linearGradient
            id="paint0_linear_4_1061"
            x1="110.134"
            y1="456.816"
            x2="391.514"
            y2="455.062"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5168E0" />
            <stop offset="1" stop-color="#D9CDFF" stop-opacity="0.4" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_4_1061"
            x1="399.038"
            y1="177.518"
            x2="680.417"
            y2="175.764"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5168E0" />
            <stop offset="1" stop-color="#D9CDFF" stop-opacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className={twMerge('hidden md:block', className)}
        width="2303"
        height="1226"
        viewBox="0 0 2303 1226"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.64" filter="url(#filter0_f_1_3)">
          <ellipse
            cx="685.452"
            cy="680.597"
            rx="422"
            ry="75.5"
            transform="rotate(-30.6818 685.452 680.597)"
            fill="url(#paint0_linear_1_3)"
          />
        </g>
        <g opacity="0.6" filter="url(#filter1_f_1_3)">
          <ellipse
            cx="1588.8"
            cy="490.926"
            rx="422"
            ry="75.5"
            transform="rotate(158.431 1588.8 490.926)"
            fill="url(#paint1_linear_1_3)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1_3"
            x="0.456299"
            y="135.628"
            width="1369.99"
            height="1089.94"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="160"
              result="effect1_foregroundBlur_1_3"
            />
          </filter>
          <filter
            id="filter1_f_1_3"
            x="875.35"
            y="0.596161"
            width="1426.89"
            height="980.659"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="160"
              result="effect1_foregroundBlur_1_3"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_3"
            x1="297.891"
            y1="670.375"
            x2="1059.13"
            y2="665.628"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5168E0" />
            <stop offset="1" stop-color="#D9CDFF" stop-opacity="0.4" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1_3"
            x1="1201.23"
            y1="480.703"
            x2="1962.48"
            y2="475.956"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5168E0" />
            <stop offset="1" stop-color="#D9CDFF" stop-opacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}
