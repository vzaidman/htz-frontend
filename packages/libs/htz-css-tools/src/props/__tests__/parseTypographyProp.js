import parseTypographyProp from '../parseTypographyProp';

const mockTypesetter = jest.fn();

describe('parseTypographyProp()', () => {
  afterEach(() => mockTypesetter.mockReset());
  describe('non-responsive', () => {
    it('call "typesetter" once when "propValues" is a "number"', () => {
      parseTypographyProp(0, mockTypesetter);

      expect(mockTypesetter).toHaveBeenCalledTimes(1);
    });
    it('call "typesetter" with the correct args when "propValues" is a "number"', () => {
      parseTypographyProp(6, mockTypesetter);

      expect(mockTypesetter).toHaveBeenCalledWith(6);
    });

    it('call "typesetter" once when "propValues" is an object', () => {
      parseTypographyProp({ step: 2, lines: 6, }, mockTypesetter);

      expect(mockTypesetter).toHaveBeenCalledTimes(1);
    });
    it('call "typesetter" with the correct args when "propValues" is an object(with "lines" key)', () => {
      parseTypographyProp({ step: 2, lines: 6, }, mockTypesetter);

      expect(mockTypesetter).toHaveBeenCalledWith(2, { lines: 6, });
    });
    it('call "typesetter" with the correct args when "propValues" is an object(without "lines" key)', () => {
      parseTypographyProp({ step: 2, }, mockTypesetter);

      expect(mockTypesetter).toHaveBeenCalledWith(2, { lines: undefined, });
    });
  });

  describe('responsive', () => {
    it('call "typesetter" the same amount of times as the length of the "propValues" array', () => {
      parseTypographyProp(
        [ { until: 'm', value: 2, }, { from: 'm', value: { step: 3, lines: 5, }, }, ],
        mockTypesetter
      );

      expect(mockTypesetter).toHaveBeenCalledTimes(2);
    });

    it('call "typesetter" with corrent values for each responsive object', () => {
      parseTypographyProp(
        [ { until: 'm', value: 2, }, { from: 'm', value: { step: 3, lines: 5, }, }, ],
        mockTypesetter
      );

      expect(mockTypesetter.mock.calls[0]).toEqual([ 2, { untilBp: 'm', }, ]);
      expect(mockTypesetter.mock.calls[1]).toEqual([
        3,
        { fromBp: 'm', lines: 5, },
      ]);
    });
  });

  describe('invalid "typographicValues"', () => {
    it('return empty object when "propValues" is neither a "number" nor an "array"', () => {
      const result = parseTypographyProp('0', mockTypesetter);

      expect(result).toEqual({});
    });
  });
});
