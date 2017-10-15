import getTypeProps from '../getTypeProps';

describe('getTypeProps()', () => {
  it('throws if "step" isn\'t defined', () => {
    expect(() => getTypeProps({ ratio: 4, })).toThrow(/"step".*must be defined/);
  });

  it('throws if no argument is passed', () => {
    expect(() => getTypeProps()).toThrow(/"step".*must be defined/);
  });

  describe('Default', () => {
    const fz = 18;
    const lh = 24;
    const result = getTypeProps({ step: 1, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / 6);
    });
  });

  describe('Non default "base"', () => {
    const fz = 18;
    const lh = 24;
    const result = getTypeProps({ step: 0, base: 18, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / 6);
    });
  });

  describe('Non default "rhythmUnit"', () => {
    const fz = 16;
    const lh = 21;
    const rhythmUnit = 7;
    const result = getTypeProps({ step: 0, rhythmUnit, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / rhythmUnit);
    });
  });

  describe('Non default "minPadding"', () => {
    const fz = 18;
    const lh = 30;
    const result = getTypeProps({ step: 1, minPadding: 4, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / 6);
    });
  });

  describe('Non default "ratio"', () => {
    const fz = 20;
    const lh = 24;
    const result = getTypeProps({ step: 1, ratio: 3, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / 6);
    });
  });

  describe('Non default "stepsPerInterval"', () => {
    const fz = 20;
    const lh = 24;
    const result = getTypeProps({ step: 1, stepsPerInterval: 3, });
    it('Return correct "fontSize" with default settings', () => {
      expect(result.fontSize).toEqual(fz);
    });
    it('Return correct "lineHeight" with default settings', () => {
      expect(result.lineHeight).toEqual(lh);
    });
    it('Return correct "relativeLineHeight" with default settings', () => {
      expect(result.relativeLineHeight).toEqual(lh / fz);
    });
    it('Return correct "lines" with default settings', () => {
      expect(result.lines).toEqual(lh / 6);
    });
  });
});
