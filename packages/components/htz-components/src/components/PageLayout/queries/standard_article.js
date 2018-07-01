import gql from 'graphql-tag';
import {
  articleHeader,
  content,
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
  query StandardArticleContent($path: String!) {
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
              properties
            }
            ... on ArticleHeader {
              ...ArticleHeader
            }
            ... on ArticleData {
              inputTemplate
              commentsElementId
              body {
                ... on Content {
                  ...Content
                }
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
  ${content}
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
