import { Article } from '@/components/article';
import { DynamicTranslationKey } from '@/types';
import { Button, Divider, Link, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';
import { LiaAngleRightSolid, LiaSlidersHSolid } from 'react-icons/lia';

import { AuthFeaturesModalAsync, useUser } from '../auth';
import { HomeProps } from './index';

interface YourTopicsProps {
  articles: HomeProps['topicArticles'];
}

const YourTopics: FC<YourTopicsProps> = ({ articles }) => {
  const t = useTranslations();
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className='flex w-full flex-col gap-4' id='your-topics'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-semibold'>
            {t('Home.yourTopics.title')}
          </h2>
          <p className='text-sm text-default-500'>
            {t('Home.yourTopics.description')}
          </p>
        </div>
        <Button
          color='primary'
          onPress={user ? undefined : onOpen}
          radius='full'
          startContent={<LiaSlidersHSolid size={20} />}
          variant='faded'
        >
          {t('Common.customize')}
        </Button>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article) => (
          <div className='rounded-2xl bg-content1 p-4' key={article.category}>
            <h3>
              <Link
                as={NextLink}
                className='text-xl'
                color='foreground'
                href='/topics/headlines'
              >
                {t(`Common.categories.${article.category}` as DynamicTranslationKey)}{' '}
                <LiaAngleRightSolid className='ml-1' size={20} />
              </Link>
            </h3>
            {article.articles.map((article, index) => (
              <Fragment key={index}>
                <Divider className='my-4' />
                <Article
                  article={article}
                  classNames={{
                    title: 'min-h-[60px]',
                  }}
                />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
      {isOpen && (
        <AuthFeaturesModalAsync isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </section>
  );
};

export type { YourTopicsProps };
export { YourTopics };
