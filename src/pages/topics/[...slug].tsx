import type { GetServerSideProps } from 'next';

import { TopicsProps } from '@/features/topics';
import { articleFetcher } from '@/server/article';
import { newsApiMapper } from '@/server/article/news-api.mapper';
import { promiseAllSettled } from '@/utils';
import { pick } from 'radash';

export const getServerSideProps = (async (ctx) => {
  const slug = ctx.params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const [searchResult, messages] = await promiseAllSettled([
    articleFetcher({
      mapper: newsApiMapper,
      origin: process.env.NEXT_PUBLIC_NEWS_API_ORIGIN as string,
      query: {
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
        pageSize: '20',
        q: slug[0],
      },
      url: '/everything',
    }),
    pick((await import(`messages/${ctx.locale}.json`)).default, [
      'Common',
      'Home',
      'Auth',
    ]),
  ]);

  return {
    props: {
      messages,
      searchResult: searchResult.ok ? searchResult.data : [],
      slug: slug[0],
    },
  };
}) satisfies GetServerSideProps<TopicsProps>;

export { default } from '@/features/topics';
