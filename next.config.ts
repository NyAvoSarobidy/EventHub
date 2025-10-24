import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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