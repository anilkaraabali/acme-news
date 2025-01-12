import { IArticle } from '@/components/article/types';

const articleStub = (data: Partial<IArticle> = {}): IArticle => ({
  author: 'Kate Brady',
  description:
    'Musk tested the boundaries of foreign election interference, hosting AfD co-leader Alice Weidel for a livestream interview on X.',
  publishedAt: '2025-01-10T05:52:24Z',
  source: {
    id: 'the-washington-post',
    name: 'The Washington Post',
  },
  title:
    'Elon Musk and far-right German leader Alice Weidel endorse each other in interview - The Washington Post',
  url: 'https://www.washingtonpost.com/world/2025/01/09/elon-musk-alice-weidel-afd-germany/',
  urlToImage:
    'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/R6NSWWPPQWL6OLDP2AQKVTSZCM_size-normalized.jpg&w=1440',
  ...data,
});

export { articleStub };
