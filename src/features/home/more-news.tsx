import { Article } from '@/components/article';
import { Button, Divider } from '@nextui-org/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';

import { HomeProps } from './index';

interface MoreNewsProps {
  articles: HomeProps['moreArticles'];
}

const MoreNews: FC<MoreNewsProps> = ({ articles }) => {
  const t = useTranslations();

  return (
    <section className='flex w-full flex-col gap-4' id='more-news'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-semibold'>{t('Home.more.title')}</h2>
          <p className='text-sm text-default-500'>
            {t('Home.more.description')}
          </p>
        </div>
        <Button as={NextLink} color='primary' href='/signup' radius='full'>
          {t('Common.cta.signIn')}
        </Button>
      </div>
      <div className='grid rounded-2xl bg-content1 p-4 lg:grid-cols-2 lg:gap-x-8'>
        {articles.map((article, index) => (
          <Fragment key={index}>
            <Article article={article}>
              {![4, 5].includes(index) && <Divider className='my-4' />}
            </Article>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export { MoreNews };
