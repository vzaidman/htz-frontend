import React, { Fragment } from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const sectionStyle = ({ theme, }) => ({
  backgroundColor: theme.color('primary', '-5'),
  width: '100%',
});
const Row = createComponent(sectionStyle, 'section');

const slotStyle = ({ miscStyles, theme, }) => ({
  backgroundColor: theme.color('primary', '-6'),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',

  ...parseComponentProp(
    'maxWidth',
    [
      { until: 'm', value: 320/6 },
      { from: 'm', until: 'l', value: 100 },
      { from: 'l', until: 'xl', value: 1024/6 },
      { from: 'xl', value: 1293/7 },
    ],
    theme.mq,
    mediaQueryCallback
  ),

  ...miscStyles,
})

const Slot = createComponent(slotStyle);

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
            <Slot>
              <Element content={newSlots[key]} />
            </Slot>
          </Row>
          )
      })}
    </React.Fragment>
  )
}

export default PageLayout;
