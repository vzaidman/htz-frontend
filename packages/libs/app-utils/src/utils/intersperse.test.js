import intersperse from './intersperse';

describe('interspace', () => {
  it('should return an empty array when given an empty array', () => {
    expect(intersperse([], '&')).toEqual([]);
  });
  it('should return indenticle array to the input when given array with a single element', () => {
    expect(intersperse([ 7, ], '&')).toEqual([ 7, ]);
  });
  it('should return an array with delimiters between elements when given an array with two or more elements', () => {
    expect(intersperse([ 1, 2, 3, ], '&')).toEqual([ 1, '&', 2, '&', 3, ]);
  });
});
