export function wrapper(theme) {
  return {
    backgroundImage: 'linear-gradient(to right, #faefca, #f7f5e6)',
    width: '100%',
    height: '71rem',
  };
}
export function innerWrapper(theme) {
  return {
    width: '170rem',
    margin: '0 auto',
    display: 'inline-block',
    float: 'start',
    marginInlineStart: '50%',
    transform: 'translateX(50%)',
    position: 'relative',
    height: '71rem',
  };
}
export function text1(theme) {
  return {
    fontWeight: 'bold',
    marginTop: '8rem',
    width: '60rem',
    float: 'start',
    extend: [ theme.type(9), ],
  };
}
export function text2(theme) {
  return {
    width: '60rem',
    float: 'start',
    marginTop: '3rem',
    marginBottom: '3rem',
    extend: [ theme.type(5), ],
  };
}
export function button(theme) {
  return { float: 'start', };
}

export function icon(theme) {
  return {
    position: 'relative',
    top: '-10rem',
    display: 'inline-block',
    float: 'start',
    size: 95,
  };
}
export function closeButton(theme) {
  return {
    fontSize: '3.5rem',
    position: 'absolute',
    top: '3rem',
    end: '3rem',
    cursor: 'pointer',
  };
}
export function footer(theme) {
  return {
    fontSize: '2rem',
    position: 'absolute',
    bottom: '4rem',
    start: '95rem',
  };
}
export function link(theme) {
  return {
    color: theme.color('primary'),
    textDecoration: 'underline',
    marginInlineStart: '0.3rem',
  };
}
export const buttonVariant = 'salesOpaque';
