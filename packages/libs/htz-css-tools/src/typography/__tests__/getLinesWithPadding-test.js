import getLinesWithPadding from '../getLinesWithPadding';

describe('## linesWithPadding()', () => {
  const lines = 4;
  it("does't increase number of lines when unneeded", () => {
    expect(getLinesWithPadding(16, lines, 6, 2)).toEqual(lines);
  });
  it('correctly increase number of lines when one additional line is needed', () => {
    expect(getLinesWithPadding(21, lines, 6, 2)).toEqual(lines + 1);
  });
  it('correctly increase number of lines when more than one additional lines are needed', () => {
    expect(getLinesWithPadding(21, lines, 4, 2)).toEqual(lines + 3);
  });
});
