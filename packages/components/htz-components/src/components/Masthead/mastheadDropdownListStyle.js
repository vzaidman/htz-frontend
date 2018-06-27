export const dropdownItemStyle = theme => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.color('primary', '+1'),
  display: 'flex',
  ':last-child': {
    borderBottomStyle: 'none',
  },
  extend: [ theme.type(-2), ],
});

export const dropdownListStyle = theme => ({
  backgroundColor: theme.color('secondary', '+1'),
  color: theme.color('neutral', '-10'),
  display: 'inline-block',
  fontWeight: '700',
  minHeight: '100%',
  // TODO: this looks a little weird...
  minWidth: '100%',
  position: 'absolute',
  zIndex: '100',
  '& *': {
    ':focus': {
      outline: 'none',
    },
  },
});
