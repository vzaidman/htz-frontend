import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import MobileNavigationMenu from './MobileNavigationMenu/MobileNavigationMenu';
import MobileBarActionButtons from './MobileMenuFooter/MobileBarActionButtons';

export default class MobileNavigationMain extends React.Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired,
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
    const { contentId, } = this.props;
    const { menuIsOpen, shareIsOpen, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          height: '8rem',
          backgroundColor: theme.color('neutral', '-10'),
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
                  menuIsOpen={menuIsOpen}
                  onClick={this.toggleMenu}
                />
              )}
              {menuIsOpen ? null : (
                <MobileBarActionButtons onClick={this.toggleShare} />
              )}
            </div>
          </Fragment>
        )}
      />
    );
  }
}
