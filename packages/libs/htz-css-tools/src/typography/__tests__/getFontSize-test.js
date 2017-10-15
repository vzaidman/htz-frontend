import getFontSize from '../getFontSize';

describe('## getFontSize()', () => {
  it('Should scale up correctly with default settings', () => {
    expect(getFontSize(0)).toEqual(16);
  });
  it('Should scale down correctly with default settings', () => {
    expect(getFontSize(-1)).toEqual(14);
  });
  it('Should return corrent result with arity of 2', () => {
    expect(getFontSize(1, 18)).toEqual(21);
  });
  it('Should return corrent result with arity of 3', () => {
    expect(getFontSize(1, 18, 3)).toEqual(22);
  });
  it('Should return corrent result with arity of 4', () => {
    expect(getFontSize(1, 18, 3, 4)).toEqual(24);
  });
  it('Should multiply by "ratio" after given steps', () => {
    const base = 18;
    const ratio = 3;
    const steps = 4;
    expect(getFontSize(steps, base, ratio, steps)).toEqual(base * ratio);
  });
  it('Should divide by "ratio" after given steps', () => {
    const base = 18;
    const ratio = 3;
    const steps = 4;
    expect(getFontSize(steps * -1, base, ratio, steps)).toEqual(base / ratio);
  });
});
