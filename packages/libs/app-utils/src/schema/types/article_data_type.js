// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import getSchema from '../getSchema';

import author from './author_type';
import articleBody from './article_body_type';
import date from './date_type';
import imageGallery from './image_gallery_type';
import htmlElement from './html_element_type';
import embed from './embed_type';
import image from './image_type';
import video from './video_type';

// recipe types
import socialMetaData from './social_meta_data_type';
import recipeInstructions from './recipe_instructions_type';
import recipeIngredients from './recipe_ingredients_type';

const ArticleData = new GraphQLObjectType({
  name: 'ArticleData',
  fields: () => ({
    header: {
      type: new GraphQLObjectType({
        name: 'ArticleHeader',
        fields: () => ({
          exclusive: { type: GraphQLString, },
          mobileExclusive: { type: GraphQLString, },
          mobileSubtitle: { type: GraphQLString, },
          mobileTitle: { type: GraphQLString, },
          modDate: { type: date, },
          pubDate: { type: date, },
          reportingFrom: { type: GraphQLString, },
          subtitle: { type: GraphQLString, },
          title: { type: GraphQLString, },
        }),
      }),
      resolve: parentValue => {
        const isMouseFirstElementImage = parentValue.inputTemplate === 'com.mouse.story.MouseStandardStory'
          && parentValue.body[0].inputTemplate === 'com.tm.Image';
        if (isMouseFirstElementImage) {
          // eslint-disable-next-line no-param-reassign
          parentValue.mainElement = parentValue.body.splice(0, 1)[0];
        }

        const {
          authors,
          commentsElementId,
          contentId,
          body,
          mainElement,
          contentName,
          inputTemplate,
          ...header
        } = parentValue;

        return header;
      },
    },
    mainElement: {
      type: new GraphQLUnionType({
        name: 'HeadlineElement',
        types: [ embed, htmlElement, image, imageGallery, video, ],
        resolveType: value => getSchema(value.elementType || value.inputTemplate),
      }),
    },
    bookCover: { type: image, },
    authors: { type: new GraphQLList(author), },
    body: { type: articleBody, },
    commentsElementId: { type: GraphQLID, },
    contentId: { type: GraphQLID, },
    contentName: { type: GraphQLString, },
    inputTemplate: { type: GraphQLString, },
    isPremiumContent: { type: GraphQLBoolean, },

    reviewStars: { type: GraphQLFloat, },
    // recipe article related
    socialMetaData: { type: socialMetaData, },
    instructions: { type: recipeInstructions, },
    ingredients: { type: recipeIngredients, },
    totalCookTime: { type: GraphQLString, },
    numOfServings: { type: GraphQLString, },
    recipeDifficultyLevel: { type: GraphQLString, },
    // review article related
    reviewType: { type: GraphQLString, },
    amenities: { type: new GraphQLList(GraphQLJSON), },
    magazineArticleViewType: { type: GraphQLString, },
    // Live blog related
    // liveblogItems: { type: new GraphQLList(GraphQLJSON), },
    liveblogItems: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'liveblogItems',
          fields: () => ({
            cardId: { type: GraphQLString, },
            title: { type: GraphQLString, },
            titleMobile: { type: GraphQLString, },
            keyEvent: { type: GraphQLString, },
            pubDate: { type: date, },
            body: { type: articleBody, },
            inputTemplate: { type: GraphQLString, },
            contentId: { type: GraphQLID, },
            contentName: { type: GraphQLString, },
          }),
        })
      ),
    },
    keyEvents: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'keyEvents',
          fields: () => ({
            cardId: { type: GraphQLString, },
            keyEvent: { type: GraphQLString, },
            pubDate: { type: date, },
          }),
        })
      ),
    },
    isLiveUpdate: { type: GraphQLBoolean, },
    isDisplayBlogitemsDatetime: { type: GraphQLBoolean, },
  }),
});

export default ArticleData;
