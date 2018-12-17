// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';

import ActionButtons from '../../../ActionButtons/ActionButtons';
import PlusClose from '../../../Animations/PlusClose';
import { Button, } from '../../../ActionButtons/actionList';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';

type Props = {
  title: string,
  canonicalUrl: string,
  miscStyles: stylesPropType,
};

type State = {
  isOpen: boolean,
  focused: boolean,
  hover: boolean,
  hiddenButtonsBarWidth: number,
};

class ShareBar extends React.Component<Props, State> {
  static defaultProps: {
    miscStyles: null,
  };

  state = {
    isOpen: false,
    focused: false,
    hover: false,
    hiddenButtonsBarWidth: -1,
  };

  toggleOpen: boolean => void = () => this.setState((prevState: State) => ({
    isOpen: !prevState.isOpen,
  }));

  changeFocus: boolean => void = (focused: boolean) => this.setState({
    focused,
  });

  toggleHover: boolean => void = (hover: boolean) => this.setState({
    hover,
  });

  render(): Node {
    const { title, canonicalUrl, miscStyles, } = this.props;
    const { isOpen, focused, hover, } = this.state;
    return (
      <FelaComponent
        style={(theme: Object) => ({
          marginTop: '5rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          width: isOpen ? '55rem' : '40rem',
          marginRight: 'auto',
          marginLeft: 'auto',
          transitionProperty: 'width',
          extend: [
            theme.mq({ until: 's', }, { display: 'none', }),
            theme.mq({ from: 'l', until: 'xl', }, { marginTop: '8rem', }),
            theme.getDelay('transition', -1),
            theme.getDuration('transition', -1),
            theme.getTimingFunction('transition', 'linear'),
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
                'comments',
              ]}
              globalButtonsStyles={{
                minWidth: '8rem',
              }}
              size={4}
            />
            <FelaComponent style={{ display: 'flex', }}>
              <React.Fragment>
                <div
                  ref={el => {
                    if (el && this.state.hiddenButtonsBarWidth === -1) {
                      this.setState({ hiddenButtonsBarWidth: el.offsetWidth, });
                    }
                  }}
                >
                  <ActionButtons
                    elementName={title}
                    elementUrl={canonicalUrl}
                    miscStyles={{
                      width:
                        this.state.hiddenButtonsBarWidth !== -1
                          ? isOpen
                            ? `${this.state.hiddenButtonsBarWidth}px`
                            : '0'
                          : 'auto',
                      transitionProperty: 'width',
                      ...theme.getDelay('transition', -1),
                      ...theme.getDuration('transition', -1),
                      ...theme.getTimingFunction('transition', 'linear'),
                    }}
                    buttons={[
                      'print',
                      {
                        name: 'save',
                        buttonStyles: isArticleSaved => ({
                          minWidth: '10rem',
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
                    globalButtonsStyles={{
                      minWidth: '8rem',
                    }}
                    size={4}
                  />
                </div>

                <Button
                  onClick={this.toggleOpen}
                  onFocus={() => this.changeFocus(true)}
                  onBlur={() => this.changeFocus(false)}
                  onMouseEnter={() => this.toggleHover(true)}
                  onMouseLeave={() => this.toggleHover(false)}
                  title={!isOpen ? 'אפשרויות נוספות' : null}
                  miscStyles={{
                    paddingStart: '3rem',
                    paddingEnd: '3rem',
                  }}
                >
                  <PlusClose
                    isOpen={isOpen}
                    size={3}
                    color={focused ? (hover ? [ 'primary', ] : [ 'neutral', '-10', ]) : [ 'primary', ]}
                  />
                </Button>
              </React.Fragment>
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default ShareBar;
