import gql from 'graphql-tag';
import {
  articleHeader,
  dfpBanner,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  paragraph,
  quote,
  relatedArticles,
  seoData,
  seriesOrBlockArticles,
  tags,
  video,
} from '@haaretz/app-utils';

export default gql`
  query ArticleContent($path: String!) {
    page(path: $path) {
      pageType
      ...PageSeoData
      slots {
        ... on StandardArticleSlots {
          aside
          article {
            ... on Content {
              inputTemplate
              contentId
              contentName
            }
            ... on ArticleHeader {
              ...ArticleHeader
            }
            ... on ArticleData {
              inputTemplate
              commentsElementId
              body {
                ... on DfpBanner {
                  ...DfpBanner
                }
                ... on Embed {
                  ...Embed
                }
                ... on HtmlElement {
                  ...HtmlElement
                }
                ... on Image {
                  ...Image
                }
                ... on ImageGallery {
                  ...ImageGallery
                }
                ... on Interactive {
                  ...Interactive
                }
                ... on Paragraph {
                  ...Paragraph
                }
                ... on RelatedArticles {
                  ...RelatedArticles
                }
                ... on SeriesOrBlockArticles {
                  ...SeriesOrBlockArticles
                }
                ... on Quote {
                  ...Quote
                }
                ... on Tags {
                  ...Tags
                }
                ... on Video {
                  ...Video
                }
              }
            }
          }
        }
      }
    }
  }
  ${articleHeader}
  ${dfpBanner}
  ${embed}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${interactive}
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
