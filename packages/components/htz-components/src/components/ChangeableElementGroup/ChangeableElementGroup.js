/* global window */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

import Debug from '../Debug/Debug';
import getComponent from '../../utils/componentFromInputTemplate';

const content = {
  contentName: PropTypes.string,
  contentId: PropTypes.string,
  inputTemplate: PropTypes.string,
};
const dfpBannerType = {
  contentName: PropTypes.string,
  contentId: PropTypes.string,
  inputTemplate: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.string,
  audianceTarget: PropTypes.string,
  hideOnSite: PropTypes.bool,
};
const gridElementGroup = {
  contentName: PropTypes.string,
  contentId: PropTypes.string,
  inputTemplate: PropTypes.string,
  items: PropTypes.array,
};
const listType = {
  contentName: PropTypes.string,
  contentId: PropTypes.string,
  inputTemplate: PropTypes.string,
  title: PropTypes.string,
  view: PropTypes.string,
  hasPagination: PropTypes.bool,
};

const propTypes = {
  scrollY: PropTypes.number.isRequired,
  contentLists: PropTypes.arrayOf(
    PropTypes.shape({
      displayDuration: PropTypes.number.isRequired,
      content: PropTypes.oneOfType([
        dfpBannerType,
        gridElementGroup,
        listType,
        content,
      ]),
    })
  ).isRequired,
  hideOnSite: PropTypes.bool.isRequired,
  inputTemplate: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  totalDisplay: PropTypes.number.isRequired,
};

function ChangeableElementGroup({ scrollY, contentLists, totalDisplay, }) {
  const getElementIndex = posY => {
    let prev = 0;
    for (const [ index, item, ] of contentLists.entries()) {
      if (posY > item.displayDuration + prev) {
        prev += item.displayDuration;
      }
      else return index;
    }
    return null;
  };

  const elementIndex = getElementIndex(scrollY % totalDisplay);
  const element = contentLists[elementIndex].content;
  const Element = getComponent(element.inputTemplate);
  const { properties, ...elementWithoutProperties } = element;
  return (
    <Fragment>
      <Debug>{`Scroll-Y at: ${scrollY}`}</Debug>
      <Element
        key={element.contentId}
        {...elementWithoutProperties}
        {...properties}
      />
    </Fragment>
  );
}

ChangeableElementGroup.propTypes = propTypes;

export default ChangeableElementGroup;
