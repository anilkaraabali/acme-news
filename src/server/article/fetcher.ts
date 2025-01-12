import { IArticle } from '@/components/article/types';
import { dash } from 'radash';

type Result =
  | {
      data: IArticle[];
      ok: true;
    }
  | {
      data: null;
      ok: false;
    };

type ArticleFetcher = <T>({
  origin,
  query,
  requestInit,
  url,
}: {
  mapper?: (data: T) => IArticle[];
  origin: string;
  query?: Record<string, string>;
  requestInit?: RequestInit;
  url: string;
}) => Promise<Result>;

const articleFetcher: ArticleFetcher = async ({
  mapper,
  origin,
  query,
  requestInit,
  url,
}) => {
  let finalUrl = `${origin}${url}`;

  if (process.env.NEXT_PUBLIC_USE_LOCAL_DATA) {
    finalUrl += `${query?.q ? `/${dash(query.q)}` : ''}.json`;
  } else {
    finalUrl += `?${new URLSearchParams(query)}`;
  }

  if (process.env.TRACE) {
    // eslint-disable-next-line no-console
    console.info('fetch - articleFetcher', finalUrl);
  }

  try {
    const response = await fetch(finalUrl, requestInit);
    const data = await response.json();

    return {
      data: mapper ? mapper(data) : data,
      ok: true,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('fetch error - articleFetcher', err);

    return {
      data: null,
      ok: false,
    };
  }
};

export { articleFetcher };
