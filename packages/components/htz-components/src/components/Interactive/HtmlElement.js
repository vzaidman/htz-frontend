import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  code: PropTypes.string.isRequired,
  hideOnSite: PropTypes.bool,
};
const defaultProps = {
  hideOnSite: false,
};

function HtmlElement({ code, hideOnSite, }) {
  return (
    <div>
      {!hideOnSite && <div dangerouslySetInnerHTML={{ __html: code, }} />}
    </div>
  );
}

HtmlElement.propTypes = propTypes;
HtmlElement.defaultProps = defaultProps;

export default HtmlElement;
