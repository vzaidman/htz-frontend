import React from 'react';
import FelaComponent from 'react-fela/lib/FelaComponent';
import { AriaDescription, } from '@haaretz/htz-components';
import PropTypes from 'prop-types';

const circleStyle = theme => ({
  width: '2rem',
  height: '2rem',
  backgroundColor: '#2f872a',
  borderRadius: '50%',
});
const id = Math.random();
function circle({ headers, }) {
  return (
    <div>
      <FelaComponent id={id} style={circleStyle} />
      <AriaDescription id={`Description${id}`} headers={headers}>
        כלול
      </AriaDescription>
    </div>
  );
}

circle.propTypes = {
  headers: PropTypes.string,
};

circle.defaultProps = {
  headers: null,
};

export default circle;
