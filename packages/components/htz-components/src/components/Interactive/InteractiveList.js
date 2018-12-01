import React from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import mock from './examplesMock';

const components = {
  BeforeAndAfter: dynamic(import('./components/BeforeAndAfter')),
  HtmlElement: dynamic(import('./components/HtmlElement')),
};

const listWrapperStyle = () => ({
  maxWidth: '75%',
  margin: '0 auto',
});

const ListWrapper = createComponent(listWrapperStyle, 'div');

const menuListStyle = () => ({
  appearance: 'menulist',
});

const MenuList = createComponent(menuListStyle, 'select', props => Object.keys(props)
);

export default class Interactive extends React.Component {
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
    component: null,
  };

  onSelect = e => {
    if (e.target.selectedOptions) {
      const component = e.target.selectedOptions[0].value;
      this.setState({
        component,
      });
    }
  };

  render() {
    const Component = components[this.state.component];
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
          <option value="BeforeAndAfter">Before & After</option>
          <option value="HtmlElement">HTML Element</option>
        </MenuList>
        {this.state.component ? (
          <ListWrapper>
            <Component {...mock[this.state.component]} />
          </ListWrapper>
        ) : null}
      </div>
    );
  }
}
