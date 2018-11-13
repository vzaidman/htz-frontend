/* global fetch */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../../ApolloBoundary/Query';
import ActionButtons from '../../ActionButtons/ActionButtons';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import MobileAdditionalShare from './MobileAdditionalShare';
import { Mail, } from '../../ActionButtons/actionList';

const actionBarData = gql`
  query GetActionBarData {    
    canonicalUrl @client    
    title @client
  }
`;

const iconSize = 5;

export default class MobileBarActionButtons extends React.Component {
  static propTypes = {
    /**
     * A callback function to hide/display the menu button and some share icons.
     */
    onClick: PropTypes.func.isRequired,
    shouldMainNavBarDisplay: PropTypes.bool.isRequired,
  };

  state = { shareIsOpen: false, modalOpen: false, };

  toggleShareState = () => {
    this.props.onClick();
    this.setState(prevState => ({
      shareIsOpen: !prevState.shareIsOpen,
    }));
  };

  render() {
    const { shareIsOpen, } = this.state;
    const { shouldMainNavBarDisplay, } = this.props;

    return (
      <FelaComponent
        style={{
          display: 'flex',
          justifyContent: shareIsOpen ? 'flex-end' : 'space-between',
          flexGrow: '1',
        }}
        render={({ theme, className, }) => (
          <div className={className}>
            <Query query={actionBarData}>
              {({ loading, error, data, }) => {
                if (loading) return null;
                if (error) console.log(error);
                console.log(data);
                const { canonicalUrl: articleUrl, } = data;
                return (
                  <Fragment>
                    {shareIsOpen ? null : (
                      <Fragment>
                        <ActionButtons
                          elementUrl={articleUrl}
                          isFlat
                          size={iconSize}
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
                          size={iconSize}
                          buttons={{
                            name: 'whatsapp',
                            iconStyles: {
                              color: theme.color('whatsapp'),
                            },
                          }}
                        />
                        <ActionButtons
                          isFlat
                          size={iconSize}
                          buttons={{
                            name: 'save',
                            buttonStyles: isArticleSaved => ({
                              ...(isArticleSaved
                                ? {
                                    color: theme.color('neutral', '-10'),
                                    backgroundColor: theme.color('primary'),
                                  }
                                : {}),
                            }),
                          }}
                        />

                        <ActionButtons
                          isFlat
                          elementUrl={articleUrl}
                          size={iconSize}
                          elementName={data.title}
                          buttons={{
                            name: 'mail',
                            iconStyles: {
                              color: theme.color('primary'),
                            },
                          }}
                        />
                      </Fragment>
                    )}
                    <A11yDialog
                      appendTo="modalsRoot"
                      elementToHide="pageRoot"
                      isVisible={shareIsOpen && shouldMainNavBarDisplay}
                      onOpen={() => this.setState({ modalOpen: true, })}
                      onClose={() => this.setState({ modalOpen: false, })}
                      isModal
                      closeOnOutsideClick
                      containerMiscStyles={{
                        width: '100%',
                        position: 'fixed',
                        overflowY: 'hidden',
                        top: 'auto',
                        bottom: '9rem',
                        left: '0',
                        right: '0',
                        outline: 'none',
                        transform: this.state.modalOpen
                          ? 'translateY(0)'
                          : 'translateY(100%)',
                        backgroundColor: theme.color('secondary'),
                        transitionProperty: 'transform',
                        ...theme.getDuration('transition', 1),
                        ...theme.getTimingFunction('transition', 'swiftIn'),
                      }}
                      render={({ handleClose, isVisible, isModal, }) => {
                        !isVisible && shareIsOpen && this.toggleShareState();
                        return (
                          <MobileAdditionalShare
                            elementUrl={articleUrl}
                            isOpen={this.state.modalOpen}
                          />
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
