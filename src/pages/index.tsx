import type { GetServerSideProps } from 'next';

import { siteConfig } from '@/config/site';
import { USER_CATEGORIES_COOKIE_KEY } from '@/features/auth';
import { HomeProps } from '@/features/home';
import { articleFetcher } from '@/server/article';
import {
  NewsApiResponse,
  newsApiMapper,
} from '@/server/article/news-api.mapper';
import { promiseAllSettled } from '@/utils';
import cookie from 'cookie';
import { pick } from 'radash';

const TOPICS_DISPLAY_CAP = 6;

export const getServerSideProps = (async (ctx) => {
  const locale =
    ctx.locale !== undefined && ctx.locale !== 'en' ? ctx.locale : 'en';

  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const topics = cookies[USER_CATEGORIES_COOKIE_KEY]
    ? JSON.parse(cookies[USER_CATEGORIES_COOKIE_KEY]).slice(
        0,
        TOPICS_DISPLAY_CAP
      )
    : siteConfig.navItems.categories
        .map((category) => category.translationKey)
        .slice(0, TOPICS_DISPLAY_CAP);

  const [topArticlesResult, moreArticlesResult, messages] =
    await promiseAllSettled([
      articleFetcher({
        mapper: (data: NewsApiResponse) => newsApiMapper(data, 10),
        origin: process.env.NEXT_PUBLIC_NEWS_API_ORIGIN as string,
        query: {
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
          country: ctx.locale === 'en' ? 'us' : locale,
          pageSize: '20',
        },
        url: '/top-headlines',
      }),
      articleFetcher({
        mapper: (data: NewsApiResponse) => newsApiMapper(data, 6),
        origin: process.env.NEXT_PUBLIC_NEWS_API_ORIGIN as string,
        query: {
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
          pageSize: '10',
          q: 'latest updates',
        },
        url: '/everything',
      }),
      pick((await import(`messages/${ctx.locale}.json`)).default, [
        'Common',
        'Home',
        'Auth',
      ]),
    ]);

  const topicArticles: HomeProps['topicArticles'] = [];

  if (topics.length) {
    try {
      const results = await Promise.all(
        topics.map((topic: string) =>
          articleFetcher({
            mapper: (data: NewsApiResponse) => newsApiMapper(data, 3),
            origin: process.env.NEXT_PUBLIC_NEWS_API_ORIGIN as string,
            query: {
              apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY as string,
              pageSize: '10',
              q: topic,
            },
            url: '/everything',
          })
        )
      );

      results.forEach((result, index) => {
        if (result.data) {
          topicArticles.push({
            articles: result.data,
            category: topics[index],
          });
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error fetching topic articles:`, error);
    }
  }

  return {
    props: {
      messages,
      moreArticles: moreArticlesResult.ok ? moreArticlesResult.data : [],
      topArticles: topArticlesResult.ok ? topArticlesResult.data : [],
      topicArticles,
    },
  };
}) satisfies GetServerSideProps<HomeProps>;

export { default } from '@/features/home';
