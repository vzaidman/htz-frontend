import visuallyHidden from '../visuallyHidden';

describe('visuallyHidden()', () => {
  it('return the correct css-in-js object with default settings', () => {
    expect(visuallyHidden()).toEqual({
      border: '0',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
    });
  });

  it('return the correct css-in-js object with isFocusable set to "true"', () => {
    expect(visuallyHidden(true)).toEqual({
      border: '0',
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',

      '&:active, &:focus': {
        clip: 'auto',
        clipPath: 'none',
        height: 'auto',
        margin: '0',
        overflow: 'visible',
        position: 'static',
        width: 'auto',
        whiteSpace: 'inherit',
      },
    });
  });
});
