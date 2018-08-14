import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import { stylesPropType, } from '../../../propTypes/stylesPropType';

const propTypes = {
  /**
   * The Html code that ought to be injected into the page.
   */
  code: PropTypes.string.isRequired,
  /**
   * Should this script run on this page ?
   */
  hideOnSite: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};
const defaultProps = {
  hideOnSite: false,
  miscStyles: null,
};

const wrapperStyle = ({ miscStyles, }) => ({
  ...(miscStyles || {}),
});
const Wrapper = createComponent(wrapperStyle);

/*
 * This component is designed for **legacy and interactive** purpose only.<br/>
 * It receives a pure Html code and <u>**dangerously**</u> injects it into the page.
 */
function HtmlElement({ code, hideOnSite, miscStyles, }) {
  return (
    <Wrapper miscStyles={miscStyles}>
      {!hideOnSite ? (
        <div
          dangerouslySetInnerHTML={{ __html: code, }} // eslint-disable-line react/no-danger
        />
      ) : null}
    </Wrapper>
  );
}

HtmlElement.propTypes = propTypes;
HtmlElement.defaultProps = defaultProps;

export default HtmlElement;
