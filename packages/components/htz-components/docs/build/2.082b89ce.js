(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1632:function(t,e,n){"use strict";n.r(e);var r=n(7),a=n.n(r),c=n(220);function _templateObject(){var t=_taggedTemplateLiteral(["\n  query FarnsworthQuery($listId: String!, $history: [ID]) {\n    list(listId: $listId, history: $history) {\n      title\n      items {\n        ... on TeaserInList {\n          ...TeaserForLeftElement\n        }\n      }\n    }\n  }\n  ","\n"]);return _templateObject=function _templateObject(){return t},t}function _taggedTemplateLiteral(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}e.default=a()(_templateObject(),c.b)},220:function(t,e,n){"use strict";var r=n(71),a=n(7),c=n.n(a),o=n(517);function _templateObject(){var t=Object(r.a)(["\n  fragment Paragraph on Paragraph {\n    attributes {\n      key\n      value\n    }\n    tag\n    content\n  }\n"]);return _templateObject=function _templateObject(){return t},t}var i=c()(_templateObject());function _templateObject2(){var t=Object(r.a)(["\n    fragment CreditObj on CreditObject {\n      name\n    }\n  "]);return _templateObject2=function _templateObject2(){return t},t}function author_templateObject(){var t=Object(r.a)(["\n    fragment AuthorObj on AuthorObject {\n      ...AuthorImage\n      contentId\n      contentName\n      authorType\n      email\n      biography {\n        ... on Paragraph {\n          ...Paragraph\n        }\n      }\n      facebook\n      gplus\n      hasEmailAlerts\n      hasPushAlerts\n      inputTemplate\n      twitter\n      url\n    }\n    ","\n    ","\n  "]);return author_templateObject=function _templateObject(){return t},t}var b={authorObj:c()(author_templateObject(),o.a,i),creditObj:c()(_templateObject2())};function _templateObject4(){var t=Object(r.a)(["\n  fragment Teaser on TeaserInList {\n    ...ImagesInTeaser\n    firstParagraph\n    publishDate\n    contentId\n    exclusiveMobile\n    title\n    commentsCount\n    path\n    subtitleMobile\n    isPremiumContent\n    lastUpdate\n    subTitle\n    mediaFlags {\n      video\n      html_embed\n      gallery\n    }\n    exclusive\n    titleMobile\n    hash\n    authors {\n      ... on CreditObject {\n        ...CreditObj\n      }\n      ... on AuthorObject {\n        ...AuthorObj\n      }\n    }\n    ...Image\n  }\n  ","\n  ","\n  ","\n  ","\n  ","\n"]);return _templateObject4=function _templateObject4(){return t},t}function _templateObject3(){var t=Object(r.a)(["\n  fragment TeaserForBender on TeaserInList {\n    ...ImagesInTeaser\n    contentId\n    title\n    path\n    titleMobile\n    hash\n    authors {\n      ... on CreditObject {\n        ...CreditObj\n      }\n      ... on AuthorObject {\n        ...AuthorObj\n      }\n    }\n  }\n  ","\n  ","\n  ","\n"]);return _templateObject3=function _templateObject3(){return t},t}function teaser_templateObject2(){var t=Object(r.a)(["\n  fragment TeaserForLeftElement on TeaserInList {\n    ...ImageInTeaser\n    contentId\n    title\n    path\n    titleMobile\n    hash\n  }\n  ","\n"]);return teaser_templateObject2=function _templateObject2(){return t},t}function teaser_templateObject(){var t=Object(r.a)(["\n  fragment TeaserForRelatedArticles on TeaserInList {\n    title\n    path\n    authors {\n      ... on CreditObject {\n        ...CreditObj\n      }\n      ... on AuthorObject {\n        ...AuthorObj\n      }\n    }\n  }\n  ","\n  ","\n"]);return teaser_templateObject=function _templateObject(){return t},t}n.d(e,"b",function(){return u}),n.d(e,"a",function(){return l});c()(teaser_templateObject(),b.authorObj,b.creditObj);var u=c()(teaser_templateObject2(),o.d),l=c()(_templateObject3(),b.authorObj,b.creditObj,o.e);c()(_templateObject4(),b.authorObj,b.creditObj,o.d,o.e,o.c)}}]);