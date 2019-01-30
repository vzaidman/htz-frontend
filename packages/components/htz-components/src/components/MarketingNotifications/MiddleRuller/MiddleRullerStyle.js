export function wrapper(theme) {
  return {
    marginTop: '7rem',
    backgroundImage:
      'radial-gradient(circle at 51% 50%, #f4d835, rgba(249, 227, 76, 0.56) 69%, rgba(255, 241, 105, 0))',
    color: theme.color('neutral'),
    minHeight: '9rem',
    extend: [
      theme.type(3),
      theme.mq(
        {
          until: 'l',
        },
        {
          display: 'none',
        }
      ),
    ],
  };
}

export const innerWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '9rem',
};

export function text1(theme) {
  return {
    extend: [ theme.mq({ until: 'm', }, { fontWeight: '400', }), ],
  };
}

export function icon(theme) {
  return {
    color: theme.color('primary', '-1'),
    fontSize: 5,
  };
}

export function iconWrapper(theme) {
  return {
    marginInlineEnd: '2rem',
  };
}

export function button(theme) {
  return {
    ...theme.mq(
      { from: 'm', },
      {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        marginInlineStart: '2rem',
      }
    ),
  };
}

export const buttonVariant = 'salesOpaque';
