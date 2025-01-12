import { IArticle } from '@/components/article/types';

interface NewsApiResponse {
  articles: Array<{
    author: null | string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
      id: null | string;
      name: string;
    };
    title: string;
    url: string;
    urlToImage: null | string;
  }>;
  status: string;
  totalResults: number;
}

const newsApiMapper = (data: NewsApiResponse, max?: number): IArticle[] => {
  const activeArticles = data.articles.filter(
    (article) => article.title !== '[Removed]'
  );

  return activeArticles
    .map((article) => ({
      author: article.author,
      description: article.description,
      publishedAt: article.publishedAt,
      source: article.source,
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
    }))
    .slice(0, max ?? activeArticles.length);
};

export type { NewsApiResponse };
export { newsApiMapper };
