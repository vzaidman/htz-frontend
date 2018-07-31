/* global fetch */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import ActionButtons from '../../ActionButtons/ActionButtons';
import PlusClose from '../../Animations/PlusClose';
import Button from '../../Button/Button';
import MobileAdditionalShare from './MobileAdditionalShare';

const actionBarData = gql`
  query GetActionBarData {
    canonicalUrl @client
  }
`;

export default class MobileBarActionButtons extends React.Component {
  static propTypes = {
    /**
     * A callback function to hide/display the menu button and some share icons.
     */
    onClick: PropTypes.func.isRequired,
    // shouldDisplay: PropTypes.bool.isRequired,
  };

  state = { shareIsOpen: false, };

  toggleShareState = () => {
    this.props.onClick();
    this.setState(prevState => ({
      shareIsOpen: !prevState.shareIsOpen,
    }));
  };

  render() {
    const { shareIsOpen, } = this.state;
    // const { shouldDisplay, } = this.props;

    return (
      <FelaComponent
        style={{
          display: 'flex',
          // justifyContent: shareIsOpen ? 'flex-end' : 'space-between',
          justifyContent: shareIsOpen ? 'flex-end' : 'space-around',
          flexGrow: '1',
        }}
        render={({ theme, className, }) => (
          <div className={className}>
            <Query query={actionBarData}>
              {({ loading, error, data, }) => {
                if (loading) return null;
                if (error) console.log(error);
                const { canonicalUrl: articleUrl, } = data;
                return (
                  <Fragment>
                    {shareIsOpen ? null : (
                      <Fragment>
                        <ActionButtons
                          elementUrl={articleUrl}
                          isFlat
                          size={4}
                          buttons={{
                            name: 'facebook',
                            iconStyles: {
                              color: theme.color('facebook'),
                            },
                          }}
                        />
                        <ActionButtons
                          elementUrl={articleUrl}
                          isFlat
                          size={4}
                          buttons={{
                            name: 'whatsapp',
                            iconStyles: {
                              color: theme.color('whatsapp'),
                            },
                          }}
                        />
                        <ActionButtons
                          isFlat
                          size={4}
                          buttons={{
                            name: 'save',
                            buttonStyles: isArticleSaved => ({
                              ...(isArticleSaved && {
                                color: theme.color('neutral', '-10'),
                                backgroundColor: theme.color('primary'),
                              }),
                            }),
                          }}
                        />
                      </Fragment>
                    )}
                    <Button
                      isFlat
                      miscStyles={{
                        paddingRight: '3rem',
                        paddingLeft: '3rem',
                        ':focus': {
                          backgroundColor: theme.color('secondary'),
                        },
                        ...(shareIsOpen
                          ? {
                              backgroundColor: theme.color('secondary'),
                            }
                          : {}),
                      }}
                      onClick={() => {
                        this.toggleShareState();
                      }}
                    >
                      <PlusClose
                        size={4}
                        color={shareIsOpen ? 'white' : 'primary'}
                        isOpen={shareIsOpen}
                      />
                    </Button>
                    {/* {shareIsOpen && shouldDisplay && ( */}
                    {shareIsOpen && (
                      <FelaComponent
                        style={{
                          height: '48rem',
                          position: 'absolute',
                          top: '0',
                          transform: 'translateY(-100%)',
                          width: '100%',
                          backgroundColor: theme.color('secondary'),
                        }}
                      >
                        <MobileAdditionalShare elementUrl={articleUrl} />
                      </FelaComponent>
                    )}
                  </Fragment>
                );
              }}
            </Query>
          </div>
        )}
      />
    );
  }
}
