import React from 'react';
import PropTypes from 'prop-types';
import Zen from '../Zen/Zen';
import AdSlotBase from './AdSlotBase';
import WebInreadAdSlot from './WebInreadAdSlot';
import BillboardAdSlot from './BillboardAdSlot';
import PlazmaAdSlot from './PlazmaAdSlot';
import MobileInreadAdSlot from './MobileInreadAdSlot';

// maps slotId to matching component
const mapSlotIdToComponent = slotId => {
  const map = [
    [ /inread/i, props => (<WebInreadAdSlot {...props} />), ],
    [ /plazma/i, props => (<PlazmaAdSlot {...props} />), ],
    [ /billboard\.desktop/i, props => (<BillboardAdSlot {...props} />), ],
    [ /mobile_web\.box\d\.article/i, props => (<MobileInreadAdSlot {...props} />), ],
  ];
  const defualtComponent = props => (<AdSlotBase {...props} />);

  for (const [ pattern, component, ] of map) {
    if (pattern.test(slotId)) {
      return component;
    }
  }
  return defualtComponent;
};

const GeneralAdSlot = ({ wrapperMiscStyles, ...props }) => (
  <Zen miscStyles={wrapperMiscStyles} animate>
    {
      mapSlotIdToComponent(props.id)(props)
    }
  </Zen>
);

GeneralAdSlot.propTypes = {
  id: PropTypes.string.isRequired,
};

export default GeneralAdSlot;
