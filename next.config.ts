import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
  }
});

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'randomuser.me'],
  }, 
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

const withNextIntl = createNextIntlPlugin();

// CORRECTION ICI : Appliquer withPWA ET withNextIntl
export default withNextIntl(withPWA(nextConfig));