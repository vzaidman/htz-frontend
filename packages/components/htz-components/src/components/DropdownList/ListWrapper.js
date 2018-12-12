import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import ListItem from './ListItem';
import { attrsPropType, } from '../../propTypes/attrsPropType';

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
  // Underlying component props //
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  closeList: PropTypes.func,
};

ListWrapper.defaultProps = {
  attrs: null,
  closeList: () => {},
};

export default function ListWrapper({ children, listStyle, itemStyle, attrs, closeList, }) {
  return (
    <FelaComponent
      rule={listStyle}
      render={({ className, }) => (
        <ul className={className} {...attrs}>
          {children.map(child => (
            <ListItem
              itemStyle={itemStyle}
              key={child.key}
              onBlur={e => {
                if (child === children.slice(-1)[0]) {
                  closeList();
                }
              }}
            >
              {child}
            </ListItem>
          ))}
        </ul>
      )}
    />
  );
}
