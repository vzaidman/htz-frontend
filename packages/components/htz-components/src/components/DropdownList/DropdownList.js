/* global document */
import React from 'react';
import PropTypes from 'prop-types';
// import FocusLock from 'react-focus-lock';
import { FelaComponent, FelaTheme, } from 'react-fela';
import ListWrapper from './ListWrapper';
import WrappedScroll from '../Scroll/Scroll';

ThemedDropdownList.propTypes = {
  /**
   * A prop that contains a function that (with the help of
   * this component) will render a fragment of the final outcome.
   */
  render: PropTypes.func.isRequired,
  /**
   * A style object for the button that opens the dropdown.
   * The main button must be `position: relative`,
   * the sub-dropdown will defaulted `static`.
   */
  // eslint-disable-next-line react/forbid-prop-types
  mainMenuStyle: PropTypes.object,
  /**
   * A prop should to be sent to sub-list only.
   * Allows arrow key to close the sub-list.
   */
  isLast: PropTypes.bool,
  /**
   * This component must get some extra props to it's ListWrapper and ListItem:
   * `listStyle` a style object to be used by the <ul>,
   * `itemStyle` a style object to be used by the <li>,
   * If none is sent there will be no style.
   */
  onClose: PropTypes.func,
};

ThemedDropdownList.defaultProps = {
  mainMenuStyle: { position: 'static', },
  isLast: false,
  onClose: () => {},
};

// This isn't a publically consumable component. prop-types
// are assigned to the wrapping component.
/* eslint-disable react/prop-types */
class DropdownList extends React.Component {
  state = { isOpen: false, focusButton: false, };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.y === 0 || (nextProps.y > 0 && this.state.isOpen);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick);
      document.addEventListener('keydown', this.handleEscape);
      document.addEventListener('keydown', this.handleArrowKey);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleEscape);
      document.removeEventListener('keydown', this.handleArrowKey);
      if (prevState.isOpen !== this.state.isOpen) {
        this.props.onClose();
      }
    }

    if (prevProps.y > 0 && this.state.isOpen) {
      this.toggleState();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscape);
    document.removeEventListener('keydown', this.handleArrowKey);
  }

  handleOutsideClick = evt => {
    if (this.state.isOpen && !this.wrapper.contains(evt.target)) {
      this.toggleState();
    }
  };

  handleEscape = evt => {
    const key = evt.which || evt.keyCode;
    if (this.state.isOpen && key === 27) {
      this.toggleState();
    }
  };

  handleArrowKey = evt => {
    const { direction, } = this.props;
    const key = evt.which || evt.keyCode;
    if (
      this.state.isOpen &&
      this.props.isLast &&
      ((direction === 'rtl' && key === 39) || (direction === 'ltr' && key === 37))
    ) {
      this.toggleState();
    }
  };

  openList = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeList = () => {
    this.setState({
      isOpen: false,
    });
  };

  toggleState = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { render, mainMenuStyle, } = this.props;
    const { isOpen, } = this.state;
    const renderButton = buttonRenderer =>
      buttonRenderer({
        toggleState: this.toggleState,
        closeList: this.closeList,
        openList: this.openList,
      });
    return (
      <FelaComponent
        style={mainMenuStyle}
        render={({ className, }) => (
          <div
            className={className}
            ref={wrapper => {
              this.wrapper = wrapper;
            }}
          >
            {render({
              renderButton,
              ListWrapper,
              isOpen,
              closeList: this.closeList,
            })}
          </div>
        )}
      />
    );
  }
}
/* eslint-enable react/prop-types */

function ThemedDropdownList(props) {
  return (
    <WrappedScroll
      render={({ y, }) => (
        <FelaTheme
          render={({ direction, }) => <DropdownList direction={direction} y={y} {...props} />}
        />
      )}
    />
  );
}

export default ThemedDropdownList;
