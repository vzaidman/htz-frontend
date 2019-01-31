export default ({ theme, }) => ({
  color: theme.color('primary'),
  backgroundColor: 'transparent',
  transitionProperty: 'all',

  '&:hover': {
    color: theme.color('white'),
    backgroundColor: theme.color('primary'),
  },
  '&:focus': {
    color: theme.color('white'),
    backgroundColor: theme.color('primary'),
    outline: 'none',
  },

  extend: [
    theme.getTransition(1, 'swiftIn'),
  ],
});
