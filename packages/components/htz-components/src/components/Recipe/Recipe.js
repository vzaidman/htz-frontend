/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
// import { Query, } from 'react-apollo';
// import PropTypes from 'prop-types';
// import { parseComponentProp, } from '@haaretz/htz-css-tools';

// import ActionButtons from '../ActionButtons/ActionButtons';
import HeaderText from '../ArticleHeader/HeaderText';
import ArticleHeaderMeta from '../ArticleHeader/ArticleHeaderMeta';
import ArticleBody from '../ArticleBody/ArticleBody';
import RecipeRating from './RecpieRating';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import LayoutRow from '../PageLayout/LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default
import List from '../List/List';
import Comments from '../CommentsSection/WrappedComments';
import SideBar from '../SideBar/SideBar';
import HeadlineElement from '../HeadlineElement/HeadlineElement';

import dummyBody from './dummyBody';
import dummyInstructionLists from './dummyInstructionLists';
import dummyIngredientLists from './dummyIngredientLists';
import dummyHeader from './dummyHeader';
import ActionButtons from '../ActionButtons/ActionButtons';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const propTypes = {};

const defaultProps = {};

const startSideBarStyle = theme => ({
  backgroundColor: theme.color('primary', '-6'),
  extend: [
    theme.mq({ until: 'l', }, { display: 'none', }),
    theme.mq(
      { from: 'l', },
      {
        width: '44rem',
        paddingTop: '3rem',
        paddingInlineStart: '2rem',
        paddingInlineEnd: '2rem',
      }
    ),
    // theme.mq(
    //   { from: 'l', until: 'xl', },
    //   { width: '44rem', paddingTop: '3rem', paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
    // ),
    // theme.mq({ from: 'xl', }, { width: '30rem', }),
  ],
});

const rowContStyle = theme => ({
  extend: theme.mq({ from: 'l', }, { display: 'flex', }),
});

class Recipe extends React.Component {
  state = {};

  render() {
    return (
      <FelaComponent
        render={({ theme, }) => (
          <LayoutRow>
            <LayoutContainer bgc="white">
              {/* Header */}
              <LayoutRow bgc="white" miscStyles={{ textAlign: 'center', }}>
                <FelaComponent
                  style={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    extend: [
                      theme.mq({ from: 'l', }, { maxWidth: '130rem', }),
                      theme.mq(
                        { until: 'm', },
                        { display: 'flex', flexDirection: 'column', }
                      ),
                    ],
                  }}
                  render="header"
                >
                  <Breadcrumbs articleId="1.2345" />
                  <FelaComponent
                    style={{
                      marginTop: '3rem',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      extend: [
                        theme.mq(
                          { until: 's', },
                          { marginRight: '2rem', marginLeft: '2rem', }
                        ),
                        theme.mq(
                          { from: 's', until: 'l', },
                          { maxWidth: '80%', }
                        ),
                        theme.mq({ from: 'l', }, { maxWidth: '70%', }),
                      ],
                    }}
                    render={({ className, }) => (
                      <HeaderText
                        className={className}
                        kicker={dummyHeader.kicker}
                        subtitle={dummyHeader.subtitle}
                        title={dummyHeader.title}
                      />
                    )}
                  />
                  <ArticleHeaderMeta
                    authors={dummyHeader.authors}
                    publishDateTime={dummyHeader.publishDateTime}
                    miscStyles={{
                      marginTop: [ { from: 's', until: 'l', value: '2rem', }, ],
                      marginInlineStart: [ { until: 'm', value: '2rem', }, ],
                      marginInlineEnd: [ { until: 'm', value: '2rem', }, ],
                      display: [
                        { until: 'l', value: 'flex', },
                        { from: 'l', value: 'none', },
                      ],
                      order: [ { until: 's', value: 2, }, ],
                      // justifyContent: 'flex-start',
                    }}
                  />
                  <FelaComponent
                    style={{
                      marginTop: '3rem',
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      extend: [
                        theme.mq(
                          { until: 's', },
                          {
                            display: 'none',
                          }
                        ),
                        theme.mq(
                          { from: 's', until: 'm', },
                          {
                            marginRight: '3rem',
                            marginLeft: '3rem',
                          }
                        ),
                        theme.mq(
                          { from: 'm', until: 'l', },
                          {
                            maxWidth: '80%',
                          }
                        ),
                        theme.mq({ from: 'l', }, { maxWidth: '70%', }),
                      ],
                    }}
                    render={({ className, }) => (
                      <ActionButtons
                        className={className}
                        elementName="this.state.articleTitle"
                        elementUrl="this.state.articleUrl"
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
                        size={2.5}
                      />
                    )}
                  />
                  <HeadlineElement
                    elementObj={dummyHeader.elementObj}
                    miscStyles={{
                      marginTop: '2rem',
                      marginBottom: [ { until: 'm', value: 0, }, ],
                    }}
                  />
                </FelaComponent>
              </LayoutRow>
              {/* Main */}
              <FelaComponent style={rowContStyle}>
                <div>
                  <FelaComponent style={rowContStyle}>
                    <FelaComponent style={startSideBarStyle}>
                      <ArticleHeaderMeta
                        authors={dummyHeader.authors}
                        publishDateTime={dummyHeader.publishDateTime}
                        miscStyles={
                          {
                            // justifyContent: 'flex-start',
                          }
                        }
                      />
                      <RecipeRating miscStyles={{ marginTop: '6rem', }} />
                    </FelaComponent>
                    <LayoutRow bgc="white">
                      <LayoutContainer
                        bgc="white"
                        miscStyles={{
                          paddingTop: '6rem',
                          paddingInlineStart: [
                            { until: 'm', value: '2rem', },
                            { from: 'l', value: '5rem', },
                          ],
                          paddingInlineEnd: [
                            { until: 'm', value: '2rem', },
                            { from: 'l', value: '5rem', },
                          ],
                        }}
                      >
                        <ArticleBody body={dummyBody} />
                        <FelaComponent
                          style={{
                            marginTop: '6rem',
                            extend: [
                              theme.mq({ from: 'l', }, { display: 'none', }),
                            ],
                          }}
                        >
                          <RecipeRating />
                        </FelaComponent>
                        <FelaComponent style={{ marginTop: '6rem', }}>
                          <Instructions
                            instructionLists={dummyInstructionLists}
                          />
                        </FelaComponent>
                        <FelaComponent style={{ marginTop: '6rem', }}>
                          <Ingredients ingredientLists={dummyIngredientLists} />
                        </FelaComponent>
                      </LayoutContainer>
                    </LayoutRow>
                  </FelaComponent>
                  {/* List */}
                  <LayoutRow bgc="white" miscStyles={{ paddingTop: '6rem', }}>
                    {/* <Nibbler /> */}
                    {/* todo: change hardcoded id and view? */}
                    <List view="Nibbler" contentId="7.3553" />
                  </LayoutRow>
                  {/* Comments */}
                  <FelaComponent style={rowContStyle}>
                    <FelaComponent style={startSideBarStyle} />
                    <LayoutRow bgc="white">
                      <LayoutContainer
                        bgc="white"
                        miscStyles={{
                          paddingTop: '6rem',
                          paddingInlineStart: [
                            { until: 'm', value: '2rem', },
                            { from: 'l', value: '5rem', },
                          ],
                        }}
                      >
                        <Comments />
                      </LayoutContainer>
                    </LayoutRow>
                  </FelaComponent>
                </div>

                <FelaComponent
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    extend: [
                      theme.mq({ until: 'l', }, { display: 'none', }),
                      theme.mq({ from: 'l', }, { width: '67rem', }),
                    ],
                  }}
                >
                  <SideBar>
                    {[ 1, 2, 3, 4, 5, ].map(element => (
                      // const Element = getComponent(element.inputTemplate);
                      <FelaComponent
                        style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: 'orange',
                        }}
                      >
                        {element}
                      </FelaComponent>
                      // <Element
                      //   key={element.contentId}
                      //   articleId={this.props.articleId}
                      //   {...element}
                      // />
                    ))}
                  </SideBar>
                </FelaComponent>
              </FelaComponent>
            </LayoutContainer>
          </LayoutRow>
        )}
      />
    );
  }
}

Recipe.propTypes = propTypes;
Recipe.defaultProps = defaultProps;

export default Recipe;
