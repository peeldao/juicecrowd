const SECURITY_HEADERS = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  }, // NOTE: gnosis safe is still allowed due to frame-ancestors definition
]

const WALLET_CONNECT_URLS = [
  'https://*.walletconnect.com',
  'https://*.walletconnect.org',
  'wss://*.walletconnect.org',
  'wss://*.walletconnect.com',
  'wss://www.walletlink.org',
]

const INFURA_IPFS_URLS = [
  'https://*.infura-ipfs.io',
  'https://ipfs.infura.io:5001',
]

const SCRIPT_SRC = [
  'https://*.juicebox.money',
  'https://*.juicecrowd.gg',
  'https://cdn.usefathom.com',
  `'unsafe-eval'`,
  `'unsafe-inline'`,
]

const STYLE_SRC = [
  `'unsafe-inline'`, // NextJS, hotjar
]

const IMG_SRC = [
  'https://*.juicebox.money',
  'https://*.juicecrowd.gg',
  'https://juicebox.money',
  'https://juicecrowd.gg',
  ...INFURA_IPFS_URLS,
  'https://jbx.mypinata.cloud',
  'https://gateway.pinata.cloud',
  'https://cdn.stamp.fyi',
  'https://ipfs.io',
  'https://cdn.usefathom.com',
  '*.walletconnect.com',
]

const CONNECT_SRC = [
  'https://subgraph.satsuma-prod.com',
  'https://*.juicebox.money',
  'https://*.juicecrowd.gg',
  'https://juicebox.money',
  'https://juicecrowd.gg',
  'https://*.infura.io',
  ...INFURA_IPFS_URLS,
  'https://api.pinata.cloud',
  'https://jbx.mypinata.cloud',
  'https://api.studio.thegraph.com',
  'https://gateway.thegraph.com',
  'https://*.safe.global',
  'https://*.snapshot.org',
  'https://*.wallet.coinbase.com',
  ...WALLET_CONNECT_URLS,
]

if (process.env.NODE_ENV === 'development') {
  CONNECT_SRC.push('localhost:*')
}

const FRAME_SRC = [
  'https://verify.walletconnect.org/',
  'https://verify.walletconnect.com/',
  'https://www.youtube.com/',
  'https://youtube.com/',
]

const ContentSecurityPolicy = `
  default-src 'none';
  script-src 'self' ${SCRIPT_SRC.join(' ')};
  style-src 'self' ${STYLE_SRC.join(' ')};
  font-src 'self' data:;
  img-src 'self' ${IMG_SRC.join(' ')} data:;
  connect-src 'self' ${CONNECT_SRC.join(' ')};
  manifest-src 'self';
  frame-src ${FRAME_SRC.join(' ')};
  media-src 'self' https://jbx.mypinata.cloud ${INFURA_IPFS_URLS.join(' ')};
  form-action 'self';
`

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jbm.infura-ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.stamp.fyi',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_INFURA_IPFS_HOSTNAME,
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
          ...SECURITY_HEADERS,
        ],
      },
    ]
  },
}
