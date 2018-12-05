import isNextLink, { getArticlePageTypeFromUrl, } from '../isNextLink';

const testUrls = [
  [ '/blogs/netalexander/1.6224763', true, ],
  [ 'http://guyk.haaretz.co.il/1.6224763', true, ],
  [ 'http://docker.themarker.com:2000/graphql', false, ],
  [ 'http://docker.haaretz.co.il:2000/news/science/.premium-1.6224758', true, ],
  [ 'http://docker.themarker.com:2000/news/science/.premium-1.6224758', false, ],
  [ 'haaretz.co.il/gallery/cinema/.premium-1.6224424', false, ],
  [ '/promotions-page/thankYou', true, ],
  [ { pathname: '/promotions-page/thankYou', }, true, ],
  [ undefined, false, ],
  [ null, false, ],
  [ '', false, ],
  [ {}, false, ],
  [ { pathname: '', }, false, ],
  [ { pathname: undefined, }, false, ],
  [ '/gallery/cinema/jerusalemfilmfestival/1.6223927', true, ],
  [ 'https://www.haaretz.co.il/', false, ],
  [ 'https://www.haaretz.co.il/?=&ts=_1530525007714', false, ],
  [ 'https://www.haaretz.co.il/misc/breaking-news', false, ],
  [ 'https://www.haaretz.co.il/news/world/asia/1.6224822', true, ],
  [ 'http://www.haaretz.co.il/sport/world-cup', false, ],
  [ 'https://www.haaretz.co.il:8080/travel?key1=value1&key2=value3&key3#shebangs', false, ],
  [ 'https://www.haaretz.co.il/kids/summer', false, ],
  [ '/digital/podcast/.premium-1.6216982', true, ],
  [ '/personal-area/haaretz-sheli', false, ],
  [ '/misc/LOGIN-PAGE?referer=/personal-area/haaretz-sheli', false, ],
  [ ':3000/news/world/europe/1.6224243', true, ],
  [ '/opinions/.premium-1.6224205', true, ],
  [ '/food/street-food-review/.premium-REVIEW-1.6224682', true, ],
  [ '/food/street-food-review/.premium-REVIEW-1.6180432', true, ],
  [ '/food/recipes/RECIPE-1.2898991', true, ],
  [ '/personal-area/my-account', false, ],
  [ '/misc/search-results?text=sads&searchType=textSearch', false, ],
  [ '/sport/world-cup/.premium-1.6224681', true, ],
  [ '/literature/closeoneeye/.premium-1.6212949', true, ],
  [ '/misc/writers/1.681414', false, ],
  [ '/sport/magazine', false, ],
  [ '/sport/nba?123123', false, ],
  [ '/realestate/MAGAZINE-1.5958669', true, ],
  [ 'https://www.themarker.com/', false, ],
  [ 'https://www.haaretz.co.il/realestate/1.6193372', true, ],
  [ 'https://www.themarker.com/realestate/1.6193372', false, ],
  [ 'https://www.themarker.com/personal-area/personal-page', false, ],
  [ 'https://www.themarker.com', false, ],
  [ 'https://www.themarker.com/realestate/MAGAZINE-1.5958669', false, ],
  [ 'https://www.themarker.com/realestate/REVIEW-1.5958669', false, ],
  [ 'https://www.themarker.com/realestate/TAG-1.5958669', false, ],
  [ 'https://www.themarker.com/misc/tags/WRITER-1.5958669', false, ],
  [ 'https://www.themarker.com/news/world/CAREER-1.5958669', false, ],
  [ 'https://www.themarker.com/realestate/BLOG-1.5958669', false, ],
  [ 'https://www.themarker.com/realestate/LIVE-1.5958669', false, ],
  [ 'https://www.themarker.com/realestate/INTERACTIVE-1.5958669', false, ],
  [ 'https://www.haaretz.co.il/realestate/1.6180672', true, ],
  [ 'https://www.themarker.com/realestate/1.6180672', false, ],
  [ 'https://www.haaretz.co.il/consumer/tourism/.premium-1.6204468', true, ],
  [ 'https://www.themarker.com/consumer/tourism/.premium-1.6204468', false, ],
  [ 'https://www.haaretz.co.il/technation/1.6224269', true, ],
  [ 'https://www.themarker.com/technation/1.6224269', false, ],
  [ 'https://www.haaretz.co.il/technation/1.6224344', true, ],
  [ 'https://www.themarker.com/technation/1.6224344', false, ],
  [ 'https://www.haaretz.co.il/consumer/tourism/1.6224976', true, ],
  [ 'https://www.themarker.com/consumer/tourism/1.6224976', false, ],
  [ 'https://www.haaretz.co.il/gallery/cinema/.premium-1.6224424', true, ],
  [ 'https://www.haaretz.co.il/literature/closeoneeye/.premium-1.6212949', true, ],
  [ 'https://www.haaretz.co.il/blogs/netalexander/1.6224763', true, ],
  [ 'https://www.haaretz.co.il/sport/world-cup/.premium-1.6224681', true, ],
  [ 'https://www.haaretz.co.il/sport/world-cup/.premium-1.6224681#article-comments', true, ],
  [ 'https://www.haaretz.co.il/gallery', false, ],
  [ 'https://www.haaretz.co.il/gallery/1.6224615', true, ],
  [ 'https://www.haaretz.co.il/gallery/television/.premium-1.6224625', true, ],
  [ 'https://promotions.haaretz.co.il/promotions-page/product', true, ],
  [ 'https://promotions.haaretz.co.il/promotions-page/price', true, ],
  [ 'https://promotions.haaretz.co.il/promotions-page/login', true, ],
  [ 'https://promotions.haaretz.co.il/promotions-page/thankYou', true, ],
  [ 'https://promotions.haaretz.co.il/promotions-page/method', true, ],
  [ '/promotions-page/product', true, ],
  [ '/promotions-page/price', true, ],
  [ '/promotions-page/login', true, ],
  [ '/promotions-page/thankYou', true, ],
  [ '/promotions-page/method', true, ],
  [ 'http://example.com/%E5%BC%95%E3%81%8D%E5%89%B2%E3%82%8A.html', false, ],
  [ 'http://example.com/引き割り.html', false, ],
  [ 'http://xn--fsqu00a.xn--3lr804guic/', false, ],
  [ 'https://www.mako.co.il/nexter-weekend/Article-af51e7f5bc94361006.htm', false, ],
];

describe('isNextLink', () => {
  // describe('single test urls', () => {
  //   const urlTest = testUrls[0];
  //   it(`isNextLink ${urlTest[0]} should classify correctly`, () => {
  //     expect(isNextLink(urlTest[0])).toEqual(urlTest[1]);
  //   });
  // });
  describe('test urls', () => {
    testUrls.forEach(urlTest => {
      const modifiedIt = urlTest[2] === 'only' ? it.only : it;
      modifiedIt(`isNextLink ${urlTest[0]} should classify correctly`, () => {
        expect(isNextLink(urlTest[0], 'haaretz.co.il')).toEqual(urlTest[1]);
      });
    });
  });
});

const articleURLs = [
  [ '/blogs/netalexander/BLOG-1.6224763', 'blogArticle', ],
  [ 'http://guyk.haaretz.co.il/1.6224763', 'standardArticle', ],
  [ 'http://docker.themarker.com:2000/news/science/.premium-1.6224758', 'standardArticle', ],
  [ 'haaretz.co.il/gallery/cinema/.premium-1.6224424', 'standardArticle', ],
  [ '/gallery/cinema/jerusalemfilmfestival/1.6223927', 'standardArticle', ],
  [
    '/gallery/cinema/jerusalemfilmfestival/MAGAZINE-1.6223927?this=that&foo#barr',
    'magazineArticle',
  ],
  [ 'https://www.haaretz.co.il/news/world/asia/ext-RECIPE-1.6224822', 'recipeArticle', ],
  [ '/digital/podcast/.premium-1.6216982', 'standardArticle', ],
  [ '/news/world/europe/REVIEW-1.6224243', 'reviewArticle', ],
  [ '/opinions/.premium-CARD-1.6224205', 'cardArticle', ],
  [ '/food/street-food-review/.premium-REVIEW-1.6224682', 'reviewArticle', ],
  [ '/food/street-food-review/.premium-INTERACTIVE-1.6180432', 'interactiveArticle', ],
  [ '/sport/world-cup/.premium-LIVE-1.6224681', 'liveArticle', ],
  [ '/sport/world-cup/.premium-CAREER-1.6224681', 'careerArticle', ],
];

describe('getArticlePageTypeFromUrl', () => {
  articleURLs.forEach(urlTest => {
    const modifiedIt = urlTest[2] === 'only' ? it.only : it;
    modifiedIt(`correctly return article page type ${urlTest[1]} from ${urlTest[0]}`, () => {
      expect(getArticlePageTypeFromUrl(urlTest[0])).toEqual(urlTest[1]);
    });
  });
});
