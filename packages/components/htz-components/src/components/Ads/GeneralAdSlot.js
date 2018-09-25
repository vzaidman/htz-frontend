import React from 'react';
import PropTypes from 'prop-types';
import Zen from '../Zen/Zen';
import AdSlotBase from './AdSlotBase';
import MarkedAdSlot from './MarkedAdSlot';
import PlazmaAdSlot from './PlazmaAdSlot';

const GeneralAdSlot = props => {
  const isInreadAdSlot = props.id && props.id.toLowerCase().includes('inread');
  const isPlazmaAdSlot = props.id && props.id.toLowerCase().includes('plazma');
  return (
    <Zen animate>
      {
        isInreadAdSlot
          ? <MarkedAdSlot {...props} />
          : isPlazmaAdSlot
            ? <PlazmaAdSlot {...props} />
            : <AdSlotBase {...props} />
      }
    </Zen>
  );
};

GeneralAdSlot.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneralAdSlot;
