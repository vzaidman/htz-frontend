import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

ListItem.propTypes = {
  /**
   * A node to be rendered inside the <ul><li> dropdown list.
   * Can be any object: such as component, button, href etc...
   */
  children: PropTypes.node.isRequired,
  /**
   * A style object to be used by the <li>.
   */
  // eslint-disable-next-line react/forbid-prop-types
  itemStyle: PropTypes.object.isRequired,
};

export default function ListItem({ children, itemStyle, }) {
  return (
    <FelaComponent
      style={itemStyle}
      render={({ className, }) => <li className={className}>{children}</li>}
    />
  );
}
