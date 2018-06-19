import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { LevelConsumer, LevelProvider, } from './LevelContext';

Section.propTypes = {
  /** The Sections children nodes   */
  children: PropTypes.node,
  /** Should the Section Render as a react Fragment?   */
  isFragment: PropTypes.bool,
  /** The HTML tag to render the `<Section />` as */
  tagName: PropTypes.string,
};

Section.defaultProps = {
  children: null,
  isFragment: false,
  tagName: 'section',
};

function Section({ children, isFragment, tagName, }) {
  const Tag = isFragment ? Fragment : tagName;
  return (
    <LevelConsumer>
      {level => (
        <LevelProvider value={level + 1}>
          <Tag>{children}</Tag>
        </LevelProvider>
      )}
    </LevelConsumer>
  );
}

export default Section;
