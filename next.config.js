const withLinaria = require('next-linaria');

// Need more permissive for hot reload and other development stuff to work
const devStyleCSPAdditions = "'self' 'unsafe-inline'";
const devCSPAdditions = "; script-src 'self' 'unsafe-eval'";
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; connect-src 'self'; style-src ${
      process.env.NODE_ENV === 'development' ? devStyleCSPAdditions : ''
    } https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: ${
      process.env.NODE_ENV === 'development' ? devCSPAdditions : ''
    }`,
  },
  // For older browsers not supporting CSP such as IE
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

module.exports = withLinaria({
  reactStrictMode: true,
  i18n: {
    locales: ['fi', 'en'],
    defaultLocale: 'fi',
    localeDetection: false,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  trailingSlash: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
});
