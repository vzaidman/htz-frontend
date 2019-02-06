export function wrapper({ theme, isSmall, color, }) {
  return {
    backgroundImage: color(theme).background,
    color: theme.color('black'),
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: isSmall ? '10rem' : '25rem',
    transitionProperty: 'height',
    ...theme.getDelay('transition', 1),
    ...theme.getDuration('transition', 1),
    ...theme.getTimingFunction('transition', 'linear'),
    zIndex: theme.getZIndex('above', 11),
    extend: [ theme.type(-1), theme.mq({ until: 'm', }, { display: 'none', }), ],
  };
}

export function innerWrapper({ theme, isSmall, }) {
  return {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
  };
}

export function text1({ theme, isSmall, color, }) {
  return {
    fontWeight: 'bold',
    color: color(theme).textColor,
    extend: [ theme.type(4), ],
  };
}

export function text2({ theme, isSmall, color, }) {
  return {
    marginTop: '1rem',
    color: color(theme).textColor,
    extend: [ theme.type(2), theme.mq({ until: 'l', }, { marginTop: '0.5rem', }), ],
  };
}

export function closeButton(theme, isSmall) {
  return {
    position: 'absolute',
    color: theme.color('primary'),
    top: '2rem',
    end: '2rem',
    fontSize: '4rem',
    cursor: 'pointer',
  };
}

export function button(theme, isSmall) {
  return {
    ...theme.mq(
      { from: 'm', },
      {
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }
    ),
    marginStart: isSmall ? '2rem' : '0',
    marginTop: '1rem',
  };
}

export function icon(theme, isSmall) {
  return {
    color: theme.color('primary'),
    fontSize: isSmall ? 6 : 10,
    extend: [ theme.mq({ until: 'l', }, { fontSize: isSmall ? 6 : 8, }), ],
  };
}

export function textWrapper({ theme, isSmall, }) {
  return {
    display: 'flex',
    flexDirection: isSmall ? 'row' : 'column',
    alignItems: 'start',
    paddingInlineStart: isSmall ? '1rem' : '4rem',
  };
}

export const buttonVariant = 'salesOpaque';