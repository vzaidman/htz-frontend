import React from 'react';
import PropTypes from 'prop-types';
import AdSlot from './AdSlot';
import MarkedAdSlot from './MarkedAdSlot';

const GeneralAdSlot = props => {
  const isInreadAdSlot = props.id && props.id.toLowerCase().includes('inread');
  return isInreadAdSlot
    ? <MarkedAdSlot {...props} />
    : <AdSlot {...props} />;
};

GeneralAdSlot.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneralAdSlot;
