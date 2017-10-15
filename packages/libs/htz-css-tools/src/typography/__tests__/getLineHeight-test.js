import getLineHeight from '../getLineHeight';

describe('getLineHeight()', () => {
  describe('Default', () => {
    it('Get correct line-height when no extra padding is needed', () => {
      expect(getLineHeight(14)).toEqual(18);
    });
    it('Get correct line-height when 1 extra line of padding is needed', () => {
      expect(getLineHeight(16)).toEqual(24);
    });
  });
  describe('Adjusted rhythm', () => {
    it('Get correct line-height when no extra padding is needed with adjusted rhythm', () => {
      expect(getLineHeight(15, 7)).toEqual(21);
    });
    it('Get correct line-height when extra padding is needed once with adjusted rhythm', () => {
      expect(getLineHeight(18, 7)).toEqual(28);
    });
    it('Get correct line-height when extra padding is needed twice with adjusted rhythm', () => {
      expect(getLineHeight(48, 3)).toEqual(54);
    });
  });
  describe('Adjusted min padding,', () => {
    it('Get correct line-height when no extra padding is needed with adjusted min padding', () => {
      expect(getLineHeight(7, 6, 1)).toEqual(12);
    });
    it('Get correct line-height when extra padding is needed once with adjusted min padding', () => {
      expect(getLineHeight(14, 6, 3)).toEqual(24);
    });
    it('Get correct line-height when extra padding is needed twice with adjusted min padding', () => {
      expect(getLineHeight(18, 6, 5)).toEqual(30);
    });
  });
  describe('Adjusted rhythm and min padding,', () => {
    it('Get correct line-height when no extra padding is needed with adjusted rhythm and min padding', () => {
      expect(getLineHeight(15, 7, 3)).toEqual(21);
    });
    it('Get correct line-height when extra padding is needed once with adjusted rhythm and min padding', () => {
      expect(getLineHeight(14, 7, 3)).toEqual(21);
    });
    it('Get correct line-height when extra padding is needed twice with adjusted rhythm and min padding', () => {
      expect(getLineHeight(18, 7, 8)).toEqual(35);
    });
  });
});
