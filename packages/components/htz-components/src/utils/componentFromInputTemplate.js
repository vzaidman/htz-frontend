// eslint-disable-next-line import/no-named-as-default
// import StandardArticle from '../components/StandardArticle/StandardArticle';
// import ArticleBody from '../components/ArticleBody/ArticleBody';
import Embed from '../components/Embed/Embed';
import Paragraph from '../components/Paragraph/Paragraph';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';

const inputTemplateToComponent = new Map([
  [ 'com.htz.StandardArticle', 'StandardArticle', ],
  [ 'com.tm.listElement', 'List', ],
  [ 'p', Paragraph, ],
  [ 'h4', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'com.tm.Image', () => (<p>Image</p>), ],
  [ 'embedElement', Embed, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],
  [ null, null, ],
]);
export default inputTemplate => inputTemplateToComponent.get(inputTemplate);
