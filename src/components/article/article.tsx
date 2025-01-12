import { Link, LinkProps } from '@nextui-org/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithRef, forwardRef, useState } from 'react';

import { IArticle } from './types';

dayjs.extend(relativeTime);

interface ArticleProps extends ComponentPropsWithRef<'article'> {
  article: IArticle;
  classNames?: {
    title?: string;
  };
  linkProps?: LinkProps;
  withImage?: boolean;
}

const Article = forwardRef<HTMLElement, ArticleProps>(
  (
    { article, children, classNames, linkProps, withImage = true, ...props },
    ref
  ) => {
    const t = useTranslations('Common');

    const [isLogoError, setIsLogoError] = useState(false);

    return (
      <article
        data-testid='article'
        ref={ref}
        {...props}
        className={clsx(
          'relative flex select-none flex-col justify-between gap-2',
          props.className
        )}
      >
        <a
          className='absolute inset-0'
          href={article.url}
          rel='noopener noreferrer'
          target='_blank'
          title={article.title}
        />
        <div className='flex flex-1 justify-between gap-4'>
          <div className='flex flex-col'>
            <div className='mb-1.5 flex gap-1'>
              {article.source.id && (
                <Image
                  alt={article.source.name}
                  data-testid='article-logo'
                  height={14}
                  onError={() => setIsLogoError(true)}
                  src={
                    isLogoError
                      ? '/images/logo-placeholder.png'
                      : `/logos/${article.source.id.toLowerCase()}.webp`
                  }
                  width={14}
                />
              )}
              <div className='text-xs'>{article.source.name}</div>
            </div>
            <h2 className={classNames?.title} data-testid='article-title'>
              <Link
                className='relative z-[1]'
                color='foreground'
                data-testid='article-link'
                href={article.url}
                rel='noopener'
                target='_blank'
                title={article.title}
                underline='hover'
                {...linkProps}
              >
                <span className='line-clamp-3'>{article.title}</span>
              </Link>
            </h2>
          </div>
          {withImage && article.urlToImage && (
            <figure className='size-16 shrink-0'>
              <img
                alt={article.title}
                className='size-full rounded-xl object-cover'
                data-testid='article-image'
                src={article.urlToImage}
              />
            </figure>
          )}
        </div>
        <div className='flex items-center'>
          <time className='text-nowrap text-xs' dateTime={article.publishedAt}>
            {dayjs(article.publishedAt).fromNow()}
          </time>
          {article.author && (
            <>
              <hr className='mx-1 size-[3px] rounded-[1.5px] border-t-0 bg-foreground' />
              <div
                className='line-clamp-1 text-xs font-semibold'
                data-testid='article-author'
              >
                {t('article.author', { author: article.author })}
              </div>
            </>
          )}
        </div>
        {children}
      </article>
    );
  }
);

export type { ArticleProps };
export { Article };
