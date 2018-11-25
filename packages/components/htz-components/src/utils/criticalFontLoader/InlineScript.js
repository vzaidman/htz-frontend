import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const InlineScript = ({ scriptFunc, params, ...props }) => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `(${scriptFunc.toString()})(${serialize(params)})`,
    }}
    {...props}
  />
);

InlineScript.propTypes = {
  scriptFunc: PropTypes.func.isRequired,
  // params needs to be serializable (i.e. no loops)
  params: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  props: PropTypes.arrayOf(PropTypes.any),
};

InlineScript.defaultProps = {
  params: null,
  props: null,
};

export default InlineScript;
