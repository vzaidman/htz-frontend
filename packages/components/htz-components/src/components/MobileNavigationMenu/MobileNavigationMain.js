import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import MobileNavigationMenu from './MobileNavigationMenu/MobileNavigationMenu';
import MobileBarActionButtons from './MobileMenuFooter/MobileBarActionButtons';

export default class MobileNavigationMain extends React.Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired,
    shouldDisplay: PropTypes.bool.isRequired,
  };

  state = { menuIsOpen: false, shareIsOpen: false, };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  toggleShare = () => {
    this.setState(prevState => ({
      shareIsOpen: !prevState.shareIsOpen,
    }));
  };

  render() {
    const { contentId, shouldDisplay, } = this.props;
    const { menuIsOpen, shareIsOpen, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          height: '9rem',
          ...(menuIsOpen
            ? { backgroundColor: theme.color('secondary', 'base'), }
            : { backgroundColor: theme.color('neutral', '-10'), }
            ),
          borderTopColor: theme.color('neutral', '-5'),
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
        })}
        render={({ className, }) => (
          <Fragment>
            <div className={className}>
              {shareIsOpen ? null : (
                <MobileNavigationMenu
                  contentId={contentId}
                  menuIsOpen={menuIsOpen && shouldDisplay}
                  onClick={this.toggleMenu}
                  wrapperSetState={newState => this.setState(newState)}
                />
              )}
              {menuIsOpen ? null : (
                <MobileBarActionButtons
                  onClick={this.toggleShare}
                  shouldMainNavBarDisplay={shouldDisplay}
                />
              )}
            </div>
          </Fragment>
        )}
      />
    );
  }
}
