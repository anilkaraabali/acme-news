import { Link, LinkProps } from '@nextui-org/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithRef, forwardRef, useState } from 'react';

import { IArticle } from './types';

dayjs.extend(relativeTime);

interface FeaturedArticleProps extends ComponentPropsWithRef<'article'> {
  article: IArticle;
  linkProps?: LinkProps;
}

const FeaturedArticle = forwardRef<HTMLElement, FeaturedArticleProps>(
  ({ article, linkProps, ...props }, ref) => {
    const t = useTranslations('Common');

    const [isLogoError, setIsLogoError] = useState(false);

    return (
      <article
        ref={ref}
        {...props}
        className={clsx('relative flex select-none', props.className)}
      >
        <a
          className='absolute inset-0'
          href={article.url}
          rel='noopener noreferrer'
          target='_blank'
          title={article.title}
        />
        <div className='flex flex-col'>
          {article.urlToImage && (
            <img
              alt={article.title}
              className='mb-2 h-[168px] w-[280px] rounded-2xl'
              src={article.urlToImage}
            />
          )}
          <div className='mb-1.5 flex items-center gap-1'>
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
          <h2 className='text-xl'>
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
          <div className='mt-1 flex items-center'>
            <time
              className='text-nowrap text-xs'
              dateTime={article.publishedAt}
            >
              {dayjs(article.publishedAt).fromNow()}
            </time>
            {article.author && (
              <>
                <hr className='mx-1 size-[3px] rounded-[1.5px] border-t-0 bg-foreground' />
                <div className='line-clamp-1 text-xs font-semibold'>
                  {t('article.author', { author: article.author })}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }
);

export type { FeaturedArticleProps };
export { FeaturedArticle };
