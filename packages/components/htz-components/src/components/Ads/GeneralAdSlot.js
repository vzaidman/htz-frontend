import React from 'react';
import PropTypes from 'prop-types';
import AdSlotBase from './AdSlotBase';
import MarkedAdSlot from './MarkedAdSlot';
import Zen from '../Zen/Zen';

const GeneralAdSlot = props => {
  const isInreadAdSlot = props.id && props.id.toLowerCase().includes('inread');
  return (
    <Zen animate>
      {
        isInreadAdSlot
          ? <MarkedAdSlot {...props} />
          : <AdSlotBase {...props} />
      }
    </Zen>
  );
};

GeneralAdSlot.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneralAdSlot;
