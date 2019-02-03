// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';

import ActionButtons from '../../../ActionButtons/ActionButtons';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';

type Props = {
  title: string,
  canonicalUrl: string,
  miscStyles: stylesPropType,
};

type State = {
  isOpen: boolean,
  hover: boolean,
};

class ShareBar extends React.Component<Props, State> {
  static defaultProps: {
    miscStyles: null,
  };

  state = {
    isOpen: false,
    hover: false,
  };

  toggleOpen: boolean => void = () => this.setState((prevState: State) => ({
    isOpen: !prevState.isOpen,
  }));

  // changeFocus: boolean => void = (focused: boolean) => this.setState({
  //   focused,
  // });

  toggleHover: boolean => void = (hover: boolean) => this.setState({
    hover,
  });

  render(): Node {
    const { title, canonicalUrl, miscStyles, } = this.props;
    const {
      isOpen,
      //  focused,
    } = this.state;
    return (
      <FelaComponent
        style={(theme: Object) => ({
          marginTop: '5rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          width: '61rem',
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
                'print',
                {
                  name: 'save',
                  buttonStyles: isArticleSaved => ({
                    minWidth: '12rem',
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
              size={4.5}
            />
          </div>
        )}
      />
    );
  }
}

export default ShareBar;
