import { NextSeoProps } from 'next-seo';

const seoConfig: NextSeoProps = {
  description:
    'Stay updated with the latest news and breaking stories from around the world. Acme News brings you real-time updates, reliable reporting, and in-depth analysis.',
  openGraph: {
    description:
      'Acme News: Your trusted source for breaking news, trending stories, and comprehensive reports from across the globe.',
    images: [
      {
        height: 630,
        type: 'image/png',
        url: 'https://commerce-shopify-l1tiqh7el-vercel-solutions-vtest314.vercel.app/opengraph-image?376fa9d8052ebb8e',
        width: 1200,
      },
    ],
    locale: 'en_US',
    site_name: 'Acme News',
    type: 'website',
    url: 'https://www.url.ie/',
  },
  title: 'Acme News - Trusted News Source',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@AcmeNews',
    site: 'https://nextjs.org/commerce',
  },
};

export { seoConfig };
