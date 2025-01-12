import {
  LiaChartPieSolid,
  LiaCodeSolid,
  LiaFacebook,
  LiaFingerprintSolid,
  LiaGithub,
  LiaInstagram,
  LiaMousePointerSolid,
  LiaSyncSolid,
  LiaYoutube,
} from 'react-icons/lia';

type SiteConfig = typeof siteConfig;

const siteConfig = {
  footerItems: [
    {
      items: [
        {
          href: '/',
          title: 'Home Page',
        },
        {
          href: '/topics/us',
          title: 'U.S.',
        },
        {
          href: '/topics/world',
          title: 'World',
        },
        {
          href: '/topics/business',
          title: 'Business',
        },
        {
          href: '/topics/technology',
          title: 'Technology',
        },
        {
          href: '/topics/entertainment',
          title: 'Entertainment',
        },
        {
          href: '/topics/sports',
          title: 'Sports',
        },
        {
          href: '/topics/science',
          title: 'Science',
        },
        {
          href: '/topics/health',
          title: 'Health',
        },
      ],
      title: 'News',
    },
    {
      items: [
        {
          href: '#',
          title: 'Submit ticket',
        },
        {
          href: '#',
          title: 'Documentation',
        },
        {
          href: '#',
          title: 'Guides',
        },
      ],
      title: 'Support',
    },
    {
      items: [
        {
          href: '#',
          title: 'About',
        },
        {
          href: '#',
          title: 'Blog',
        },
        {
          href: '#',
          title: 'Jobs',
        },
        {
          href: '#',
          title: 'Press',
        },
      ],
      title: 'Company',
    },
    {
      items: [
        {
          href: '#',
          title: 'Terms of service',
        },
        {
          href: '#',
          title: 'Privacy Policy',
        },
        {
          href: '#',
          title: 'License',
        },
      ],
      title: 'Legal',
    },
  ],
  navItems: {
    categories: [
      {
        color: null,
        href: '/topics/us',
        icon: '/images/topics/us.webp',
        translationKey: 'us',
      },
      {
        color: '#689f38',
        href: '/topics/world',
        icon: '/images/topics/world.webp',
        translationKey: 'world',
      },
      {
        color: '#259b24',
        href: '/topics/business',
        icon: '/images/topics/business.webp',
        translationKey: 'business',
      },
      {
        color: '#039be5',
        href: '/topics/technology',
        icon: '/images/topics/technology.webp',
        translationKey: 'technology',
      },
      {
        color: '#7e57c2',
        href: '/topics/entertainment',
        icon: '/images/topics/entertainment.webp',
        translationKey: 'entertainment',
      },
      {
        color: '#ef6c00',
        href: '/topics/sports',
        icon: '/images/topics/sports.webp',
        translationKey: 'sports',
      },
      {
        color: '#e91e63',
        href: '/topics/science',
        icon: '/images/topics/science.webp',
        translationKey: 'science',
      },
      {
        color: '#5677fc',
        href: '/topics/health',
        icon: '/images/topics/health.webp',
        translationKey: 'health',
      },
    ],
    highlights: [
      {
        color: null,
        href: '/',
        icon: null,
        translationKey: 'home',
      },
      {
        color: null,
        href: '/for-you',
        icon: null,
        translationKey: 'forYou',
      },
      {
        color: null,
        href: '/following',
        icon: null,
        translationKey: 'following',
      },
    ],
  },
  navMenuItems: [
    {
      children: [
        {
          description: 'Get a better understanding of your traffic',
          href: '#',
          icon: LiaChartPieSolid,
          label: 'Analytics',
        },
        {
          description: 'Speak directly to your customers',
          href: '#',
          icon: LiaMousePointerSolid,
          label: 'Engagement',
        },
        {
          description: 'Your customers’ data will be safe and secure',
          href: '#',
          icon: LiaFingerprintSolid,
          label: 'Security',
        },
        {
          description: 'Connect with third-party tools',
          href: '#',
          icon: LiaCodeSolid,
          label: 'Integrations',
        },
        {
          description: 'Build strategic funnels that will convert',
          href: '#',
          icon: LiaSyncSolid,
          label: 'Automations',
        },
      ],
      href: '',
      label: 'Products',
    },
    {
      href: '/features',
      label: 'Features',
    },
    {
      href: '/marketplace',
      label: 'Marketplace',
    },
    {
      href: '/company',
      label: 'Company',
    },
  ],
  socialItems: [
    {
      href: '#',
      icon: LiaFacebook,
      title: 'Facebook',
    },
    {
      href: '#',
      icon: LiaInstagram,
      title: 'Instagram',
    },
    {
      href: '#',
      icon: LiaYoutube,
      title: 'Youtube',
    },
    {
      href: '#',
      icon: LiaGithub,
      title: 'GitHub',
    },
  ],
};

export type { SiteConfig };
export { siteConfig };
