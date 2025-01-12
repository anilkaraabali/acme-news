import { IArticle } from '@/components/article/types';
import { getServerSideProps } from '@/pages/index';
import { Button, Divider, Link } from '@nextui-org/react';
import dayjs from 'dayjs';
import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { AbstractIntlMessages, useTranslations } from 'next-intl';

import { useUser } from '../auth';
import { Interest } from './Interest';
import { TopStories } from './top-stories';

interface HomeProps {
  messages: AbstractIntlMessages;
  moreArticles: IArticle[];
  topArticles: IArticle[];
  topicArticles: {
    articles: IArticle[];
    category: string;
  }[];
}

const MoreNewsAsync = dynamic(
  () => import('./more-news').then((mod) => mod.MoreNews),
  { ssr: true }
);

const YourTopicsAsync = dynamic(
  () => import('./your-topics').then((mod) => mod.YourTopics),
  { ssr: true }
);

function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations();
  const { user } = useUser();

  return (
    <main className='bg-content2 pb-5 pt-4'>
      <div className='container flex flex-col items-start gap-y-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-semibold'>{t('Home.title')}</h1>
            <div className='text-sm'>
              {dayjs(Date.now()).format('dddd, MMMM D')}
            </div>
          </div>
          <section className='flex items-start gap-4' id='top-stories'>
            <div className='flex flex-1 flex-col gap-8'>
              <TopStories articles={props.topArticles} />
            </div>
            <div className='flex basis-4/12 flex-col rounded-2xl bg-content1 p-4'>
              <h3>
                <Link
                  as={NextLink}
                  className='text-xl'
                  color='secondary'
                  href='/topics/headlines'
                >
                  {t('Home.recommendations.title')}
                </Link>
              </h3>
              <Divider className='my-4' />
              {user ? (
                <>hi</>
              ) : (
                <>
                  <p className='text-sm'>
                    {t('Home.recommendations.description')}
                  </p>
                  <Button
                    as={NextLink}
                    className='mt-3'
                    color='primary'
                    href='/signup'
                  >
                    {t('Common.cta.signIn')}
                  </Button>
                </>
              )}
            </div>
          </section>
        </div>
        <MoreNewsAsync articles={props.moreArticles} />
        <YourTopicsAsync articles={props.topicArticles} />
        <Interest />
      </div>
    </main>
  );
}

export type { HomeProps };
export default Home;
