/* global fetch, Headers */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
// import { Query, } from 'react-apollo';
// import PropTypes from 'prop-types';
// import { parseComponentProp, } from '@haaretz/htz-css-tools';

// import ActionButtons from '../ActionButtons/ActionButtons';
// import ArticleBody from '../ArticleBody/ArticleBody';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
// import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
// import HeadlineElement from '../HeadlineElement/HeadlineElement';
import RecipeRating from './RecepieRating';
import Ingredients from './Ingredients';
import LayoutRow from '../PageLayout/LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default

const propTypes = {};

const defaultProps = {};

// const Header = createComponent(headerStyle, ArticleHeader, props => Object.keys(props));

// const SharingTools = createComponent(sharingToolsStyle, ActionButtons, props => Object.keys(props));

// const Body = createComponent(bodyStyle, ArticleBody, props => Object.keys(props));

class Recipe extends React.Component {
  state = {};

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return (
  //       this.state.facebookCount !== nextState.facebookCount ||
  //       this.props !== nextProps
  //     );
  //   }

  //   componentDidUpdate() {
  //     this.updateArticleMeta();
  //   }

  //   getFacebookCount = () => {
  //     const accessToken =
  //       'EAABkq33GsqwBAMhelXM0V7xJQmgJ1sf0nvxZAyZBZAtStCyZC6Is1m1OgnsL1Jxsw6BJx0zaZA1TOZBrZAYVMiNNEqLwb4ZARsYUZCEKZAG6r4Wnuminzgi41WQUZCCKvpdhjuHKgh1s3R3fWKjZA4rXvYEoHxgWRSzvFrRMkALfoQUAVwZDZD';
  //     const url = `https://graph.facebook.com/?fields=share&access_token=${accessToken}&id=${
  //       this.state.articleUrl
  //     }&format=json`;

  //     return fetch(url, {
  //       method: 'get',
  //       headers: new Headers({
  //         'content-type': 'application/json',
  //       }),
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw Error(response.statusText);
  //       })
  //       .then(data => this.setState({ facebookCount: data.share.share_count, }))
  //       .catch(error => console.log('error: ', error));
  //   };

  //   extractHeadline = () => {
  //     // creating a copy because arrays from apollo are sealed.
  //     const body = [ ...this.props.body, ];
  //     const element = body[0];
  //     const elementType = element.elementType || element.inputTemplate || null;
  //     if (mediaComponents.includes(elementType)) {
  //       body.shift();
  //       return { body, headlineElement: element, };
  //     }
  //     return { body, };
  //   };

  //   updateArticleMeta = () => {
  //     const { commentsElementId, contentId, setCommentsData, } = this.props;
  //     setCommentsData && setCommentsData(contentId, commentsElementId);
  //     this.getFacebookCount(this.state.articleUrl);
  //   };

  render() {
    // const {} = this.props;

    // const { body, headlineElement, } = this.extractHeadline();

    return (
      <FelaComponent
        render={({ theme, }) => (
          <Fragment>
            {/* <FelaComponent
              style={{
                marginInlineStart: '4rem',
                marginTop: '2rem',
                marginBottom: '3rem',
              }}
            >
              <Breadcrumbs steps={breadcrumbs} />
            </FelaComponent> */}
            <LayoutRow miscStyles={{ textAlign: 'center', }}>
              <LayoutContainer bgc="white">
                <ArticleHeader
                  authors={[
                    {
                      image: {
                        viewMode: 'FullColumnWithVerticalImage',
                        title: 'ארי שביט',
                        aspects: {
                          full: {
                            width: 300,
                            height: 201,
                          },
                        },
                        isAnimated: false,
                        imgArray: [
                          {
                            imgName: 'image/1590764374.png',
                            version: '1508848533',
                          },
                        ],
                        imageType: 'image',
                        inputTemplate: 'com.tm.Image',
                        contentId: '1.1474',
                        contentName: 'ארי שביט',
                      },
                      inputTemplate: 'com.tm.Author',
                      contentId: '1.1473',
                      contentName: 'ארי שביט',
                    },
                  ]}
                  kicker="מתכון"
                  publishDateTime={1451566482804}
                  subtitle="מנה מפנקת, עשירה בטעמים ויפהפייה אשר משאירה את האורח הטבעוני הממוצע עם תחושת סיפוק והנאה"
                  title="כיכר לחם שנאפתה בפויקה"
                />
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow miscStyles={{ marginTop: '6rem', }}>
              <LayoutContainer bgc="white">
                <RecipeRating />
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow miscStyles={{ marginTop: '6rem', }}>
              <LayoutContainer bgc="white">
                <Ingredients />
              </LayoutContainer>
            </LayoutRow>

            {/* <ActionButtons */}
            {/* articleTitle={title}
            articleUrl={this.state.articleUrl}
            buttons={{
              start: [
                {
                  name: 'facebookLogo',
                  buttonText: this.state.facebookCount,
                  iconStyles: {
                    color: theme.color('facebook'),
                  },
                },
                {
                  name: 'whatsapp',
                  iconStyles: {
                    color: theme.color('whatsapp'),
                  },
                },
                'mailAlert',
              ],
              end: [
                {
                  name: 'comments',
                  buttonText: 78,
                },
                'print',
                {
                  name: 'zen',
                  buttonText: 'קריאת זן',
                },
              ],
            }}
            globalButtonsStyles={{
              minWidth: '10rem',
            }}
            globalIconsStyles={{
              color: theme.color('primary'),
            }}
            size={2.5} */}
            {/* /> */}
            {/* {headlineElement && <HeadlineElement elementObj={headlineElement} />} */}
            {/* <ArticleBody body={body} /> */}
          </Fragment>
        )}
      />
    );
  }
}

Recipe.propTypes = propTypes;
Recipe.defaultProps = defaultProps;

export default Recipe;
