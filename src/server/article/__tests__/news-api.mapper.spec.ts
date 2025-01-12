import { newsApiResponseStub } from 'stubs';

import { newsApiMapper } from '../news-api.mapper';

describe('newsApiMapper', () => {
  it('should map the response to IArticle[]', () => {
    const result = newsApiMapper(newsApiResponseStub());

    expect(result).toMatchSnapshot();
  });

  it('should return an empty array if there are no articles', () => {
    const result = newsApiMapper(
      newsApiResponseStub({
        articles: [],
        totalResults: 0,
      })
    );

    expect(result).toEqual([]);
  });

  it('should filter out articles with a title of [Removed]', () => {
    const result = newsApiMapper(
      newsApiResponseStub({
        articles: [
          {
            author: null,
            content: '[Removed]',
            description: '[Removed]',
            publishedAt: '2025-01-09T14:11:00Z',
            source: {
              id: null,
              name: '[Removed]',
            },
            title: '[Removed]',
            url: 'https://removed.com',
            urlToImage: null,
          },
        ],
      })
    );

    expect(result).toEqual([]);
  });

  it('should limit the number of articles returned based on the max parameter', () => {
    const result = newsApiMapper(newsApiResponseStub(), 1);

    expect(result).toHaveLength(1);
  });

  it('should return all articles if max is not provided', () => {
    const result = newsApiMapper(newsApiResponseStub());

    expect(result).toHaveLength(4);
  });
});
