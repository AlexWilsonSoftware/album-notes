import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lastfm-img2.akamaized.net',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
            {
                protocol: 'https',
                hostname: 'assets.fanart.tv',
            },
            {
                protocol: 'https',
                hostname: 'coverartarchive.org',
            },
            {
                protocol: 'https',
                hostname: 'e-cdns-images.dzcdn.net',
            },
            {
                protocol: 'https',
                hostname: 'ia*.archive.org',
            },
        ],
    },
};


export default nextConfig;
