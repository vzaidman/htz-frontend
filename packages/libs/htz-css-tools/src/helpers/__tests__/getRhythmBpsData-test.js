import getRhythmBpsData from '../getRhythmBpsData';

describe('# getRhythmBpsData()', () => {
  const bps = [ 'default', 's', 'm', 'l', 'xl', ];
  const rhythmBps = [ 'default', 'l', 'xl', ];
  describe('## Errors', () => {
    it('Throw if "bps" is an empty array', () => {
      expect(() => getRhythmBpsData([], rhythmBps, 's')).toThrow(
        'The "bps" array in "getRhythmBpsData" can not be empty'
      );
    });
    it('Throw if "rhythmBps" is an empty array', () => {
      expect(() => getRhythmBpsData(bps, [], 's')).toThrow(
        'The "rhythmBps" array in "getRhythmBpsData" can not be empty'
      );
    });
    // it('Throw if neither "from" nor "until" are passed', () => {
    //   expect(() => getRhythmBpsData(bps, rhythmBps)).toThrow(
    //     /At least one of the "from" and "until" parameters mast be defined in "getRhythmBpsData"/i
    //   );
    // });
    it('Throw if "from" isn\'t a breakpoint in "bps"', () => {
      expect(() => getRhythmBpsData(bps, rhythmBps, 'sayWhat', 'xl')).toThrow(
        /"from" \(.+\) must be a breakpoint defined in "bps" \(.*\)/i
      );
    });
    it('Throw if "until" isn\'t a breakpoint in "bps"', () => {
      expect(() => getRhythmBpsData(bps, rhythmBps, 'xl', 'sayWhat')).toThrow(
        /"until" \(.+\) must be a breakpoint defined in "bps" \(.*\)/i
      );
    });
    it('Throw if "from" comes after "until" in the "bps" array', () => {
      expect(() => getRhythmBpsData(bps, rhythmBps, 'xl', 'l')).toThrow(
        /"from" \(.+\) must be a smaller than or the same breakpoint as "until" \(.+\), in "getRhythmBpsData"/i
      );
    });
  });
  describe('## Return values', () => {
    it('Returns correct data when "from" is the 1st bp after "default" and has the same rhythm unit', () => {
      expect(getRhythmBpsData(bps, rhythmBps, 's', 'xl')).toEqual([
        { from: 's', rhythmBp: 'default', until: 'l', },
        { from: 'l', rhythmBp: 'l', until: 'xl', },
      ]);
    });
    it('Returns correct data when "from" is the 2nd bp after "default" and has the same rhythm unit', () => {
      expect(getRhythmBpsData(bps, rhythmBps, 'm', 'l')).toEqual([
        { from: 'm', rhythmBp: 'default', until: 'l', },
      ]);
    });
    it('Returns correct data when "from" is the last rhythm bp and no "until"', () => {
      expect(getRhythmBpsData(bps, rhythmBps, 'xl')).toEqual([
        { from: 'xl', rhythmBp: 'xl', until: undefined, },
      ]);
    });
    it('Returns correct data when "from" is not "default", but has the same rhythm unit, and "until" is not defined', () => {
      expect(getRhythmBpsData(bps, rhythmBps, 's')).toEqual([
        { from: 's', rhythmBp: 'default', until: 'l', },
        { from: 'l', rhythmBp: 'l', until: 'xl', },
        { from: 'xl', rhythmBp: 'xl', until: undefined, },
      ]);
    });
    it('Returns correct data when "from" is not defined, and "until" is before or the same as the next rhythm unit bp', () => {
      expect(getRhythmBpsData(bps, rhythmBps, undefined, 'l')).toEqual([
        { from: undefined, rhythmBp: 'default', until: 'l', },
      ]);
    });
    it('Returns correct data when "from" is not defined, and "until" is after the next rhythm unit bp', () => {
      expect(getRhythmBpsData(bps, rhythmBps, undefined, 'xl')).toEqual([
        { from: undefined, rhythmBp: 'default', until: 'l', },
        { from: 'l', rhythmBp: 'l', until: 'xl', },
      ]);
    });
    it('Returns correct data when neither "from" nor "until" are defined', () => {
      expect(getRhythmBpsData(bps, rhythmBps)).toEqual([
        { from: undefined, rhythmBp: 'default', until: 'l', },
        { from: 'l', rhythmBp: 'l', until: 'xl', },
        { from: 'xl', rhythmBp: 'xl', until: undefined, },
      ]);
    });
  });
});
