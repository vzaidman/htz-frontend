/* global fetch, Headers */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
// import { Query, } from 'react-apollo';
// import PropTypes from 'prop-types';
// import { parseComponentProp, } from '@haaretz/htz-css-tools';

// import ActionButtons from '../ActionButtons/ActionButtons';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import ArticleBody from '../ArticleBody/ArticleBody';
import RecipeRating from './RecepieRating';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import LayoutRow from '../PageLayout/LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default
import Nibbler from '../Nibbler/Nibbler';
import Comments from '../CommentsSection/WrappedComments';
import SideBar from '../SideBar/SideBar';

import dummyBody from './dummyBody';
import dummyInstructionLists from './dummyInstructionLists';
import dummyIngredientLists from './dummyIngredientLists';

const propTypes = {};

const defaultProps = {};

class Recipe extends React.Component {
  state = {};

  render() {
    return (
      <FelaComponent
        render={({ theme, }) => (
          <Fragment>
            <LayoutRow bgc="white" miscStyles={{ textAlign: 'center', }}>
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
            <FelaComponent
              style={{ extend: theme.mq({ from: 'l', }, { display: 'flex', }), }}
            >
              <FelaComponent
                style={{
                  backgroundColor: theme.color('primary', '-6'),
                  extend: [
                    theme.mq({ until: 'l', }, { display: 'none', }),
                    theme.mq({ from: 'l', until: 'xl', }, { width: '26rem', }),
                    theme.mq({ from: 'xl', }, { width: '30rem', }),
                  ],
                }}
              >
                sdad
              </FelaComponent>
              <LayoutRow bgc="white">
                <LayoutContainer
                  bgc="white"
                  miscStyles={{ paddingTop: '6rem', }}
                >
                  <ArticleBody body={dummyBody} />
                  <FelaComponent
                    style={{
                      marginTop: '6rem',
                      extend: [ theme.mq({ from: 'l', }, { display: 'none', }), ],
                    }}
                  >
                    <RecipeRating />
                  </FelaComponent>
                  <FelaComponent style={{ marginTop: '6rem', }}>
                    <Instructions instructionLists={dummyInstructionLists} />
                  </FelaComponent>
                  <FelaComponent style={{ marginTop: '6rem', }}>
                    <Ingredients ingredientLists={dummyIngredientLists} />
                  </FelaComponent>
                </LayoutContainer>
              </LayoutRow>
              <FelaComponent
                style={{
                  position: 'relative',
                  extend: [
                    theme.mq({ until: 'l', }, { display: 'none', }),
                    theme.mq({ from: 'l', }, { width: '67rem', }),
                  ],
                }}
              >
                <FelaComponent
                  style={{
                    backgroundColor: 'red',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    top: '0',
                    left: '0',
                  }}
                >
                  <SideBar>
                    {[ 1, 2, 3, 4, 5, ].map(element => (
                      // const Element = getComponent(element.inputTemplate);
                      <div>{element}</div>
                      // <Element
                      //   key={element.contentId}
                      //   articleId={this.props.articleId}
                      //   {...element}
                      // />
                    ))}
                  </SideBar>
                </FelaComponent>
              </FelaComponent>
            </FelaComponent>
            <LayoutRow bgc="white">
              <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
                <Nibbler />
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow bgc="white">
              <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
                <Comments />
              </LayoutContainer>
            </LayoutRow>
          </Fragment>
        )}
      />
    );
  }
}

Recipe.propTypes = propTypes;
Recipe.defaultProps = defaultProps;

export default Recipe;
