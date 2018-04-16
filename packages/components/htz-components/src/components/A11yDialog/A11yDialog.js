/* global document window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import FocusLock from 'react-focus-lock';
import Portal from '../Portal/Portal';
import buttonHandlers from './utils/concateHandlersToElementId';
import setAriaHidden from './utils/setAriaHidden';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';

const dialogOverlayStyle = ({
  theme,
  overlayBgColor,
  isVisible,
  isModal,
  overlayMiscStyles,
}) => ({
  display: 'block',
  backgroundColor: overlayBgColor || 'rgba(0, 0, 0, 0.66)',
  height: '100%',
  width: '100%',
  position: isModal ? 'fixed' : 'absolute',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  zIndex: theme.getZIndex('modal'),
  extend: [ ...(overlayMiscStyles ? parseStyleProps(overlayMiscStyles) : []), ],
});

const dialogContentStyle = ({ theme, isModal, }) => ({
  position: isModal ? 'fixed' : 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: theme.getZIndex('modal', 1),
});

class A11yDialog extends React.Component {
  static propTypes = {
    /** Determine which id Portal div gets */
    appendTo: PropTypes.string.isRequired,
    /** Handle outside content click to close the dialog */
    closeOnOutsideClick: PropTypes.bool,
    /** Set aria-hidden true on root element after dialog was opened */
    elementToHide: PropTypes.string.isRequired,
    /**
     * Transforms dialog to modal, which enable focus lock ,
     * and change style's object position to `fixed`
     * and also passed back to the user by render props.
     */
    isModal: PropTypes.bool,
    /**
     *  Determine dialog mode(opend/closed).
     *  Accept `true` or `false`.
     *  Usually passing the state of user's custom component
     */
    isVisible: PropTypes.bool,
    /** Trigger user callback function when modal is closed */
    onClose: PropTypes.func,
    /** Trigger user callback function when modal is opened */
    onOpen: PropTypes.func,
    /**
     * The render Props callback
     * This component was built using the render props pattern.
     *
     * Checkout the following link to learn about render props pattern http://bit.ly/2CSxs7g
     *
     * The Dialog Component passes an Object to its render function.
     * @param {Object} options
     * @param {function} options.handleClose - A function used for closing the dialog
     * @param {boolean} options.isModal - Indicates if the dialog is used as part of a modal which obscures
     *                                    the entire ui and prevents any further interaction with it.
     * @param {boolean} options.isVisibile - Indicates the dialog's current state
     */
    render: PropTypes.func.isRequired,
    /**
     *  An Array contains string element/s id/s to open/close modal.
     *  As each element toggles the state of the dialog between opened and closed.
     *  When passing `toggleRefs` No state nor `isVisible` prop are needed to open/close modal.
     */
    toggleRefs: PropTypes.arrayOf(PropTypes.string),
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying overlay FelaComponent in this component
     */
    overlayAttrs: attrsPropType,
    /** set overlay FelaComponent background color */
    overlayBgColor: PropTypes.string,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    overlayMiscStyles: stylesPropType,
  };

  static defaultProps = {
    toggleRefs: [],
    closeOnOutsideClick: false,
    isVisible: false,
    isModal: false,
    onClose: null,
    onOpen: null,
    overlayBgColor: null,
    overlayMiscStyles: null,
    overlayAttrs: null,
  };

  state = {
    isVisible: false,
    isMounted: false,
    returnFocusTo: null,
  };

  componentDidMount = () => {
    const { isVisible, } = this.props;
    this.setState({ isMounted: true, });
    const { toggleRefs, } = this.props;
    if (Array.isArray(toggleRefs)) {
      toggleRefs.forEach(id =>
        buttonHandlers.setToggleHandler(id, this.toggleDialog)
      );
    }

    if (isVisible && this.state.isMounted) {
      this.openDialog();
    }
  };

  componentWillReceiveProps = ({ isVisible, }) => {
    if (isVisible !== this.state.isVisible) {
      this.setState(
        { isVisible, },
        () => (isVisible ? this.openDialog() : this.closeDialog())
      );
    }
  };

  componentWillUnmount = () => {
    const { toggleRefs, } = this.props;
    if (Array.isArray(toggleRefs)) {
      toggleRefs.forEach(id =>
        buttonHandlers.clearHandler(id, this.toggleDialog)
      );
    }
    this.closeDialogHelpers();
  };

  openDialog = () => {
    if (this.container) {
      this.container.addEventListener('keydown', this.handleKeydown);
    }
    setAriaHidden.set(this.props.elementToHide);

    this.setState(
      (prevState, props) =>
        (prevState.wasRendered
          ? { isVisible: true, returnFocusTo: document.activeElement, }
          : {
            isVisible: true,
            wasRendered: true,
            returnFocusTo: document.activeElement,
          }),
      () => {
        this.props.onOpen && this.props.onOpen();
        this.container.focus();
      }
    );
  };

  closeDialog = () => {
    const { returnFocusTo, } = this.state;
    if (this.container) {
      this.container.removeEventListener('keydown', this.handleKeydown);
    }
    setAriaHidden.remove(this.props.elementToHide);
    this.setState({ isVisible: false, returnFocusTo: null, }, () => {
      this.props.onClose && this.props.onClose();
      returnFocusTo.focus();
    });
  };

  toggleDialog = () => {
    this.state.isVisible ? this.closeDialog() : this.openDialog();
  };

  handleKeydown = e => {
    if (e.keyCode === 27 && this.state.isVisible) {
      this.closeDialog();
    }
  };

  render = () => {
    const {
      appendTo,
      isModal,
      render,
      overlayAttrs,
      overlayBgColor,
      overlayMiscStyles,
      closeOnOutsideClick,
    } = this.props;
    return this.state.isMounted ? (
      <Portal host={appendTo}>
        <FelaComponent
          {...{
            isModal,
            isVisible: this.state.isVisible,
            overlayAttrs,
            overlayBgColor,
            overlayMiscStyles,
          }}
          rule={dialogOverlayStyle}
          render={({ className, }) => (
            <div style={{ display: this.state.isVisible ? 'block' : 'none', }}>
              <FocusLock
                disabled={!(this.state.isVisible && isModal)}
                autoFocus={false}
              >
                <div
                  className={className}
                  {...(closeOnOutsideClick
                    ? {
                        onClick: this.closeDialog,
                        tabIndex: '-1',
                      }
                    : {})}
                />
                <FelaComponent
                  isModal={isModal}
                  rule={dialogContentStyle}
                  render={({ className, }) => (
                    <div
                      className={className}
                      role="dialog"
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex="0"
                      ref={ref => {
                        this.container = ref;
                      }}
                      {...(this.state.isVisible
                        ? {}
                        : { 'aria-hidden': 'true', })}
                    >
                      <div role="document">
                        {render({
                          isVisible: this.state.isVisible,
                          handleClose: this.closeDialog,
                          isModal,
                        })}
                      </div>
                    </div>
                  )}
                />
              </FocusLock>
            </div>
          )}
        />
      </Portal>
    ) : null;
  };
}

export default A11yDialog;
