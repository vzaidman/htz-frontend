// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';

import ActionButtons from '../ActionButtons/ActionButtons';
import PlusClose from '../Animations/PlusClose';
import { Button, } from '../ActionButtons/actionList';

type Props = {
  title: string,
  canonicalUrl: string,
};

type State = {
  isOpen: boolean,
  focused: boolean,
  hover: boolean,
};

class ShareBar extends React.Component<Props, State> {
  state = {
    isOpen: false,
    focused: false,
    hover: false,
  };

  toggleOpen: boolean => void = () =>
    this.setState((prevState: State) => ({
      isOpen: !prevState.isOpen,
    }));

  changeFocus: boolean => void = (focused: boolean) =>
    this.setState({
      focused,
    });

  toggleHover: boolean => void = (hover: boolean) =>
    this.setState({
      hover,
    });

  render(): Node {
    const { title, canonicalUrl, } = this.props;
    const { isOpen, focused, hover, } = this.state;
    return (
      <FelaComponent
        style={(theme: Object) => ({
          marginTop: '3rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          extend: [
            borderTop({
              width: '1px',
              lines: 1,
              style: 'solid',
              color: theme.color('neutral', '-5'),
            }),
            theme.mq({ until: 's', }, { display: 'none', }),
          ],
        })}
        render={({ className, theme, }) => (
          <div className={className}>
            <ActionButtons
              // miscStyles={{
              //   flexGrow: '1',
              // }}
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
              globalButtonsStyles={{
                minWidth: '10rem',
              }}
              size={4}
            />
            <FelaComponent style={{ display: 'flex', }}>
              <ActionButtons
                elementName={title}
                elementUrl={canonicalUrl}
                miscStyles={{
                  transform: `translateX(${
                    isOpen ? '0' : 'calc(-50% + 4rem)'
                  })`,
                  transitionProperty: 'transform',
                  ...theme.getDelay('transition', -1),
                  ...theme.getDuration('transition', -1),
                  ...theme.getTimingFunction('transition', 'linear'),
                }}
                buttons={[
                  'comments',
                  'zen',
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
                  minWidth: '10rem',
                }}
                size={4}
              />
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
                  color={
                    focused
                      ? hover
                        ? [ 'primary', ]
                        : [ 'neutral', '-10', ]
                      : [ 'primary', ]
                  }
                />
              </Button>
            </FelaComponent>
          </div>
        )}
      />
    );
  }
}

export default ShareBar;
