export function wrapper(theme) {
  return {
    backgroundImage: 'radial-gradient(circle at 50% 50%, #169fd1, #0b7eb5)',
    color: theme.color('white'),
    extend: [
      theme.type(-1),
      theme.mq(
        {
          until: 'm',
        },
        {
          minHeight: '8rem',
          width: '100%',
          padding: '1rem 2rem',
          lignHeight: '130%',
        }
      ),
    ],
  };
}

export const innerWrapper = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '7rem',
};

export function text1(theme) {
  return {
    fontWeight: 'bold',
    extend: [ theme.mq({ until: 'm', }, { fontWeight: '400', }), ],
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
