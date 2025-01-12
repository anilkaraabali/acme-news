interface IArticle {
  author: null | string;
  description: string;
  publishedAt: string;
  source: {
    id: null | string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: null | string;
}

export type { IArticle };
