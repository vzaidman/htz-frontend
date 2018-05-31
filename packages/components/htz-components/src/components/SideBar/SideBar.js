import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import WrappedScroll from '../Scroll/Scroll';

class SideBar extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    show: 0,
  };

  changeView = y => {
    const { children, height, } = this.props;
    const range = height / children.length;
    console.log('height: ', height);
    console.log('y: ', y);
    console.log('range: ', range);
    console.log('index to show: ', Math.floor(y / range));
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
        }}
      >
        <WrappedScroll
          render={({ y, }) => {
            this.changeView(y);
            return children[show] || children[2];
          }}
        />
      </FelaComponent>
    );
  }
}

export default SideBar;
