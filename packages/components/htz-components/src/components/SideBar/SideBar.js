import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import WrappedScroll from '../Scroll/Scroll';

class SideBar extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    height: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    height: 0,
  };

  state = {
    show: 0,
  };

  changeView = y => {
    const { children, height, } = this.props;
    const range = height / children.length;
    this.state.show !== Math.floor(y / range) &&
      this.setState({
        show: Math.floor(y / range) || 0,
      });
  };

  render() {
    const { children, } = this.props;
    const { show, } = this.state;
    return (
      <FelaComponent
        style={{
          position: 'sticky',
          width: '100%',
          top: '12px',
          zIndex: '1',
          paddingInlineStart: '4rem',
          paddingInlineEnd: '4rem',
        }}
      >
        {children && children.length > 0 ? (
          <WrappedScroll
            render={({ y, }) =>
              // this.changeView(y);
               children[show] || children[0] || <p>Out of range</p>
            }
          />
        ) : null}
      </FelaComponent>
    );
  }
}

export default SideBar;
