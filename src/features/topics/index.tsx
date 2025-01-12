import { ArticleGridWrapper } from '@/components/article';
import { IArticle } from '@/components/article/types';
import { siteConfig } from '@/config';
import { getServerSideProps } from '@/pages/topics/[...slug]';
import { DynamicTranslationKey, ICategory } from '@/types';
import { Button } from '@nextui-org/react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { AbstractIntlMessages, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { IoShareSocialOutline } from 'react-icons/io5';
import { LiaStar } from 'react-icons/lia';

interface TopicsProps {
  messages: AbstractIntlMessages;
  searchResult: IArticle[];
  slug: string;
}

function Topics(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations();

  const topic = useMemo(
    () =>
      siteConfig.navItems.categories.find(
        (category) => category.translationKey === props.slug
      ),
    [props.slug]
  ) as ICategory;

  return (
    <main className='bg-content2 pb-5 pt-4'>
      <div className='container flex !max-w-[840px] flex-col items-start gap-y-6'>
        <div className='flex w-full items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div
              className={`size-14 overflow-hidden rounded-full`}
              style={{ backgroundColor: topic.color as string }}
            >
              <Image
                alt=''
                className='size-full'
                height={56}
                src={topic.icon as string}
                width={56}
              />
            </div>
            <h1 className='text-3xl'>
              {t(
                `Common.categories.${
                  topic.translationKey
                }` as DynamicTranslationKey
              )}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              radius='full'
              startContent={<LiaStar size={18} />}
              title={t('Common.followTopic')}
              variant='bordered'
            >
              {t('Common.follow')}
            </Button>
            <Button
              isIconOnly
              radius='full'
              startContent={<IoShareSocialOutline size={18} />}
              variant='light'
            />
          </div>
        </div>
        <ArticleGridWrapper articles={props.searchResult} />
      </div>
    </main>
  );
}

export type { TopicsProps };
export default Topics;
