// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, parseStyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import gql from 'graphql-tag';

import ActionButtons from '../ActionButtons/ActionButtons';
import PlusClose from '../Animations/PlusClose';
import { Button, } from '../ActionButtons/actionList';
import Query from '../ApolloBoundary/Query';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const IS_MOUSE_STORY: Object = gql`
  query isMouseStory {
    isMouseStory @client
    isCommentsNumberLoaded @client
  }
`;

type Props = {
  title: string,
  canonicalUrl: string,
  miscStyles: stylesPropType,
};

type State = {
  isOpen: boolean,
};

class ShareBar extends React.Component<Props, State> {
  static defaultProps: {
    miscStyles: null,
  };

  state = {
    isOpen: false,
  };

  barWidth: number = 0;

  barEl: HTMLDivElement | null = null;

  toggleOpen: boolean => void = () => {
    this.setState((prevState: State) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render(): Node {
    const { title, canonicalUrl, miscStyles, } = this.props;
    const { isOpen, } = this.state;

    return (
      <FelaComponent
        style={(theme: Object) => ({
          marginTop: '3rem',
          display: 'flex',
          paddingInlineEnd: '1.5rem',
          justifyContent: 'space-between',
          extend: [
            borderTop({
              width: '1px',
              lines: 2,
              style: 'solid',
              color: theme.color('neutral', '-5'),
            }),
            theme.mq({ until: 's', }, { display: 'none', }),
            ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
          ],
        })}
        render={({ className, theme, }) => (
          <div className={className}>
            <ActionButtons
              elementName={title}
              elementUrl={canonicalUrl}
              buttons={[
                {
                  name: 'facebookLogo',
                  buttonStyles: {
                    color: theme.color('facebook'),
                    ':hover': {
                      color: theme.color('facebook'),
                    },
                  },
                },
                {
                  name: 'whatsapp',
                  buttonStyles: {
                    color: theme.color('whatsapp'),
                    ':hover': {
                      color: theme.color('whatsapp'),
                    },
                  },
                },
                'mail',
              ]}
              size={4.5}
            />
            <FelaComponent style={{ display: 'flex', }}>
              <Query query={IS_MOUSE_STORY}>
                {({ data: { isMouseStory, isCommentsNumberLoaded, }, }) => {
                  const buttons = [ 'zen', ];
                  const hiddenButtons = [ 'print', ];
                  if (!isMouseStory) {
                    buttons.push('comments');
                    if (isCommentsNumberLoaded && !this.barWidth && this.barEl) {
                      this.barWidth = this.barEl.offsetWidth;
                    }
                  }
                  else if (!this.barWidth) {
                    setTimeout(() => {
                      if (this.barEl) {
                        this.barWidth = this.barEl.offsetWidth;
                        this.forceUpdate();
                      }
                    });
                  }

                  return (
                    <React.Fragment>
                      <ActionButtons
                        elementName={title}
                        elementUrl={canonicalUrl}
                        buttons={[ ...buttons, ]}
                        size={4.5}
                      />
                      <FelaComponent
                        style={{
                          ...(!this.barWidth
                            ? {
                              position: 'absolute',
                              right: '100%',
                            }
                            : {}),
                        }}
                        render={({ className, }) => (
                          <div
                            className={className}
                            ref={el => {
                              if (!this.barEl) this.barEl = el;
                            }}
                          >
                            <ActionButtons
                              elementName={title}
                              elementUrl={canonicalUrl}
                              miscStyles={{
                                maxWidth: this.barWidth
                                  ? isOpen
                                    ? `${this.barWidth}px`
                                    : '0'
                                  : 'auto',
                                transitionProperty: 'max-width',
                                ...theme.getDelay('transition', -1),
                                ...theme.getDuration('transition', -1),
                                ...theme.getTimingFunction('transition', 'linear'),
                                overflow: 'hidden',
                              }}
                              buttons={[
                                ...hiddenButtons,
                                {
                                  name: 'save',
                                  buttonStyles: isArticleSaved => ({
                                    ...(isArticleSaved
                                      ? {
                                        color: theme.color('neutral', '-10'),
                                        backgroundColor: theme.color('primary'),
                                        ':hover': {
                                          color: theme.color('neutral', '-10'),
                                          backgroundColor: theme.color('secondary'),
                                        },
                                      }
                                      : {}),
                                  }),
                                },
                              ]}
                              size={4.5}
                            />
                          </div>
                        )}
                      />

                      <Button
                        onClick={this.toggleOpen}
                        title={!isOpen ? 'אפשרויות נוספות' : null}
                        miscStyles={{
                          color: theme.color('primary'),
                          minWidth: '5rem',
                        }}
                      >
                        <PlusClose isOpen={isOpen} size={3} color="primary" />
                      </Button>
                    </React.Fragment>
                  );
                }}
              </Query>
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default ShareBar;
