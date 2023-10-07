export type JuiceboxLogoProps = {
  className?: string
}
export const JuiceboxLogo: React.FC<JuiceboxLogoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="23"
      height="28"
      viewBox="0 0 23 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_1045)">
        <path
          d="M22.0691 3.4434C22.0453 3.24681 21.9529 3.07702 21.798 2.94298C21.6551 2.81489 21.4704 2.73149 21.3244 2.66596L21.1934 2.6034C20.8925 2.46043 20.5887 2.32043 20.2789 2.18043L20.1002 2.1C19.7665 1.95404 19.4299 1.80809 19.0934 1.66511C19.0934 1.66511 17.9644 1.18553 17.7291 1.08128C17.3985 0.938298 17.0648 0.804255 16.7312 0.673191L16.204 0.461702C15.647 0.235319 15.0691 0 14.4585 0C14.0533 0 13.6929 0.104255 13.3563 0.315745C12.9691 0.557021 12.7219 0.923404 12.6265 1.39702C12.5044 1.97787 12.1887 3.25277 11.8997 4.39064C11.8372 4.64383 11.587 4.79872 11.3308 4.75106C10.8274 4.65872 10.321 4.56936 9.81761 4.48596C9.12356 4.36979 8.43846 4.18213 7.72654 4.12851C7.02356 4.08383 6.32952 4.27745 5.64739 4.44426C4.15803 4.8017 2.69846 5.30213 1.31335 5.96043C0.949945 6.13915 0.863562 6.31787 0.857605 6.70213C0.827817 8.11702 0.61037 9.55277 0.523987 10.9677C0.431647 12.5077 0.375051 14.0477 0.345264 15.5966C0.291647 18.7362 0.345264 21.9145 0.830796 25.0243C0.848668 25.1285 0.887392 25.2477 0.881434 25.3579C0.881434 25.4383 0.899307 25.5247 0.943988 25.5991C1.01846 25.7362 1.24484 26.1502 5.3942 27.0945C6.6125 27.3715 9.57335 27.997 11.4768 27.997C11.5512 27.997 11.6316 27.997 11.7091 27.9911C16.1772 27.86 17.6934 26.0489 17.7589 25.9745C17.8751 25.8255 17.9495 25.7391 18.0657 22.6919C18.1342 20.9732 18.1997 18.6617 18.2385 16.3383C18.2861 13.8898 18.307 11.6349 18.2951 9.98468C18.2891 9.29362 18.2891 8.61149 18.2593 7.92638C18.2474 7.62851 18.2295 7.32766 18.1908 7.03574C18.1282 6.58298 17.7351 6.42511 17.3538 6.26426C17.1989 6.2017 17.0291 6.13915 16.8682 6.07957C16.4929 5.94255 16.1057 5.82638 15.7185 5.71617C15.644 5.69234 14.8516 5.47489 14.8248 5.47489L14.6133 5.43021C14.4287 5.38851 14.1457 5.15915 14.2231 4.76298L14.7474 2.53787C14.8189 2.49319 14.9202 2.42468 15.0065 2.3383L15.6768 2.62723C15.8108 2.68383 20.264 4.58426 20.3116 4.60511C20.3921 4.63787 20.4665 4.66766 20.5499 4.70936L20.6095 4.73617C20.6482 4.75404 20.687 4.76894 20.7346 4.78681C20.8091 4.81362 20.9074 4.85234 21.0265 4.86128C21.1129 4.86128 21.1814 4.8434 21.2499 4.82553C21.387 4.78383 21.5151 4.70043 21.6372 4.5783C21.7534 4.46213 21.8487 4.33106 21.9202 4.17617C22.0453 3.91404 22.0899 3.66681 22.0602 3.4434H22.0691ZM3.57718 24.3898C3.54143 24.4553 3.45803 24.4821 3.38952 24.4494C3.32101 24.4166 3.29122 24.3362 3.31207 24.2617L5.80824 16.5617L1.7959 16.1745C1.73931 16.1685 1.69165 16.1328 1.6708 16.0791C1.6559 16.0255 1.66484 15.966 1.70058 15.9243L6.62143 10.2677C6.66909 10.214 6.74952 10.2021 6.80612 10.2468C6.86867 10.2855 6.88952 10.366 6.86271 10.4345L5.36143 13.9464C5.3376 14 5.37931 14.0626 5.43888 14.0626H9.46314C9.51378 14.0626 9.56143 14.0894 9.58824 14.137C9.61505 14.1847 9.61505 14.2443 9.58824 14.286L3.57122 24.3898H3.57718ZM11.2682 26.2545C11.2623 26.3915 11.1402 26.4957 10.9793 26.4957C9.93378 26.5285 8.31335 26.463 6.81803 26.1174C6.71675 26.0936 6.73463 25.9477 6.83888 25.9417C11.4231 25.6796 10.0887 16.1804 11.0568 10.8187C12.001 5.57319 11.3516 23.9609 11.2682 26.2574V26.2545ZM15.0721 7.19064C15.4891 7.10723 15.9121 7.05957 16.3351 7.03574C16.9606 7.00298 16.9963 6.98511 16.8831 7.09532C16.7968 7.17872 16.6151 7.22043 16.5078 7.26213C16.341 7.32766 16.1682 7.38723 15.9985 7.44681C15.2389 7.70894 14.4674 7.94426 13.6959 8.1766C13.1299 8.34638 12.564 8.52213 11.9921 8.65915C11.9057 8.68 11.8193 8.69787 11.7329 8.70979C11.3189 8.76638 10.9078 8.70681 10.4997 8.62936C9.92782 8.51915 9.35888 8.39702 8.79292 8.25702C7.22909 7.87574 5.67122 7.46468 4.11633 7.03574C2.54356 6.58596 2.28143 6.31787 4.23548 6.59787C4.30399 6.60681 4.36356 6.61277 4.42612 6.61872C5.4776 6.77957 6.54101 6.91957 7.58654 7.0834C9.14441 7.32766 10.747 7.66426 12.3287 7.57787C13.2521 7.53021 14.1636 7.37234 15.0691 7.19064H15.0721Z"
          // fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_1045">
          <rect
            width="21.7447"
            height="28"
            fill="white"
            transform="translate(0.333344)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}