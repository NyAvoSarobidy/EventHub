import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';


const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});


const nextConfig: NextConfig = {
    images: {
        domains: ['images.unsplash.com','randomuser.me'],
    }, 
    eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);