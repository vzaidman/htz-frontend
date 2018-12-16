import gql from 'graphql-tag';
import {
  author,
  changeableElementGroup,
  content,
  dfpBanner,
  elementGroup,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  link,
  mobileQuickRegistration,
  newsLetter,
  paragraph,
  quote,
  relatedArticles,
  seoData,
  breadcrumbs,
  seriesOrBlockArticles,
  tags,
  video,
} from '@haaretz/app-utils';

export default gql`
  query LiveBlogArticleContent($path: String!) {
    page(path: $path) {
      pageType
      ...PageSeoData
      ...PageBreadcrumbs
      slots {
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
          ... on ArticleData {
            header {
              exclusive
              mobileExclusive
              mobileSubtitle
              mobileTitle
              modDate
              pubDate
              reportingFrom
              subtitle
              title
            }
            headlineElement: mainElement {
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
              ... on Video {
                ...Video
              }
            }
            authors {
              ...Author
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
              ... on MobileQuickRegistration {
                ...MobileQuickRegistration
              }
              ... on NewsLetter {
                ...NewsLetter
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
            tags {
              url
              contentName
            }
            inputTemplate
            commentsElementId

            # Live blog related
            isLiveUpdate
            isDisplayBlogitemsDatetime
            keyEvents {
              cardId
              keyEvent
              pubDate
            }
            liveblogItems {
              cardId
              title
              titleMobile
              pubDate
              inputTemplate
              contentId
              contentName
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
                ... on MobileQuickRegistration {
                  ...MobileQuickRegistration
                }
                ... on NewsLetter {
                  ...NewsLetter
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
            #  End of Live blog related
          }
        }
      }
    }
  }
  ${author}
  ${changeableElementGroup}
  ${content}
  ${dfpBanner}
  ${elementGroup}
  ${embed}
  ${htmlElement}
  ${image}
  ${imageGallery}
  ${interactive}
  ${link}
  ${mobileQuickRegistration}
  ${newsLetter}
  ${paragraph}
  ${quote}
  ${relatedArticles}
  ${breadcrumbs}
  ${seoData}
  ${seriesOrBlockArticles}
  ${tags}
  ${video}
`;
