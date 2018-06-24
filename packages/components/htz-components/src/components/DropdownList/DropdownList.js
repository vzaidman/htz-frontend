/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import { FelaComponent, withTheme, } from 'react-fela';

const wrapperPropTypes = {
  /**
   * A node to be rendered inside the <ul><li> dropdown list.
   * Can be any object: such as component, button, href etc...
   */
  children: PropTypes.node.isRequired,
  /**
   * A style object to be used by the <ul>.
   */
  // eslint-disable-next-line react/forbid-prop-types
  listStyle: PropTypes.object.isRequired,
  /**
   * A style object to be used by the <ul>.
   */
  // eslint-disable-next-line react/forbid-prop-types
  itemStyle: PropTypes.object.isRequired,
};

const listItemPropTypes = {
  /**
   * A node to be rendered inside the <ul><li> dropdown list.
   * Can be any object: such as component, button, href etc...
   */
  children: PropTypes.node.isRequired,
  /**
   * A style object to be used by the <li>.
   */
  // eslint-disable-next-line react/forbid-prop-types
  itemStyle: PropTypes.object.isRequired,
};

const ListItem = ({ children, itemStyle, }) => (
  <FelaComponent
    style={itemStyle}
    render={({ className, }) => <li className={className}>{children}</li>}
  />
);

ListItem.propTypes = listItemPropTypes;

const ListWrapper = ({ children, listStyle, itemStyle, }) => (
  <FelaComponent
    rule={listStyle}
    render={({ className, }) => (
      <FocusLock>
        <ul className={className}>
          {children.map(child => (
            <ListItem itemStyle={itemStyle} key={child.key}>
              {child}
            </ListItem>
          ))}
        </ul>
      </FocusLock>
    )}
  />
);

ListWrapper.propTypes = wrapperPropTypes;

class DropdownList extends React.Component {
  static propTypes = {
    /**
     * A prop that contains a function that (with the help of
     * this component) will render a fragment of the final outcome.
     */
    render: PropTypes.func.isRequired,
    /**
     * A style object to be used by the <ul>.
     * If none is sent there will be no style.
     */
    /* eslint-disable */
    // eslint-disable-next-line react/forbid-prop-types
    // eslint-disable react/no-unused-prop-types
    listStyle: PropTypes.object,
    /**
     * A style object to be used by the <li>.
     * If none is sent there will be no style.
     */
    itemStyle: PropTypes.object,
    /**
     * A style object to be used by the main button.
     * The first button MUST be `position: 'relative'`.
     */
    mainMenuStyle: PropTypes.object,
    /* eslint-enable */
    /**
     * A prop should to be sent to sub-list only.
     * Allows arrow key to close the sub-list.
     */
    isLast: PropTypes.bool,
    /**
     * The app's theme (get imported automatically with the `withTheme` method).
     */
    theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    listStyle: null,
    itemStyle: null,
    mainMenuStyle: { position: 'static', },
    isLast: false,
  };

  state = { isOpen: false, };

  shouldComponentUpdate(nextState) {
    return this.state.isOpen !== nextState.isOpen;
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick);
      document.addEventListener('keydown', this.handleEscape);
      document.addEventListener('keydown', this.handleArrowKey);
    }
    else {
      document.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleEscape);
      document.removeEventListener('keydown', this.handleArrowKey);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscape);
    document.removeEventListener('keydown', this.handleArrowKey);
  }

  handleOutsideClick = e => {
    if (!this.wrapper.contains(e.target)) {
      this.toggleState();
    }
  };

  handleEscape = e => {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.toggleState();
    }
  };

  handleArrowKey = e => {
    const {
      theme: { direction, },
    } = this.props;
    const key = e.which || e.keyCode;
    if (
      this.props.isLast &&
      ((direction === 'rtl' && key === 39) ||
        (direction === 'ltr' && key === 37))
    ) {
      this.toggleState();
    }
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
      buttonRenderer({ toggleState: this.toggleState, });
    return (
      <FelaComponent
        style={mainMenuStyle}
        render={({ className, theme, }) => (
          <div
            className={className}
            ref={wrapper => {
              this.wrapper = wrapper;
            }}
          >
            {render({ renderButton, ListWrapper, isOpen, })}
          </div>
        )}
      />
    );
  }
}

export default withTheme(DropdownList);
