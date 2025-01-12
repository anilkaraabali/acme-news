import { ArticleGrid } from '@/components/article';
import { Divider, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { LiaAngleRightSolid } from 'react-icons/lia';

import { HomeProps } from './index';

interface TopStoriesProps {
  articles: HomeProps['topArticles'];
}

const TopStories: FC<TopStoriesProps> = ({ articles }) => {
  const t = useTranslations('Home.topStories');

  return (
    <ArticleGrid
      articles={articles}
      id='top-stories'
      slots={{
        title: (
          <>
            <h3>
              <Link as={NextLink} className='text-xl' href='/topics/headlines'>
                {t('title')} <LiaAngleRightSolid className='ml-1' size={20} />
              </Link>
            </h3>
            <Divider className='my-4' />
          </>
        ),
      }}
    />
  );
};

export type { TopStoriesProps };
export { TopStories };
