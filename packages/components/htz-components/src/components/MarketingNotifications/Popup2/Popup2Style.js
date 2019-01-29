export function wrapper(theme) {
  return {
    color: theme.color('neutral', '-1'),
    textAlign: 'center',
    extend: [ theme.type(4), ],
  };
}

export const innerWrapper = {};

export function text1(theme) {
  return {
    marginTop: '3rem',
    lineHeight: '140%',
    ...theme.type(2),
  };
}

export function text2(theme) {
  return {
    fontWeight: 'bold',
    marginTop: '0',
    lineHeight: '140%',
    color: theme.color('primary', '+1'),
    ...theme.type(9),
  };
}

export function button(theme) {
  return {
    marginTop: '4rem',
    paddingRight: '2rem',
    paddingLeft: '2rem',
    ...theme.type(1),
  };
}

export function closeButton(theme) {
  return {
    position: 'absolute',
    top: '0',
    left: '0',
    fontSize: '3.5rem',
    cursor: 'pointer',
    color: theme.color('primary'),
  };
}

export const buttonVariant = 'salesOpaque';
