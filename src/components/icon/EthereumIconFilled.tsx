export type EthereumIconFilledProps = {
  className?: string
}

export const EthereumIconFilled: React.FC<EthereumIconFilledProps> = ({
  className,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 19 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.7371 8.90145C14.75 8.90849 14.75 8.92257 14.75 8.93665L14.7564 8.92257V8.94369V8.95776C14.75 8.9648 14.75 8.97888 14.75 8.97888C14.7436 8.98592 14.7436 8.99296 14.7436 8.99296C14.7371 9 14.7242 9.01408 14.7178 9.01408H14.7049L9.55153 11.8298C9.53865 11.8439 9.52577 11.8439 9.50644 11.8439C9.48712 11.8439 9.46135 11.8298 9.46135 11.8298L4.30798 9.01408H4.29509C4.28221 9.00704 4.27577 9 4.26933 8.99296H4.26288V8.98592H4.25644C4.25 8.97888 4.25 8.9648 4.25 8.9648V8.95073V8.92961H4.25644C4.25644 8.9193 4.25989 8.91277 4.26427 8.90448C4.26587 8.90145 4.2676 8.89818 4.26933 8.89441V8.88737L9.41626 0.785196L9.42914 0.771118L9.42914 0.771116C9.43559 0.764076 9.44847 0.75 9.45491 0.75H9.46779H9.5C9.50644 0.75 9.53221 0.757039 9.53221 0.757039H9.53865C9.55153 0.764078 9.55798 0.771118 9.56442 0.778157L9.5773 0.792235L14.7371 8.89441V8.90145ZM9.57086 13.4629L14.2475 10.7598H14.2347C14.2862 10.7317 14.3442 10.7457 14.3764 10.795C14.415 10.8443 14.4086 10.9147 14.3764 10.9569L9.5773 17.2078C9.55798 17.2359 9.52577 17.25 9.49356 17.25C9.46135 17.25 9.40982 17.2078 9.40982 17.2078L4.61074 10.9569C4.57853 10.9076 4.57853 10.8443 4.61074 10.795C4.64939 10.7457 4.70736 10.7317 4.75245 10.7598L9.42914 13.4629C9.47423 13.491 9.52577 13.491 9.57086 13.4629Z"
      />
    </svg>
  )
}