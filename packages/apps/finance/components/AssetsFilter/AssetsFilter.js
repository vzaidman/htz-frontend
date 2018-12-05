// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Select, Button, } from '@haaretz/htz-components';

import type { Node, } from 'react';

type Filter = {
  display: string,
  value: {
    queryString: string | number,
    subFilters?: Filters,
  },
}

type Filters = {
  title: string,
  value: string,
  fields: Array<Filter>,
}

type Props = {
  filters: Filters,
  children: ({ filters: Array<{ key: string, value: string, }>, }) => Node,
}

type State = {
  selectedFilters: Object,
  filters: Array<{ key: string, value: string, }>,
}

const SelectionLabel = ({ content, }: { content: string, }) => (
  <FelaComponent
    style={{
      fontWeight: '700',
      marginEnd: '1rem',
    }}
    render="span"
  >
    {content}
  </FelaComponent>
);

type DropDownProps = {
  items: Filters,
  changeFilter: (string, Filter) => void,
  selectedFilter: Object,
}

const getFilters: Filters => Object = filters => {
  let results = {};
  const filter: Filter = filters.fields[0];
  results[filters.value] = filter;
  if (filter.value.subFilters) {
    const newFilter = getFilters(filter.value.subFilters);
    results = { ...results, ...newFilter, };
  }
  return results;
};

const extractFilters: Object => Array<{ key: string, value: string, }> = selectedFilters => {
  const filters = [];
  Object.keys(selectedFilters).forEach(key => (selectedFilters[key]
    && filters.push({
      key,
      value: selectedFilters[key].value.queryString,
    })
  ));
  return filters;
};

class AssetsFilter extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    const { filters, } = nextProps;
    const selectedFilters: Object = prevState
      ? prevState.selectedFilters
      : { ...getFilters(filters), };
    return !prevState
      ? { selectedFilters, filters: extractFilters(selectedFilters), }
      : prevState;
  }

  updateSelection: (string, ?Filter) => void = (value, filter = null) => {
    const { selectedFilters, } = this.state;
    selectedFilters[value] = filter;
    this.setState({
      selectedFilters,
    });
  };

  dropDown: (DropDownProps) => Node = ({ items, changeFilter, selectedFilter, }) => {
    const { selectedFilters, } = this.state;
    if (!selectedFilters[items.value]) {
      changeFilter(items.value, items.fields[0]);
    }
    return (
      <Fragment>
        <FelaComponent
          style={{
            marginEnd: '3rem',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <SelectionLabel content={items.title} />
          <Select
            wrapperStyles={{
              marginEnd: '4rem',
            }}
            onChange={filter => changeFilter(items.value, filter)}
            variant="graph"
            onUnMount={() => this.updateSelection(items.value)}
            controlledSelectedItem={{
              value: selectedFilters[items.value] ? selectedFilters[items.value].value : items.fields[0].value,
              display: selectedFilters[items.value] ? selectedFilters[items.value].display : items.fields[0].display,
              key: selectedFilters[items.value] ? selectedFilters[items.value].value.queryString : items.fields[0].value.queryString,
            }}
            items={
              items.fields.map((item: Filter) => (
                {
                  value: item.value,
                  display: item.display,
                  key: item.value.queryString,
                }
              ))
            }
            attrs={{ 'aria-hidden': true, }}
            buttonMiscStyles={{
              paddingBottom: '0.5rem',
              paddingTop: '0.5rem',
              whiteSpace: 'nowrap',
              minWidth: '15rem',
            }}
          />
        </FelaComponent>
        {
          selectedFilter && selectedFilter.value.subFilters
            ? this.dropDown({
              items: selectedFilter.value.subFilters,
              changeFilter: (value, selected) => this.updateSelection(value, selected),
              selectedFilter: selectedFilters[selectedFilter.value.subFilters.value],
            })
            : null
        }
      </Fragment>
    );
  };

  render(): Node {
    const { filters, children, } = this.props;
    const { selectedFilters, } = this.state;
    return (
      <Fragment>
        <FelaComponent style={{ position: 'relative', }}>
          <FelaComponent
            style={theme => ({
              ...theme.type(-2),
              alignItems: 'baseline',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingStart: '2rem',
              paddingEnd: '2rem',
              position: 'absolute',
              start: '0',
              top: '0',
              width: '100%',
            })}
          >
            {this.dropDown({
              items: filters,
              changeFilter: (value, selectedFilter) => this.updateSelection(value, selectedFilter),
              selectedFilter: selectedFilters[filters.value],
            })}
            <Button
              boxModel={{ hp: 2, vp: 0.5, }}
              fontSize={-1}
              variant="primaryOpaque"
              onClick={() => this.setState({
                filters: extractFilters(selectedFilters),
              })}
              miscStyles={{
                marginRight: 'auto',
              }}
            >
              הצג
            </Button>
          </FelaComponent>
        </FelaComponent>
        {children({ filters: this.state.filters, })}
      </Fragment>
    );
  }
}

export default AssetsFilter;
