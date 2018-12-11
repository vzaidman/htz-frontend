import rgba from '../rgba';

describe('rgba()', () => {
  describe('argument types', () => {
    test('return null if `color` is not a string', () => {
      expect(rgba(100, 0.3)).toBe(null);
    });
    test('return null if `opacity` is not a number', () => {
      expect(rgba('#ccc', '00')).toBe(null);
    });
  });
  describe('handle already opacified colors', () => {
    test('return rgba color unchanged', () => {
      expect(rgba('rgba(2,2,2,0.2)', 0.5)).toBe('rgba(2,2,2,0.2)');
    });
    test('return rgba color unchanged', () => {
      expect(rgba('hsla(2,2,2,0.2)', 0.5)).toBe('hsla(2,2,2,0.2)');
    });
  });
  describe('opacity', () => {
    test('correctly apply provided opacity when its between 0 and 1', () => {
      expect(rgba('#000', 0.3)).toBe('rgba(0,0,0,0.3)');
    });
    test('apply maximal opacity of 1', () => {
      expect(rgba('#000', 1.3)).toBe('rgba(0,0,0,1)');
    });
    test('apply minimal opacity of 0', () => {
      expect(rgba('#000', -1.3)).toBe('rgba(0,0,0,0)');
    });
    test("assign alpha of 1 when opacity isn't passed", () => {
      expect(rgba('#000')).toBe('rgba(0,0,0,1)');
    });
  });
  describe('with hex colors', () => {
    test('return null for invalid hex string', () => {
      expect(rgba('#aa', 0.3)).toBe(null);
      expect(rgba('#aabbccdd', 0.3)).toBe(null);
      expect(rgba('#0000')).toBe(null);
    });
    test('correctly process hex value without a #', () => {
      expect(rgba('000', 0.3)).toBe('rgba(0,0,0,0.3)');
    });
    test('correctly convert a hex of three letters', () => {
      expect(rgba('#000', 0.3)).toBe('rgba(0,0,0,0.3)');
    });
    test('correctly convert a hex of six letters', () => {
      expect(rgba('#0f0f0f', 0.3)).toBe('rgba(15,15,15,0.3)');
    });
  });
  describe('with rgb colors', () => {
    test('correctly convert an rgb string', () => {
      expect(rgba('rgb(255,255,255)', 0.3)).toBe('rgba(255,255,255,0.3)');
    });
  });
  describe('with hsl colors', () => {
    test('correctly convert an hsl string', () => {
      expect(rgba('hsl(50,50%,50%)', 0.3)).toBe('rgba(191,170,64,0.3)');
    });
    test('correctly convert a achromatic hsl string', () => {
      expect(rgba('hsl(50,0%,60%)', 0.3)).toBe('rgba(153,153,153,0.3)');
    });
    test('correctly account for low lightness in hsl', () => {
      expect(rgba('hsl(50,10%,40%)', 0.3)).toBe('rgba(112,109,92,0.3)');
    });
    test('correctly account for high hues in hsl', () => {
      expect(rgba('hsl(350,10%,40%)', 0.3)).toBe('rgba(112,92,95,0.3)');
    });
  });
});
