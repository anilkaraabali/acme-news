import { Article, FeaturedArticle } from '@/components/article';
import { IArticle } from '@/components/article/types';
import { Divider } from '@nextui-org/react';
import clsx from 'clsx';
import { ComponentPropsWithRef, Fragment, ReactNode, forwardRef } from 'react';

interface ArticleGridProps extends ComponentPropsWithRef<'section'> {
  articles: IArticle[];
  slots?: {
    title: ReactNode;
  };
}

const ArticleGrid = forwardRef<HTMLElement, ArticleGridProps>(
  ({ articles, slots, ...rest }, ref) => {
    const firstSectionArticles = articles.slice(0, 4);
    const secondSectionArticles = articles.slice(4, 8);
    const remainingArticles = articles.slice(8);

    return (
      <section ref={ref} {...rest} className={clsx('w-full', rest.className)}>
        <div className='flex flex-col rounded-2xl bg-content1 p-4'>
          {slots?.title}
          {!!firstSectionArticles.length && (
            <div className='flex gap-6'>
              <FeaturedArticle
                article={firstSectionArticles[0]}
                className='w-[280px]'
              />
              <div className='flex flex-1 flex-col gap-4'>
                {firstSectionArticles.slice(1).map((article, index) => (
                  <Article
                    article={article}
                    key={index}
                    linkProps={{
                      size: 'sm',
                    }}
                    withImage={false}
                  />
                ))}
              </div>
            </div>
          )}
          {!!secondSectionArticles.length && (
            <>
              <Divider className='my-4' />
              <div className='flex gap-6'>
                <FeaturedArticle
                  article={secondSectionArticles[0]}
                  className='w-[280px]'
                />
                <div className='flex flex-1 flex-col gap-4'>
                  {secondSectionArticles.slice(1).map((article, index) => (
                    <Article
                      article={article}
                      key={index}
                      linkProps={{
                        size: 'sm',
                      }}
                      withImage={false}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {!!remainingArticles.length &&
            remainingArticles.map((article, index) => (
              <Fragment key={index}>
                <Divider className='my-4' />
                <Article
                  article={article}
                  key={index}
                  linkProps={{
                    size: 'lg',
                  }}
                />
              </Fragment>
            ))}
        </div>
      </section>
    );
  }
);

export type { ArticleGridProps };
export { ArticleGrid };
