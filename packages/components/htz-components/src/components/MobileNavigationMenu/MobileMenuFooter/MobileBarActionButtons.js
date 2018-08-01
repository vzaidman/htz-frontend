/* global fetch */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '../../ApolloBoundary/ApolloBoundary';
import ActionButtons from '../../ActionButtons/ActionButtons';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import MobileAdditionalShare from './MobileAdditionalShare';
import PlusClose from '../../Animations/PlusClose';

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
          justifyContent: shareIsOpen ? 'flex-end' : 'space-between',
          // justifyContent: shareIsOpen ? 'flex-end' : 'space-around',
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
                        paddingRight: '4rem',
                        paddingLeft: '4rem',
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
                        size={3}
                        color={shareIsOpen ? 'white' : 'primary'}
                        isOpen={shareIsOpen}
                      />
                    </Button>
                    <A11yDialog
                      appendTo="modalsRoot"
                      elementToHide="pageRoot"
                      isVisible={shareIsOpen}
                      isModal
                      closeOnOutsideClick
                      containerMiscStyles={{
                        height: '48rem',
                        width: '100%',
                        position: 'fixed',
                        overflowY: 'auto',
                        top: 'auto',
                        bottom: '8rem',
                        left: '0',
                        right: '0',
                        outline: 'none',
                        transform: 'none',
                        backgroundColor: theme.color('secondary'),
                      }}
                      render={({ handleClose, isVisible, isModal, }) => {
                        !isVisible && shareIsOpen && this.toggleShareState();
                        return (
                          <MobileAdditionalShare elementUrl={articleUrl} />
                        );
                      }}
                    />
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
