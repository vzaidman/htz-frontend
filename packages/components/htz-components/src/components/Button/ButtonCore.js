import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

import HtzLink from '../HtzLink/HtzLink';
import { attrsPropType, } from '../../propTypes/attrsPropType';

export const ButtonCorePropTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * Nodes rendered inside `Button`.
   * Passed to the underlying react element
   */
  children: PropTypes.node,
  /** The classes attached to the DOM element */
  className: PropTypes.string,
  /**
   * A url to be assigned to the DOM element, converts the button to an `'<a>'`
   * DOM element inside a Wrapped Next JS `<HtzLink />`
   */
  href: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.shape({ pathname: PropTypes.string, asPath: PropTypes.string, }),
  ]),
  asPath: PropTypes.string,
  /**
   * A value for the `button`s `id` attribute.
   * Passed to the underlying react element
   */
  id: PropTypes.string,
  /**
   * Indicates if a button is currently disabled.
   * Passed to the underlying react element
   */
  /**
   * Indicates if a button is currently amid an operation (e.g., loading, posting, etc.).
   * Passed to the underlying react element
   */
  isBusy: PropTypes.bool,
  isDisabled: PropTypes.bool,
  /**
   * Indicates if a button is a `reset` button.
   * Passed to the underlying react element
   */
  isReset: PropTypes.bool,
  /**
   * Indicates if a button is a `submit` button.
   * Passed to the underlying react element
   */
  isSubmit: PropTypes.bool,
  /**
   * A callback that get called when the user clicks on the button.
   * Passed to the underlying react element
   *
   * @param {SyntheticEvent} event -
   *   The react [`SyntheticEvent`](https://reactjs.org/docs/events.html) that initiated
   *   the callback
   * @param {Object} allProps - All the properties of this `Button`
   */
  onClick: PropTypes.func,
  /** Indicates if a link should be perfetched (only relevant when `href` prop is defined) */
  prefetch: PropTypes.bool,
  /** The HTML tag to render the `<Button />` as */
  tagName: PropTypes.string,
};

const ButtonCore = React.forwardRef(
  // eslint-disable-next-line prefer-arrow-callback
  function ButtonCore(
    {
      attrs,
      children,
      className,
      href,
      asPath,
      id,
      isBusy,
      isDisabled,
      isReset,
      isSubmit,
      onClick,
      prefetch,
      tagName,
    },
    ref
  ) {
    if (tagName || !href) {
      const Component = tagName || 'button';
      return (
        <Component
          ref={ref}
          id={id || null}
          className={className}
          {...attrs}
          {...(isDisabled || isBusy ? { disabled: true, tabIndex: '-1', } : {})}
          {...(onClick ? { onClick, } : {})}
          type={isSubmit ? 'submit' : isReset ? 'reset' : 'button'}
        >
          {children}
        </Component>
      );
    }

    return (
      <HtzLink
        ref={ref}
        href={href}
        asPath={asPath}
        prefetch={prefetch}
        className={className}
        onClick={onClick}
        attrs={{
          id,
          ...(isDisabled || isBusy ? { disabled: true, tabIndex: '-1', } : {}),
          ...attrs,
        }}
      >
        <Fragment>{children}</Fragment>
      </HtzLink>
    );
  }
);

ButtonCore.propTypes = ButtonCorePropTypes;
ButtonCore.defaultProps = {
  attrs: null,
  children: null,
  className: null,
  href: null,
  asPath: null,
  id: null,
  isBusy: false,
  isDisabled: false,
  isSubmit: false,
  isReset: false,
  onClick: null,
  prefetch: false,
  tagName: null,
};

export default ButtonCore;
