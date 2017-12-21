import React from 'react';
import { createComponent, } from 'react-fela';

import PropTypes from 'prop-types';

const radioGroupPropTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelection: PropTypes.func,
  groupName: PropTypes.string.isRequired,
};

const radioGroupDefaultProps = {
  onSelection: null,
};

const selectionWrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  margin: '2rem 0',
});

const SelectionWrapper = createComponent(selectionWrapperStyle, 'div');

const selectionStyle = ({ isSelected, }) => ({
  justifyContent: 'center',
  padding: '0.5rem 1rem',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: isSelected ? 'transparent' : '#0B7EB5',
  color: isSelected ? '#FFF' : '#0B7EB5',
  margin: '0 1rem',
  backgroundColor: isSelected ? '#0B7EB5' : '#FFF',
  whiteSpace: 'nowrap',
});

const Selection = createComponent(selectionStyle, 'label');

export default class RadioGroup extends React.Component {
  state = {
    selectedIndex: null,
  };

  onSelected = e => {
    this.setState({
      selectedIndex: e.target.value,
      groupName: e.target.name,
    });
    this.props.onSelection(e);
  };

  render() {
    return (
      <SelectionWrapper>
        {
          this.props.options.map(
            (option, index) =>
              (
                <Selection
                  key={option.embedType}
                  isSelected={
                    this.state.groupName === this.props.groupName &&
                    this.state.selectedIndex &&
                    index === +this.state.selectedIndex
                  }
                >
                  <input type="radio" value={index} name={this.props.groupName} onChange={this.onSelected || false} />
                  {option.contentName}
                </Selection>
              )
          )
        }
      </SelectionWrapper>
    );
  }
}

RadioGroup.propTypes = radioGroupPropTypes;
RadioGroup.defaultProps = radioGroupDefaultProps;
