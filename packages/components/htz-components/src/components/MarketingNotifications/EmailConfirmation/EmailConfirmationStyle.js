export function wrapper(theme) {
  return {
    background: theme.color('white'),
    height: '46rem',
  };
}

export function innerWrapper(theme) {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
}

export function text1(theme) {
  return {
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '0.3rem',
    extend: [ theme.type(5), ],
  };
}
export function text2(theme) {
  return {
    marginBottom: '3rem',
    extend: [ theme.type(2), ],
  };
}
export function button(theme) {
  return { paddingTop: '0.5rem', paddingBottom: '0.5rem', };
}

export function icon(theme) {
  return {
    marginTop: '-7rem',
    height: '27rem',
    overflow: 'hidden',
    size: 60,
  };
}
export function closeButton(theme) {
  return {
    fontSize: '3.5rem',
    position: 'absolute',
    top: '3rem',
    end: '3rem',
    color: theme.color('primary'),
    cursor: 'pointer',
  };
}
export const buttonVariant = 'salesOpaque';
