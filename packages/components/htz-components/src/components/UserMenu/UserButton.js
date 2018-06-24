import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import IconAvatar from '../Icon/icons/IconAvatar';

class UserButton extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    onClick: PropTypes.func,
    role: PropTypes.string,
  };

  static defaultProps = {
    userName: null,
    onClick: null,
    role: null,
  };

  state = { isHovered: false, };

  handleMouseEnter = () => this.setState({ isHovered: true, });
  handleMouseLeave = () => this.setState({ isHovered: false, });

  render() {
    const { isHovered, } = this.state;
    const { isOpen, userName, onClick, role, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          height: '100%',
          color: theme.color('userMenu', 'iconColor'),
          display: 'flex',
          border: 'none',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          paddingInlineStart: '2rem',
          paddingInlineEnd: '1rem',
          extend: [
            theme.type(-2),
            isOpen || isHovered
              ? {
                  backgroundColor: isHovered
                    ? theme.color('userMenu', 'bgHover')
                    : theme.color('userMenu', 'bgOpen'),
                  color: theme.color('userMenu', 'textOpenOrHover'),
                }
              : {},
          ],
        })}
        render={({ className, theme, }) => (
          <button
            className={className}
            onClick={onClick}
            role={role}
            aria-expanded={isOpen}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <FelaComponent
              render="span"
              style={{
                color:
                  isHovered || isOpen
                    ? theme.color('userMenu', 'textOpenOrHover')
                    : theme.color('userMenu', 'text'),
              }}
            >
              <FelaComponent
                render="span"
                style={{
                  fontWeight: '400',
                }}
              >
                {theme.userMenuI18n.buttonText}
                {','}{' '}
              </FelaComponent>
              <FelaComponent
                render="span"
                style={{
                  fontWeight: '700',
                }}
              >
                {userName}
              </FelaComponent>
            </FelaComponent>
            <IconAvatar size={3} miscStyles={{ marginRight: '2rem', }} />
          </button>
        )}
      />
    );
  }
}

export default UserButton;
