import { FC, useMemo } from 'react';

import { ArticleGrid } from './grid';
import { IArticle } from './types';

interface ArticleGridWrapperProps {
  articles: IArticle[];
}

const ArticleGridWrapper: FC<ArticleGridWrapperProps> = ({ articles }) => {
  const groupedArticles = useMemo(() => {
    const groups = [];

    for (let i = 0; i < articles.length; i += 11) {
      groups.push(articles.slice(i, i + 11));
    }

    return groups;
  }, [articles]);

  return (
    <div className='w-full'>
      {groupedArticles.map((group, index) => (
        <div className='mb-4' key={index}>
          <ArticleGrid articles={group} key={index} />
        </div>
      ))}
    </div>
  );
};

export type { ArticleGridWrapperProps };
export { ArticleGridWrapper };
