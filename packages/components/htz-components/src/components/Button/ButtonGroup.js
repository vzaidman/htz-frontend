import React, { Component, Children, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import debounce from 'lodash/debounce';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import hasMatchMedia from '../../utils/hasMatchMedia';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const ButtonGroupPropTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * Nodes rendered inside `Button`.
   * Passed to the underlying react element
   */
  children: PropTypes.node,
  /**
   * A value for the `button`s `id` attribute.
   * Passed to the underlying react element
   */
  id: PropTypes.string,
  /**
   * a `<ButtonGroup />` `direction`, or an array of responsive options objects,
   * each with a `direction` as its value property.
   */
  isColumn: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      /** Indicates the direction of the ButtonGroup on serverRender (when window size isn't available) */
      onServerRender: PropTypes.bool.isRequired,
      /** An object with breakpoint definitions */
      queries: PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: PropTypes.bool.isRequired,
        })
      ).isRequired,
    }),
  ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const ButtonGroupDefaultProps = {
  attrs: null,
  children: null,
  id: null,
  isColumn: false,
  miscStyles: null,
};

const ButtonGroupStyles = ({ isColumn, miscStyles, theme, }) => ({
  display: 'flex',
  extend: [
    parseComponentProp(
      'isColumn',
      typeof isColumn === 'boolean' ? isColumn : isColumn.queries,
      theme.mq,
      groupDirection
    ),
    // Trump all other styles with those defined in `miscStyles`
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export class ButtonGroup extends Component {
  static propTypes = ButtonGroupPropTypes;
  static defaultProps = ButtonGroupDefaultProps;

  state = {
    isColumn:
      typeof this.props.isColumn === 'object'
        ? this.props.isColumn.onServerRender
        : this.props.isColumn,
  };

  componentWillMount() {
    const hasMatchMediaInScope = hasMatchMedia();
    const isColumn = this.props.isColumn;
    const isColumnIsResponsive = typeof isColumn === 'object';

    if (hasMatchMediaInScope) this.setState({ hasMatchMedia, });
    if (hasMatchMediaInScope && isColumnIsResponsive) {
      this.getUpdatedIsColumn();
      // eslint-disable-next-line no-undef
      window.addEventListener('resize', debounce(this.getUpdatedIsColumn, 150));
    }
  }

  componentDidMount() {
    if (typeof this.state.hasMatchMedia === 'undefined') {
      // As a general rule of thumb, setting state inside `componentDidMount` is a bad idea
      // since it will cause a visible re-render, however, this is exactly what we aim to do here,
      // since we cannot relay on window state in the server.
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ hasMatchMedia: hasMatchMedia(), });
    }
    const isColumn = this.props.isColumn;
    const isColumnIsResponsive = typeof isColumn === 'object';
    if (isColumnIsResponsive && this.state.hasMatchMedia) {
      this.getUpdatedIsColumn();
      // eslint-disable-next-line no-undef
      window.addEventListener('resize', debounce(this.getUpdatedIsColumn, 150));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isColumn !== nextState.isColumn || this.props !== nextProps
    );
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', this.getUpdatedIsColumn);
    }
  }

  getUpdatedIsColumn = () => {
    const isColumn = this.props.isColumn;
    const isColumnIsResponsive = typeof isColumn === 'object';
    const defaultValue = isColumnIsResponsive
      ? isColumn.onServerRender
      : isColumn;

    // When not responsive
    if (!isColumnIsResponsive) {
      this.setState({
        isColumn: defaultValue,
        hasMatchMedia,
      });
    }
    else if (!hasMatchMedia()) {
      // When matchMedia doesn't exist
      this.setState({
        isColumn: defaultValue,
        hasMatchMedia: false,
      });
    }
    else {
      // When responsive and matchMedia exists
      this.setState((prevState, props) => ({
        isColumn: mediaMatchesQuery(props.theme.bps, isColumn),
        hasMatchMedia: true,
      }));
    }
  };

  render() {
    const {
      attrs,
      children,
      isColumn, // eslint-disable-line no-unused-vars
      miscStyles, // eslint-disable-line no-unused-vars
      theme, // eslint-disable-line
      ...props
    } = this.props;
    return (
      <div {...attrs} {...props}>
        {/*
          Pass down `isColumn`  and group placement to children so they
          can alter their appearance
        */}
        {Children.map(
          children,
          (child, index) =>
            (React.isValidElement(child)
              ? React.cloneElement(child, {
                isColumn: this.state.isColumn,
                boxModel: getGroupPlacement(
                  child,
                  index,
                  Children.count(children)
                ),
              })
              : child)
        )}
      </div>
    );
  }
}

function groupDirection(prop, isColumn) {
  return { flexDirection: isColumn ? 'column' : 'row', };
}

function getGroupPlacement(child, index, length) {
  const groupPlacement =
    index === 0 ? 'start' : index === length - 1 ? 'end' : 'middle';
  const childBoxModel = child.props.boxModel;

  return !childBoxModel
    ? { groupPlacement, }
    : Array.isArray(childBoxModel)
      ? childBoxModel.map(item => {
        if (item.value && item.value.groupPlacement) return item;
        return {
          ...item,
          ...{ value: { ...item.value, ...{ groupPlacement, }, }, },
        };
      })
      : childBoxModel.groupPlacement
        ? childBoxModel
        : { ...childBoxModel, groupPlacement, };
}

const StyledButtonGroup = createComponent(
  ButtonGroupStyles,
  withTheme(ButtonGroup),
  [ 'attrs', 'isColumn', ]
);

ButtonGroup.PropTypes = ButtonGroupPropTypes;
ButtonGroup.defaultProps = ButtonGroupDefaultProps;
StyledButtonGroup.PropTypes = ButtonGroupPropTypes;
StyledButtonGroup.defaultProps = ButtonGroupDefaultProps;

export default StyledButtonGroup;
