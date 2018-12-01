import React, { Component, } from 'react';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import {
  A11yDialog,
  Button,
  IconClose,
  H,
  UserDispenser,
  Query,
  Mutation,
} from '@haaretz/htz-components';
import WelcomeCartoon from './WelcomeCartoon';

const WELCOME_SCREEN_VIEWED = gql`
  query welcomeScreenViewed($id: String!) {
    userInfo(id: $id) {
      welcomeScreenViewed
    }
  }
`;

const UPDATE_WELCOME_SCREEN_VIEWED = gql`
  mutation SetWelcomeScreenViewed($id: String!) {
    setWelcomeScreenViewed(id: $id, value: true)
  }
`;
class WelcomePage extends Component {
  state = {
    forceHide: false,
  };

  render() {
    return (
      <UserDispenser
        render={({ user: { id, }, }) => (id ? (
          <Mutation mutation={UPDATE_WELCOME_SCREEN_VIEWED}>
            {setWelcomeScreenViewed => (
              <Query query={WELCOME_SCREEN_VIEWED} variables={{ id, }}>
                {({ data, loading, error, refetch, }) => {
                  if (loading) return null;
                  if (error) return null;
                  const {
                    userInfo: { welcomeScreenViewed, },
                  } = data;
                  if (welcomeScreenViewed) return null;
                  return (
                    <A11yDialog
                      appendTo="welcomePageModal"
                      closeOnOutsideClick
                      elementToHide="__next"
                      isVisible={
                          !welcomeScreenViewed || !this.state.forceHide
                        }
                      isModal
                      onClose={() => {
                        setWelcomeScreenViewed({ variables: { id, }, }).then(
                          () => refetch()
                        );
                        // forcing hide so Dialog wont get stuck on screen if there is a connection problem
                        this.setState({ forceHide: true, });
                      }}
                      overlayBgColor="rgba(0, 0, 0, 0.75)"
                      containerMiscStyles={{
                        width: '100%',
                        background:
                            'linear-gradient(to top, #eceaea, #ffffff)',
                        position: 'fixed',
                        bottom: '0',
                        left: '0',
                        top: 'initial',
                        transformOrigin: 'top left',
                        transform: 'skewY(6deg)',
                        outline: 'none',
                      }}
                      render={({ handleClose, }) => (
                        <FelaComponent
                          style={theme => ({
                            display: 'flex',
                            justifyContent: 'center',
                            transform: 'skewY(-6deg)',
                            maxWidth: '142rem',
                            paddingInlineStart: '2rem',
                            paddingInlineEnd: '2rem',
                            marginInlineStart: 'auto',
                            marginInlineEnd: 'auto',
                            color: theme.color('bodyText', 'base'),
                          })}
                          render={({
                            theme,
                            theme: {
                              welcomePageI18n: {
                                texts: {
                                  headerHighLighted,
                                  headerNormal,
                                  bullets,
                                },
                                buttonText,
                              },
                            },
                            className,
                          }) => (
                            <div className={className}>
                              <FelaComponent
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  extend: [
                                    theme.mq(
                                      { until: 'm', },
                                      {
                                        flexDirection: 'column-reverse',
                                      }
                                    ),
                                  ],
                                }}
                              >
                                <FelaComponent
                                  style={{
                                    extend: [
                                      theme.mq(
                                        { until: 'm', },
                                        {
                                          marginTop: '-15rem',
                                          paddingInlineStart: '3rem',
                                          paddingInlineEnd: '3rem',
                                        }
                                      ),
                                      theme.mq(
                                        { until: 's', },
                                        { marginBottom: '5rem', }
                                      ),
                                      theme.mq(
                                        { from: 's', until: 'm', },
                                        { marginBottom: '8rem', }
                                      ),
                                      theme.mq(
                                        { from: 'm', until: 'l', },
                                        {
                                          paddingTop: '10rem',
                                          marginBottom: '10rem',
                                          paddingInlineStart: '3rem',
                                          marginInlineEnd: '-8rem',
                                        }
                                      ),
                                      theme.mq(
                                        { from: 'l', },
                                        {
                                          paddingTop: '10rem',
                                          marginInlineEnd: '-16rem',
                                          marginBottom: '18rem',
                                        }
                                      ),
                                    ],
                                  }}
                                >
                                  <FelaComponent
                                    style={{
                                      extend: [
                                        theme.type(5, { fromBp: 'm', }),
                                        theme.type(3, { untilBp: 'm', }),
                                      ],
                                    }}
                                    render={({ className, }) => (
                                      <H className={className}>
                                        <FelaComponent
                                          style={{
                                            color: theme.color(
                                              'primary',
                                              '-2'
                                            ),
                                          }}
                                        >
                                          {headerHighLighted}
                                        </FelaComponent>
                                        <div>{headerNormal}</div>
                                      </H>
                                    )}
                                  />

                                  <FelaComponent
                                    style={{
                                      listStyleType: 'disc',
                                      listStylePosition: 'inside',
                                      paddingInlineStart: '-4rem',
                                      marginTop: '3rem',
                                      extend: [
                                        theme.mq(
                                          { until: 's', },
                                          { marginTop: '1rem', }
                                        ),
                                      ],
                                    }}
                                    render="ul"
                                  >
                                    {bullets.map(bullet => (
                                      <li key={bullet}>
                                        <FelaComponent
                                          style={{
                                            marginInlineStart: '-1rem',
                                          }}
                                          render="span"
                                        >
                                          {bullet}
                                        </FelaComponent>
                                      </li>
                                    ))}
                                  </FelaComponent>
                                  <Button
                                    variant="primaryOpaque"
                                    miscStyles={{ marginTop: '4rem', }}
                                    onClick={() => handleClose()}
                                  >
                                    {buttonText}
                                  </Button>
                                </FelaComponent>
                                <FelaComponent
                                  style={{
                                    position: 'relative',
                                    top: '-20%',
                                  }}
                                >
                                  <WelcomeCartoon
                                    size={[
                                      { until: 's', value: 36, },
                                      { from: 's', until: 'm', value: 50, },
                                      { from: 'm', until: 'l', value: 60, },
                                      { from: 'l', until: 'xl', value: 75, },
                                      { from: 'xl', value: 85, },
                                    ]}
                                  />
                                </FelaComponent>
                                <IconClose
                                  size={[
                                    { until: 's', value: 2.5, },
                                    { from: 's', until: 'l', value: 3.5, },
                                    { from: 'l', value: 5, },
                                  ]}
                                  onClick={() => handleClose()}
                                  miscStyles={{
                                    cursor: 'pointer',
                                    transform: [
                                      {
                                        until: 'm',
                                        value: 'translateX(-1rem)',
                                      },
                                      {
                                        from: 'm',
                                        until: 'l',
                                        value: 'translateX(5rem)',
                                      },
                                      {
                                        from: 'l',
                                        value: 'translateX(8rem)',
                                      },
                                    ],
                                    alignSelf: [
                                      { until: 'm', value: 'flex-end', },
                                    ],
                                  }}
                                />
                              </FelaComponent>
                            </div>
                          )}
                        />
                      )}
                    />
                  );
                }}
              </Query>
            )}
          </Mutation>
        ) : null)
        }
      />
    );
  }
}

export default WelcomePage;
