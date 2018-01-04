// eslint-disable-next-line import/no-named-as-default
// import StandardArticle from '../components/StandardArticle/StandardArticle';
// import ArticleBody from '../components/ArticleBody/ArticleBody';
// import Embed from '../components/Embed/Embed';
// import Paragraph from '../components/Paragraph/Paragraph';

const inputTemplateToComponent = new Map([
  [ 'com.htz.StandardArticle', 'StandardArticle', ],
  [ 'com.tm.listElement', 'List', ],
  [ 'p', 'Paragraph', ],
  [ 'a', 'Paragraph', ],
  [ 'com.tm.Image', 'Image', ],
  [ 'embedElement', 'Embed', ],
  [ null, null, ],
]);
export default inputTemplate => inputTemplateToComponent.get(inputTemplate);
