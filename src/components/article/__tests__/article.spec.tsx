import { withIntl } from '@/utils';
import { render, screen } from '@testing-library/react';
import { articleStub } from 'stubs';

import { Article, ArticleProps } from '../article';

describe('Article', () => {
  const renderWithIntl = (props: Partial<ArticleProps> = {}) => {
    const Wrapper = withIntl();

    return render(
      <Wrapper>
        <Article article={articleStub()} {...props} />
      </Wrapper>
    );
  };

  it('renders the article title', () => {
    renderWithIntl();

    expect(screen.getByTestId('article-title')).toBeInTheDocument();
  });

  it('does not render the source logo when not provided', () => {
    renderWithIntl({
      article: articleStub({
        source: {
          id: null,
          name: 'The Washington Post',
        },
      }),
    });

    expect(screen.queryByTestId('article-logo')).not.toBeInTheDocument();
  });

  it('does not render the author when not provided', () => {
    renderWithIntl({
      article: articleStub({
        author: null,
      }),
    });

    expect(screen.queryByTestId('article-author')).not.toBeInTheDocument();
  });

  it('does not render the image when withImage is false', () => {
    renderWithIntl({
      withImage: false,
    });

    expect(screen.queryByTestId('author-image')).not.toBeInTheDocument();
  });

  it('renders children content when passed', () => {
    renderWithIntl({
      children: <div>Additional Content</div>,
      withImage: false,
    });

    expect(screen.getByText('Additional Content')).toBeInTheDocument();
  });
});
