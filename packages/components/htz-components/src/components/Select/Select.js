import React, { Component, } from 'react';
import PropTypes, { oneOf, shape, oneOfType, } from 'prop-types';
import Downshift from 'downshift';
import { createComponent, FelaComponent, } from 'react-fela';
import { borderTop, borderBottom, parseStyleProps, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import selectStyle from './selectStyle';
import Note from '../Note/Note';

const selectVariants = oneOf([ 'primary', 'graph', ]);

const itemPropType = shape({
  display: PropTypes.string,
  value: oneOfType([ PropTypes.string, PropTypes.number, ]).isRequired,
  key: oneOfType([ PropTypes.string, PropTypes.number, ]),
});

const StyledSelectWrapper = createComponent(selectStyle);

const dropDownMenuStyle = ({ theme, variant, }) => ({
  display: 'flex',
  flexDirection: 'column',
  extend: [
    borderBottom(
      `${theme.selectStyle.borderWidth}px`,
      0,
      theme.selectStyle.borderStyle,
      theme.color('select', `${variant}Border`)
    ),
  ],
});

const ItemStyle = ({ theme, variant = 'primary', isSelected, activeItem, buttonMiscStyles, }) => ({
  width: '100%',
  textAlign: 'start',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ...(isSelected ? { fontWeight: 'bold', } : {}),
  backgroundColor:
    activeItem || isSelected
      ? theme.color('select', `${variant}HighlightedBg`)
      : theme.color('select', `${variant}Bg`),
  ':focus': {
    outline: 'none',
  },
  extend: [
    borderTop(
      `${theme.selectStyle.borderWidth}px`,
      theme.selectStyle.lines,
      theme.selectStyle.borderStyle,
      theme.color('select', `${variant}BorderItem`)
    ),
    {
      ':before': {
        left: '0',
        right: '0',
      },
    },
    {
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
    ...(buttonMiscStyles ? parseStyleProps(buttonMiscStyles, theme.mq, theme.type) : []),
  ],
});

const StyledItem = createComponent(ItemStyle, 'button', props => {
  /* eslint-disable no-unused-vars */
  const {
    activeItem,
    isOpen,
    isSelected,
    noHighlitedItems,
    buttonMiscStyles,
    ...noCustomAtrrProps
  } = props;
  return Object.keys(noCustomAtrrProps);
});

const selectedItemStyle = ({ noHighlitedItems, theme, variant, isOpen, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...(!isOpen
    ? {
      ':focus': {
        backgroundColor: theme.color('select', `${variant}FocusBg`),
      },
    }
    : {}),
  ':after': {
    content: '""',
    width: 0,
    height: 0,
    borderLeft: '0.3em solid transparent',
    borderRight: '0.3em solid transparent',
    borderTop: `0.5em solid ${theme.color('select', `${variant}ArrowColor`)}`,

    transitionProperty: 'all',
    transformOrigin: 'center center',
    ...theme.getTransition(0, 'swiftIn'),
    ...(isOpen ? { transform: 'rotate(180deg)', } : {}),
  },
  extend: [
    {
      ':before': { content: '', },
    },
  ],
});

const StyledSelectedItem = createComponent(
  selectedItemStyle,
  StyledItem,
  props => {
    /* eslint-disable no-unused-vars */
    const { isOpen, noHighlitedItems, variant, buttonMiscStyles, ...noCustomAtrrProps } = props;
    return Object.keys(noCustomAtrrProps);
  }
);

export class Select extends Component {
  static propTypes = {
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying react element
     */
    attrs: attrsPropType,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    buttonMiscStyles: stylesPropType,
    /**
     * selectedItem of a controlled `<Select />`.
     * Should never be passed manually by the consumer, but rather
     * set by the controlling component.
     */
    controlledSelectedItem: itemPropType,
    /**
     * The initial selected item of an uncontrolled `<Select />`.
     *
     * Only relevant when using an uncontrolled select.
     * Allows specifying the initial item but leaving subsequent
     * updates uncontrolled.
     */
    defaultSelectedItem: itemPropType,
    /** error note to display if input is passed a `isError` prop */
    errorText: PropTypes.string,
    /** Is this RadioGroup in error state */
    isError: PropTypes.bool,
    /**
     * An Array of option Objects for the Select,
     *
     * display key is the display string that will show in the Select
     *
     * the value key is the value of the input when option is chosen
     *
     * if the value is not unique, a unique key should be given to each option
     */
    items: PropTypes.arrayOf(itemPropType).isRequired,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
    /**
     * Id used to connect the note to `RadioGroup` with aria-describedby for a11y reasons,
     * default will generate random id
     */
    noteId: PropTypes.string,
    /** Note explaining the RadioGroup field  */
    noteText: PropTypes.string,
    /**
     * A callback that gets called when a RadioButton is Blurred
     * @param {SyntheticEvent} evt - The event object
     */
    onBlur: PropTypes.func,
    /**
     * A callback that gets the the new selectedItem
     * @param {object} item - The selected Item Object
     */
    onChange: PropTypes.func,
    /**
     * A callback that gets called when a `RadioButton` is focused
     * @param {SyntheticEvent} evt - The event object
     */
    onFocus: PropTypes.func,
    /** The placeholder to display when no item is selected */
    placeholder: PropTypes.string,
    /**
     * The refFunc is passed to the wrapping div
     * A callback function to allow parent component to get ref of Select,
     * example use case: focusing the Select.
     */
    refFunc: PropTypes.func,
    /** The `<Select />`'s stylistic variant */
    variant: PropTypes.oneOfType([
      selectVariants,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: selectVariants.isRequired,
        })
      ),
    ]),
  };
  static defaultProps = {
    attrs: null,
    buttonMiscStyles: null,
    controlledSelectedItem: null,
    defaultSelectedItem: null,
    errorText: null,
    isError: false,
    noteId: null,
    noteText: null,
    miscStyles: null,
    onBlur: null,
    onChange: null,
    onFocus: null,
    placeholder: 'בחר אחת מהאפשרויות הבאות',
    refFunc: null,
    variant: 'primary',
  };

  state = {
    noteId: this.props.noteId
      ? this.props.noteId
      : this.props.errorText || this.props.noteText
        ? Math.random().toString()
        : null,
    selectedItem: null,
  };

  handleChange = selectedItem => {
    this.setState({ selectedItem, });
    if (this.props.onChange) this.props.onChange(selectedItem);
  };

  render() {
    const {
      attrs,
      buttonMiscStyles,
      controlledSelectedItem,
      defaultSelectedItem,
      errorText,
      items,
      isError,
      noteId,
      noteText,
      miscStyles,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      refFunc,
      variant,
    } = this.props;
    const selectedItem = controlledSelectedItem || this.state.selectedItem;
    const selectedItemIndex = items
      .map(item => item.key || item.value)
      .indexOf(selectedItem ? selectedItem.key || selectedItem.value : null);

    return (
      <FelaComponent
        style={{ position: 'relative', }}
        render={({ className, theme, }) => (
          <div className={className}>
            <Downshift
              selectedItem={selectedItem}
              {...(defaultSelectedItem ? { defaultSelectedItem, } : {})}
              defaultHighlightedIndex={selectedItem ? selectedItemIndex : 0}
              itemToString={item => (item ? item.display : null)}
              onChange={this.handleChange}
              render={({
                isOpen,
                getButtonProps,
                getItemProps,
                highlightedIndex,
                toggleMenu,
                selectItemAtIndex,
              }) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                  {...attrs}
                  onKeyDown={evt => {
                    if (isOpen) {
                      if (evt.keyCode === 9) toggleMenu();
                      if (evt.keyCode === 32) {
                        selectItemAtIndex(highlightedIndex);
                      }
                    }
                  }}
                >
                  <StyledSelectWrapper
                    miscStyles={miscStyles}
                    isOpen={isOpen}
                    variant={variant}
                  >
                    <StyledSelectedItem
                      {...getButtonProps({
                        'aria-label': theme.selectAriaLabel.text,
                        buttonMiscStyles,
                        variant,
                        isOpen,
                        noHighlitedItems: highlightedIndex === null,
                        type: 'button',
                        ...(refFunc ? { innerRef: el => refFunc(el), } : {}),
                        ...(onBlur ? { onBlur, } : {}),
                        ...(onFocus ? { onFocus, } : {}),
                      })}
                    >
                      {selectedItem
                        ? selectedItem.display || selectedItem.value
                        : placeholder}
                    </StyledSelectedItem>
                    <FelaComponent style={{ position: 'relative', }}>
                      {isOpen ? (
                        <FelaComponent
                          rule={dropDownMenuStyle}
                          variant={variant}
                          render={({ className, }) => (
                            <div
                              className={className}
                              data-test="dropdown-menu"
                            >
                              {items.map((item, index) => (
                                <StyledItem
                                  {...getItemProps({
                                    buttonMiscStyles,
                                    item,
                                    key: item.key || item.value,
                                    activeItem: highlightedIndex === index,
                                    isSelected: selectedItem === item,
                                    role: 'button',
                                  })}
                                >
                                  {item.display || item.value}
                                </StyledItem>
                              ))}
                            </div>
                          )}
                        />
                      ) : null}
                    </FelaComponent>
                  </StyledSelectWrapper>
                </div>
              )}
            />
            {errorText || noteText ? (
              <Note
                text={isError ? errorText : noteText}
                isError={isError}
                noteId={this.state.noteId}
              />
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default Select;
