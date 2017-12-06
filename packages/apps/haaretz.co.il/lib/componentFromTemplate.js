// eslint-disable-next-line import/no-named-as-default
import StandardArticle from '../components/StandardArticle/StandardArticle';
import List from '../components/List/List';
import Embed from '../components/Embed/Embed';

const itToComponent = new Map([
  [ 'com.htz.StandardArticle', StandardArticle, ],
  [ 'com.tm.listElement', List, ],
  [ 'com.tm.Image', null, ],
  [ 'embedElement', Embed, ],
]);
export default inputTemplate => itToComponent.get(inputTemplate);
