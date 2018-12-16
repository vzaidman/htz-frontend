import { GraphQLUnionType, } from 'graphql';
import getSchema from '../getSchema';
import image from './image_type';
import embed from './embed_type';
import imageGallery from './image_gallery_type';

const Media = new GraphQLUnionType({
  name: 'Media',
  types: [ image, embed, imageGallery, ],
  resolveType: value => getSchema(value.kind || value.inputTemplate),
});
export default Media;
