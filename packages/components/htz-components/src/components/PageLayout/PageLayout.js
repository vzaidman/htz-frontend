import React, { Fragment } from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import getComponent from '../../utils/componentFromInputTemplate';
import Slot from './slot';

const sectionStyle = ({ theme, }) => ({
  backgroundColor: theme.color('primary', '-5'),
  width: '100%',
});
const Row = createComponent(sectionStyle, 'section');

const rearrangedSlots = oldSlots => (
  {
    preHeader: '',
    header: oldSlots.header,
    postHeader: oldSlots.main,
    main: {
      article: oldSlots.topwidesecondary,
      aside: oldSlots.aside,
    },
    postMain: oldSlots.bottom,
    footer: oldSlots.footer,
  }
)

function PageLayout({ slots, }) {
  const newSlots = rearrangedSlots(slots);// A temporary function which rearranges the current page layout according to tne soon to be layout
  return (
    <React.Fragment>
      {Object.keys(newSlots).map(key => {
        const Element = getComponent(key);
        return (
          <Row key={key}>
            <Slot
              content={<Element content={newSlots[key]} />}
            />
          </Row>
          )
      })}
    </React.Fragment>
  )
}

export default PageLayout;
