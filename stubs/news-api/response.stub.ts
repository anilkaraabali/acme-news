import { NewsApiResponse } from '@/server/article/news-api.mapper';

const newsApiResponseStub = (
  response: Partial<NewsApiResponse> = {}
): NewsApiResponse => ({
  articles: [
    {
      author: null,
      content:
        'Spanish coastguards rescued a baby that was born on an inflatable vessel carrying migrants to the Canary Islands, authorities said on Wednesday.\r\nThe newborn was recovered safely along with their mot… [+2206 chars]',
      description:
        '"Christmas ended in the Canaries with the rescue of a baby born while crossing the sea," the coastguard said.',
      publishedAt: '2025-01-09T14:34:59Z',
      source: {
        id: 'cbs-news',
        name: 'CBS News',
      },
      title:
        "Dramatic photo shows rescue of baby girl born at sea on migrant ship off Spain's Canary Islands - CBS News",
      url: 'https://www.cbsnews.com/news/photo-rescue-baby-born-sea-migrant-ship-canary-islands/',
      urlToImage:
        'https://assets2.cbsnewsstatic.com/hub/i/r/2025/01/09/41ef36c5-a02e-4ff0-bd9d-780211ed8432/thumbnail/1200x630/90f0723b34e30280351504af520cf963/2025-01-08t152821z-1474416418-rc2q5ca6jrll-rtrmadp-3-migration-spain-baby.jpg?v=6ffea931a1e284729a23a55e2e39c4e9',
    },
    {
      author: 'Tami Luhby',
      content:
        'Elon Musk has walked back his previous claim that he could cut at least $2 trillion from the federal budget, saying Wednesday that half that amount would be an epic outcome.\r\nMusk, who has been taske… [+2842 chars]',
      description:
        'Elon Musk walked back his previous claim that he could cut at least $2 trillion from the federal budget, saying Wednesday that half that amount would be “an epic outcome.”',
      publishedAt: '2025-01-09T14:13:00Z',
      source: {
        id: 'cnn',
        name: 'CNN',
      },
      title:
        'Elon Musk now has a new, lower target number for DOGE’s budget cuts - CNN',
      url: 'https://www.cnn.com/2025/01/09/politics/elon-musk-backtracks-federal-budget-cuts/index.html',
      urlToImage:
        'https://media.cnn.com/api/v1/images/stellar/prod/2024-05-07t012426z-1755337355-rc2cl7a6o2f4-rtrmadp-3-milken-conference.JPG?c=16x9&q=w_800,c_fill',
    },
    {
      author: 'Lee Harris',
      content:
        'FT newspaper delivered Monday-Saturday, plus FT Digital Edition delivered to your device Monday-Saturday.\r\n<ul><li></li>Weekday Print Edition<li></li>FT Weekend<li></li>FT Digital Edition<li>Global n… [+105 chars]',
      description:
        'High values of homes and businesses in Pacific Palisades put analysts’ expected losses in the billions',
      publishedAt: '2025-01-09T14:12:24Z',
      source: {
        id: null,
        name: 'Financial Times',
      },
      title:
        'Insurers brace for up to $10bn losses from California wildfires - Financial Times',
      url: 'https://www.ft.com/content/db2cfe84-74e7-4c94-bab4-f2ef51564b84',
      urlToImage:
        'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F517cde34-2e5a-4660-9833-0b59b67b3f8b.jpg?source=next-barrier-page',
    },
    {
      author: 'Madeline Wells',
      content:
        'On Friday, a warning from the U.S. surgeon general shook the alcoholic beverage industry. Alcohol is a well-established, preventable cause of cancer, and alcoholic beverages should therefore carry a … [+6139 chars]',
      description:
        "Bars like San Francisco's Trick Dog and ABV and nonalcoholic spots like Ocean Beach Cafe react to the surgeon general's advisory.",
      publishedAt: '2025-01-09T12:10:32Z',
      source: {
        id: null,
        name: 'SFGate',
      },
      title:
        "'A sea change': Surgeon general's alcohol warning could transform SF bars - SFGATE",
      url: 'https://www.sfgate.com/food/article/surgeon-general-alcohol-cancer-sf-bars-20022978.php',
      urlToImage:
        'https://s.hdnux.com/photos/01/46/46/15/26895188/3/rawImage.jpg',
    },
  ],
  status: 'ok',
  totalResults: 34,
  ...response,
});

export { newsApiResponseStub };
