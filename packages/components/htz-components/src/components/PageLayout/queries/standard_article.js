import gql from 'graphql-tag';
import {
  author,
  articleHeader,
  changeableElementGroup,
  content,
  dfpBanner,
  elementGroup,
  embed,
  headlineElement,
  htmlElement,
  image,
  imageGallery,
  interactive,
  link,
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
          aside {
            ... on ChangeableElementGroup {
              ...ChangeableElementGroup
            }
          }
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
              # GuyK, todo: when papi exports full authors, remove query here and get authors only from article header element
              authors {
                ... on CreditObject {
                  ...CreditObj
                }
                ... on AuthorObject {
                  ...AuthorObj
                }
              }
              # GuyK, todo: papi should export reportingFrom in header element
              reportingFrom
              inputTemplate
              commentsElementId
              headlineElement {
                ...HeadlineElement
              }
              body {
                ... on Content {
                  ...Content
                }
                ... on DfpBanner {
                  ...DfpBanner
                }
                ... on ElementGroup {
                  ...ElementGroup
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
                ... on Link {
                  ...Link
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
  ${author.authorObj}
  ${author.creditObj}
  ${articleHeader}
  ${changeableElementGroup}
  ${content}
  ${dfpBanner}
  ${elementGroup}
  ${embed}
  ${headlineElement}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${interactive}
  ${link}
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
