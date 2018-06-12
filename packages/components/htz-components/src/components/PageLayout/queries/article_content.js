import gql from 'graphql-tag';

export default gql`
  query ArticleContent($path: String!) {
    page(path: $path) {
      pageType
      breadcrumbs: lineage {
        pathSegment
        contentId
        name
        url
      }
      seoData {
        metaTitle
        metaDescription
        metaKeywords
        canonicalUrl
        ogTitle
        ogImage {
          viewMode
          accessibility
          title
          credit
          aspects
          isAnimated
          contentId
          imgArray {
            imgName
            version
          }
          imageType
          contentName
        }
        ogDescription
      }
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
              contentId
              contentName
              inputTemplate
              data {
                authors {
                  ... on CreditObject {
                    name
                  }
                  ... on AuthorObject {
                    image {
                      viewMode
                      accessibility
                      title
                      credit
                      aspects
                      isAnimated
                      contentId
                      imgArray {
                        imgName
                        version
                      }
                      imageType
                      contentName
                    }
                    contentId
                    contentName
                    authorType
                    email
                    facebook
                    gplus
                    hasEmailAlerts
                    hasPushAlerts
                    inputTemplate
                    twitter
                    url
                  }
                }
                image {
                  viewMode
                  accessibility
                  title
                  credit
                  aspects
                  isAnimated
                  contentId
                  imgArray {
                    imgName
                    version
                  }
                  imageType
                  contentName
                }
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
            }
            ... on ArticleData {
              inputTemplate
              commentsElementId
              body {
                ... on Embed {
                  input: content
                  caption
                  credit
                  embedType
                  elementType
                  contentId
                  contentName
                  inputTemplate
                  settings
                }
                ... on HtmlElement {
                  code
                  hideOnSite
                  contentId
                  contentName
                  inputTemplate
                }
                ... on Image {
                  inputTemplate
                  viewMode
                  accessibility
                  title
                  credit
                  aspects
                  isAnimated
                  contentId
                  imgArray {
                    imgName
                    version
                  }
                  imageType
                  contentName
                }
                ... on ImageGallery {
                  images {
                    viewMode
                    accessibility
                    title
                    credit
                    aspects
                    isAnimated
                    contentId
                    imgArray {
                      imgName
                      version
                    }
                    imageType
                    contentName
                  }
                  accessibility
                  name
                  showTitle
                  contentId
                  contentName
                  inputTemplate
                }
                ... on Interactive {
                  elementType
                  contentId
                  contentName
                  inputTemplate
                  properties
                }
                ... on Paragraph {
                  attributes {
                    key
                    value
                  }
                  tag
                  content
                }
                ... on RelatedArticles {
                  elementType
                  articles {
                    title
                    path
                  }
                }
                ... on seriesOrBlockArticles {
                  elementType
                  seriesTitle
                  itemsPerPage
                  usePagination
                  sort
                  contentId
                  contentName
                  inputTemplate
                  articles {
                    title
                    path
                  }
                }
                ... on Quote {
                  text
                  credit
                  afterParagraph
                  imagesList {
                    viewMode
                    accessibility
                    title
                    credit
                    aspects
                    isAnimated
                    contentId
                    imgArray {
                      imgName
                      version
                    }
                    imageType
                    contentName
                  }
                  contentId
                  contentName
                  inputTemplate
                }
                ... on Tags {
                  elementType
                  tagsList {
                    url
                    inputTemplate
                    contentName
                    contentId
                  }
                }
                ... on Video {
                  videoType
                  title
                  credit
                  contentId
                  videoContent
                  inputTemplate
                }
              }
            }
          }
        }
      }
    }
  }
`;
