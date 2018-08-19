import getSectionPairFromLineage from './getSectionsFromLineage.js';

describe('getSectionPairFromLineage', () => {
  it('returns an array as result', () => {
    expect(getSectionPairFromLineage([])).toBeInstanceOf(Array);
  });

  it('extract an empty array from lineage with no sections', () => {
    const input = [
      {
        pathSegment: null,
      },
      {
        pathSegment: 'haaretz',
      },
    ];
    expect(getSectionPairFromLineage(input)).toEqual([]);
  });

  it('extract only section from lineage with 1 sections', () => {
    const input = [
      {
        pathSegment: null,
      },
      {
        pathSegment: 'news',
      },
      {
        pathSegment: 'haaretz',
      },
    ];
    expect(getSectionPairFromLineage(input)).toEqual([ 'news', ]);
  });

  it('extract currect section and subsection from lineage with 2 sections', () => {
    const input = [
      {
        pathSegment: null,
      },
      {
        pathSegment: 'World',
      },
      {
        pathSegment: 'news',
      },
      {
        pathSegment: 'haaretz',
      },
    ];
    expect(getSectionPairFromLineage(input)).toEqual([ 'news', 'World', ]);
  });

  it('extract currect section and subsection from lineage with more than 2 sections', () => {
    const input = [
      {
        pathSegment: null,
      },
      {
        pathSegment: 'america',
      },
      {
        pathSegment: 'World',
      },
      {
        pathSegment: 'news',
      },
      {
        pathSegment: 'haaretz',
      },
    ];
    expect(getSectionPairFromLineage(input)).toEqual([ 'news', 'World', ]);
  });
});
