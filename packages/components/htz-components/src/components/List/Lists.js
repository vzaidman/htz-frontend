
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `listsFileTemplate.js` file is this directory.
 * *************************************************************** */

/* eslint-disable import/no-unresolved */
import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import mocks from '../../../styleguide/mocks';

const mock = mocks.List;

const views = {
  Example: dynamic(import('./views/Example/Example.view.js')),
  Bender: dynamic(import('./views/Bender')),
  Leela: dynamic(import('./views/Leela/Leela.view.js')),
  Zoidberg: dynamic(import('./views/Zoidberg/Zoidberg.view.js')),
};

const listWrapperStyle = () => ({
  maxWidth: '75%',
  margin: '0 auto',
});

const ListWrapper = createComponent(listWrapperStyle, 'div');

const menuListStyle = () => ({
  appearance: 'menulist',
});

const MenuList = createComponent(menuListStyle, 'select', props =>
  Object.keys(props)
);

/*
  * A list component that may comes in a variety of views.
  */
export default class List extends React.Component {
  static propTypes = {
    /**
     * List's contentId.
     */
    contentId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    /**
     * List's view name.
     */
    view: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  };

  state = {
    type: null,
  };

  onSelect = e => {
    if (e.target.selectedOptions) {
      const type = e.target.selectedOptions[0].value;
      this.setState({
        type,
      });
    }
  };

  render() {
    const ExampleList = views[this.state.type];
    return (
      <div style={{ position: 'relative', }}>
        <MenuList
          name="viewType"
          onChange={this.onSelect}
          defaultValue="placeHolder"
        >
          <option value="placeHolder" disabled>
            Select a preview
          </option>
          <option value="Example">Example</option>
          <option value="Bender">Bender</option>
          <option value="Leela">Leela</option>
          <option value="Zoidberg">Zoidberg</option>
        </MenuList>
        {this.state.type && (
          <ListWrapper>
            <ExampleList data={{ list: mock(), }} />
          </ListWrapper>
        )}
      </div>
    );
  }
}
