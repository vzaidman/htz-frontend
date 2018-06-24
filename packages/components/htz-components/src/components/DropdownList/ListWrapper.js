import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import { FelaComponent, } from 'react-fela';
import ListItem from './ListItem';

ListWrapper.propTypes = {
  /**
   * A node to be rendered inside the <ul><li> dropdown list.
   * Can be any object: such as component, button, href etc...
   */
  children: PropTypes.node.isRequired,
  /**
   * A style object to be used by the <ul>.
   * If none is sent there will be no style.
   */
  // eslint-disable-next-line react/forbid-prop-types
  listStyle: PropTypes.object.isRequired,
  /**
   * A style object to be used by the <ul>.
   * If none is sent there will be no style.
   */
  // eslint-disable-next-line react/forbid-prop-types
  itemStyle: PropTypes.object.isRequired,
};

export default function ListWrapper({ children, listStyle, itemStyle, }) {
  return (
    <FelaComponent
      rule={listStyle}
      render={({ className, }) => (
        <FocusLock>
          <ul className={className}>
            {children.map(child => (
              <ListItem itemStyle={itemStyle} key={child.key}>
                {child}
              </ListItem>
            ))}
          </ul>
        </FocusLock>
      )}
    />
  );
}
