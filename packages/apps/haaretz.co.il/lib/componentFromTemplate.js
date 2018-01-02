// eslint-disable-next-line import/no-named-as-default
import StandardArticle from '../components/StandardArticle/StandardArticle';
import Embed from '../components/Embed/Embed';

const inputTemplateToComponent = new Map([
  [ 'com.htz.StandardArticle', StandardArticle, ],
  [ 'com.tm.listElement', null, ],
  [ 'com.tm.Image', null, ],
  [ 'embedElement', Embed, ],
  [ null, null, ],
]);
export default inputTemplate => inputTemplateToComponent.get(inputTemplate);
