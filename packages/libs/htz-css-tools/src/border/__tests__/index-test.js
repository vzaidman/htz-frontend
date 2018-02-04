import {
  border,
  borderTop,
  borderEnd,
  borderRight,
  borderBottom,
  borderStart,
  borderLeft,
  borderHorizontal,
  borderVertical,
} from '../index';

describe('# border()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 1, 'solid', 'red')).toThrow(message);
      expect(() => border({ lines: 1, style: 'solid', color: 'red', })).toThrow(
        message
      );
    });
    it('throws if "lines" is undefined', () => {
      const message =
        'You must provide the "lines" argument to "border" functions so that vertical borders don\'t break the vertical rhythm';
      expect(() => border('1px', undefined, 'solid', 'red')).toThrow(message);
      expect(() =>
        border({ width: '1px', style: 'solid', color: 'red', })
      ).toThrow(message);
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    border,
    [
      [ '2px', 1, 'solid', 'red', ],
      [ { width: '2px', lines: 1, style: 'solid', color: 'red', }, ],
      [ { width: 2, lines: 1, style: 'solid', color: 'red', }, ],
      [ 2, 1, 'solid', 'red', ],
    ],
    {
      borderTopColor: 'red',
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderInlineEndColor: 'red',
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
      borderBottomColor: 'red',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      borderInlineStartColor: 'red',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    border,
    [
      [ '2px', 1, 'solid', ],
      [ { width: '2px', lines: 1, style: 'solid', }, ],
      [ { width: 2, lines: 1, style: 'solid', }, ],
      [ 2, 1, 'solid', ],
    ],
    {
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    border,
    [
      [ '2px', 1, ],
      [ { width: '2px', lines: 1, }, ],
      [ { width: 2, lines: 1, }, ],
      [ 2, 1, ],
    ],
    {
      borderTopWidth: '2px',
      borderInlineEndWidth: '2px',
      borderBottomWidth: '2px',
      borderInlineStartWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      border,
      [
        [ '2px', 0, 'solid', 'red', ],
        [ { width: '2px', lines: 0, style: 'solid', color: 'red', }, ],
        [ { width: 2, lines: 0, style: 'solid', color: 'red', }, ],
        [ 2, 0, 'solid', 'red', ],
      ],
      {
        borderInlineStartColor: 'red',
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
        borderInlineEndColor: 'red',
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
        position: 'relative',

        ':before': {
          backgroundColor: 'red',
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          backgroundColor: 'red',
          bottom: '0',
          content: '""',
          height: '2px',
          position: 'absolute',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      border,
      [
        [ '2px', 0, 'solid', ],
        [ { width: '2px', lines: 0, style: 'solid', }, ],
        [ { width: 2, lines: 0, style: 'solid', }, ],
        [ 2, 0, 'solid', ],
      ],
      {
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          bottom: '0',
          content: '""',
          height: '2px',
          position: 'absolute',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      border,
      [
        [ '2px', 0, ],
        [ { width: '2px', lines: 0, }, ],
        [ { width: 2, lines: 0, }, ],
        [ 2, 0, ],
      ],
      {
        borderInlineStartWidth: '2px',
        borderInlineEndWidth: '2px',
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          bottom: '0',
          content: '""',
          height: '2px',
          position: 'absolute',
          width: '100%',
        },
      }
    );
  });
});

describe('# borderTop()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => borderTop(undefined, 1, 'solid', 'red')).toThrow(message);
      expect(() =>
        borderTop({ lines: 1, style: 'solid', color: 'red', })
      ).toThrow(message);
    });
    it('throws if "lines" is undefined', () => {
      const message =
        'You must provide the "lines" argument to "border" functions so that vertical borders don\'t break the vertical rhythm';
      expect(() => borderTop('1px', undefined, 'solid', 'red')).toThrow(
        message
      );
      expect(() =>
        borderTop({ width: '1px', style: 'solid', color: 'red', })
      ).toThrow(message);
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderTop,
    [
      [ '2px', 1, 'solid', 'red', ],
      [ { width: '2px', lines: 1, style: 'solid', color: 'red', }, ],
      [ { width: 2, lines: 1, style: 'solid', color: 'red', }, ],
      [ 2, 1, 'solid', 'red', ],
    ],
    {
      borderTopColor: 'red',
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderTop,
    [
      [ '2px', 1, 'solid', ],
      [ { width: '2px', lines: 1, style: 'solid', }, ],
      [ { width: 2, lines: 1, style: 'solid', }, ],
      [ 2, 1, 'solid', ],
    ],
    {
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderTop,
    [
      [ '2px', 1, ],
      [ { width: '2px', lines: 1, }, ],
      [ { width: 2, lines: 1, }, ],
      [ 2, 1, ],
    ],
    {
      borderTopWidth: '2px',
      paddingTop: 'calc(1rem - 2px)',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderTop,
      [
        [ '2px', 0, 'solid', 'red', ],
        [ { width: '2px', lines: 0, style: 'solid', color: 'red', }, ],
        [ { width: 2, lines: 0, style: 'solid', color: 'red', }, ],
        [ 2, 0, 'solid', 'red', ],
      ],
      {
        position: 'relative',

        ':before': {
          backgroundColor: 'red',
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderTop,
      [
        [ '2px', 0, 'solid', ],
        [ { width: '2px', lines: 0, style: 'solid', }, ],
        [ { width: 2, lines: 0, style: 'solid', }, ],
        [ 2, 0, 'solid', ],
      ],
      {
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderTop,
      [
        [ '2px', 0, ],
        [ { width: '2px', lines: 0, }, ],
        [ { width: 2, lines: 0, }, ],
        [ 2, 0, ],
      ],
      {
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },
      }
    );
  });
});

describe('# borderEnd()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 'solid', 'red')).toThrow(message);
      expect(() => border({ style: 'solid', color: 'red', })).toThrow(message);
    });
    it('doesn\'t throw if "lines" is undefined', () => {
      expect(() => borderEnd('1px', undefined, 'solid', 'red')).not.toThrow();
      expect(() =>
        borderEnd({ width: '1px', style: 'solid', color: 'red', })
      ).not.toThrow();
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderEnd,
    [
      [ '2px', 'solid', 'red', ],
      [ { width: '2px', style: 'solid', color: 'red', }, ],
      [ { width: 2, style: 'solid', color: 'red', }, ],
      [ 2, 'solid', 'red', ],
    ],
    {
      borderInlineEndColor: 'red',
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderEnd,
    [
      [ '2px', 'solid', ],
      [ { width: '2px', style: 'solid', }, ],
      [ { width: 2, style: 'solid', }, ],
      [ 2, 'solid', ],
    ],
    {
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderEnd,
    [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
    {
      borderInlineEndWidth: '2px',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderEnd,
      [
        [ '2px', 'solid', 'red', ],
        [ { width: '2px', style: 'solid', color: 'red', }, ],
        [ { width: 2, style: 'solid', color: 'red', }, ],
        [ 2, 'solid', 'red', ],
      ],
      {
        borderInlineEndColor: 'red',
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderEnd,
      [
        [ '2px', 'solid', ],
        [ { width: '2px', style: 'solid', }, ],
        [ { width: 2, style: 'solid', }, ],
        [ 2, 'solid', ],
      ],
      {
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderEnd,
      [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
      { borderInlineEndWidth: '2px', }
    );
  });
});

describe('# borderRight()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 'solid', 'red')).toThrow(message);
      expect(() => border({ style: 'solid', color: 'red', })).toThrow(message);
    });
    it('doesn\'t throw if "lines" is undefined', () => {
      expect(() => borderRight('1px', undefined, 'solid', 'red')).not.toThrow();
      expect(() =>
        borderRight({ width: '1px', style: 'solid', color: 'red', })
      ).not.toThrow();
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderRight,
    [
      [ '2px', 'solid', 'red', ],
      [ { width: '2px', style: 'solid', color: 'red', }, ],
      [ { width: 2, style: 'solid', color: 'red', }, ],
      [ 2, 'solid', 'red', ],
    ],
    {
      borderRightColor: 'red',
      borderRightStyle: 'solid',
      borderRightWidth: '2px',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderRight,
    [
      [ '2px', 'solid', ],
      [ { width: '2px', style: 'solid', }, ],
      [ { width: 2, style: 'solid', }, ],
      [ 2, 'solid', ],
    ],
    {
      borderRightStyle: 'solid',
      borderRightWidth: '2px',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderRight,
    [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
    {
      borderRightWidth: '2px',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderRight,
      [
        [ '2px', 'solid', 'red', ],
        [ { width: '2px', style: 'solid', color: 'red', }, ],
        [ { width: 2, style: 'solid', color: 'red', }, ],
        [ 2, 'solid', 'red', ],
      ],
      {
        borderRightColor: 'red',
        borderRightStyle: 'solid',
        borderRightWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderRight,
      [
        [ '2px', 'solid', ],
        [ { width: '2px', style: 'solid', }, ],
        [ { width: 2, style: 'solid', }, ],
        [ 2, 'solid', ],
      ],
      {
        borderRightStyle: 'solid',
        borderRightWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderRight,
      [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
      {
        borderRightWidth: '2px',
      }
    );
  });
});

describe('# borderBottom()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => borderBottom(undefined, 1, 'solid', 'red')).toThrow(message);
      expect(() =>
        borderBottom({ lines: 1, style: 'solid', color: 'red', })
      ).toThrow(message);
    });
    it('throws if "lines" is undefined', () => {
      const message =
        'You must provide the "lines" argument to "border" functions so that vertical borders don\'t break the vertical rhythm';
      expect(() => borderBottom('1px', undefined, 'solid', 'red')).toThrow(
        message
      );
      expect(() =>
        borderBottom({ width: '1px', style: 'solid', color: 'red', })
      ).toThrow(message);
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderBottom,
    [
      [ '2px', 1, 'solid', 'red', ],
      [ { width: '2px', lines: 1, style: 'solid', color: 'red', }, ],
      [ { width: 2, lines: 1, style: 'solid', color: 'red', }, ],
      [ 2, 1, 'solid', 'red', ],
    ],
    {
      borderBottomColor: 'red',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderBottom,
    [
      [ '2px', 1, 'solid', ],
      [ { width: '2px', lines: 1, style: 'solid', }, ],
      [ { width: 2, lines: 1, style: 'solid', }, ],
      [ 2, 1, 'solid', ],
    ],
    {
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderBottom,
    [
      [ '2px', 1, ],
      [ { width: '2px', lines: 1, }, ],
      [ { width: 2, lines: 1, }, ],
      [ 2, 1, ],
    ],
    {
      borderBottomWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderBottom,
      [
        [ '2px', 0, 'solid', 'red', ],
        [ { width: '2px', lines: 0, style: 'solid', color: 'red', }, ],
        [ { width: 2, lines: 0, style: 'solid', color: 'red', }, ],
        [ 2, 0, 'solid', 'red', ],
      ],
      {
        position: 'relative',

        ':after': {
          backgroundColor: 'red',
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderBottom,
      [
        [ '2px', 0, 'solid', ],
        [ { width: '2px', lines: 0, style: 'solid', }, ],
        [ { width: 2, lines: 0, style: 'solid', }, ],
        [ 2, 0, 'solid', ],
      ],
      {
        position: 'relative',

        ':after': {
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderBottom,
      [
        [ '2px', 0, ],
        [ { width: '2px', lines: 0, }, ],
        [ { width: 2, lines: 0, }, ],
        [ 2, 0, ],
      ],
      {
        position: 'relative',

        ':after': {
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
  });
});

describe('# borderStart()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 'solid', 'red')).toThrow(message);
      expect(() => border({ style: 'solid', color: 'red', })).toThrow(message);
    });
    it('doesn\'t throw if "lines" is undefined', () => {
      expect(() => borderStart('1px', undefined, 'solid', 'red')).not.toThrow();
      expect(() =>
        borderStart({ width: '1px', style: 'solid', color: 'red', })
      ).not.toThrow();
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderStart,
    [
      [ '2px', 'solid', 'red', ],
      [ { width: '2px', style: 'solid', color: 'red', }, ],
      [ { width: 2, style: 'solid', color: 'red', }, ],
      [ 2, 'solid', 'red', ],
    ],
    {
      borderInlineStartColor: 'red',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderStart,
    [
      [ '2px', 'solid', ],
      [ { width: '2px', style: 'solid', }, ],
      [ { width: 2, style: 'solid', }, ],
      [ 2, 'solid', ],
    ],
    {
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderStart,
    [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
    {
      borderInlineStartWidth: '2px',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderStart,
      [
        [ '2px', 'solid', 'red', ],
        [ { width: '2px', style: 'solid', color: 'red', }, ],
        [ { width: 2, style: 'solid', color: 'red', }, ],
        [ 2, 'solid', 'red', ],
      ],
      {
        borderInlineStartColor: 'red',
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderStart,
      [
        [ '2px', 'solid', ],
        [ { width: '2px', style: 'solid', }, ],
        [ { width: 2, style: 'solid', }, ],
        [ 2, 'solid', ],
      ],
      {
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderStart,
      [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
      { borderInlineStartWidth: '2px', }
    );
  });
});

describe('# borderLeft()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 'solid', 'red')).toThrow(message);
      expect(() => border({ style: 'solid', color: 'red', })).toThrow(message);
    });
    it('doesn\'t throw if "lines" is undefined', () => {
      expect(() => borderLeft('1px', undefined, 'solid', 'red')).not.toThrow();
      expect(() =>
        borderLeft({ width: '1px', style: 'solid', color: 'red', })
      ).not.toThrow();
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderLeft,
    [
      [ '2px', 'solid', 'red', ],
      [ { width: '2px', style: 'solid', color: 'red', }, ],
      [ { width: 2, style: 'solid', color: 'red', }, ],
      [ 2, 'solid', 'red', ],
    ],
    {
      borderLeftColor: 'red',
      borderLeftStyle: 'solid',
      borderLeftWidth: '2px',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderLeft,
    [
      [ '2px', 'solid', ],
      [ { width: '2px', style: 'solid', }, ],
      [ { width: 2, style: 'solid', }, ],
      [ 2, 'solid', ],
    ],
    {
      borderLeftStyle: 'solid',
      borderLeftWidth: '2px',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderLeft,
    [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
    {
      borderLeftWidth: '2px',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderLeft,
      [
        [ '2px', 'solid', 'red', ],
        [ { width: '2px', style: 'solid', color: 'red', }, ],
        [ { width: 2, style: 'solid', color: 'red', }, ],
        [ 2, 'solid', 'red', ],
      ],
      {
        borderLeftColor: 'red',
        borderLeftStyle: 'solid',
        borderLeftWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderLeft,
      [
        [ '2px', 'solid', ],
        [ { width: '2px', style: 'solid', }, ],
        [ { width: 2, style: 'solid', }, ],
        [ 2, 'solid', ],
      ],
      {
        borderLeftStyle: 'solid',
        borderLeftWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderLeft,
      [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
      {
        borderLeftWidth: '2px',
      }
    );
  });
});

describe('# borderHorizontal()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => border(undefined, 'solid', 'red')).toThrow(message);
      expect(() => border({ style: 'solid', color: 'red', })).toThrow(message);
    });
    it('doesn\'t throw if "lines" is undefined', () => {
      expect(() =>
        borderHorizontal('1px', undefined, 'solid', 'red')
      ).not.toThrow();
      expect(() =>
        borderHorizontal({ width: '1px', style: 'solid', color: 'red', })
      ).not.toThrow();
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderHorizontal,
    [
      [ '2px', 'solid', 'red', ],
      [ { width: '2px', style: 'solid', color: 'red', }, ],
      [ { width: 2, style: 'solid', color: 'red', }, ],
      [ 2, 'solid', 'red', ],
    ],
    {
      borderInlineEndColor: 'red',
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
      borderInlineStartColor: 'red',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderHorizontal,
    [
      [ '2px', 'solid', ],
      [ { width: '2px', style: 'solid', }, ],
      [ { width: 2, style: 'solid', }, ],
      [ 2, 'solid', ],
    ],
    {
      borderInlineEndStyle: 'solid',
      borderInlineEndWidth: '2px',
      borderInlineStartStyle: 'solid',
      borderInlineStartWidth: '2px',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderHorizontal,
    [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
    {
      borderInlineEndWidth: '2px',
      borderInlineStartWidth: '2px',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderHorizontal,
      [
        [ '2px', 'solid', 'red', ],
        [ { width: '2px', style: 'solid', color: 'red', }, ],
        [ { width: 2, style: 'solid', color: 'red', }, ],
        [ 2, 'solid', 'red', ],
      ],
      {
        borderInlineEndColor: 'red',
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
        borderInlineStartColor: 'red',
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderHorizontal,
      [
        [ '2px', 'solid', ],
        [ { width: '2px', style: 'solid', }, ],
        [ { width: 2, style: 'solid', }, ],
        [ 2, 'solid', ],
      ],
      {
        borderInlineEndStyle: 'solid',
        borderInlineEndWidth: '2px',
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '2px',
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderHorizontal,
      [ [ '2px', ], [ { width: '2px', }, ], [ { width: 2, }, ], [ 2, ], ],
      {
        borderInlineEndWidth: '2px',
        borderInlineStartWidth: '2px',
      }
    );
  });
});

describe('# borderVertical()', () => {
  describe('errors', () => {
    it('throws if "width" is not provided', () => {
      const message = 'You passed invalid arguments to a "border" function';
      expect(() => borderVertical(undefined, 1, 'solid', 'red')).toThrow(
        message
      );
      expect(() =>
        borderVertical({ lines: 1, style: 'solid', color: 'red', })
      ).toThrow(message);
    });
    it('throws if "lines" is undefined', () => {
      const message =
        'You must provide the "lines" argument to "border" functions so that vertical borders don\'t break the vertical rhythm';
      expect(() => borderVertical('1px', undefined, 'solid', 'red')).toThrow(
        message
      );
      expect(() =>
        borderVertical({ width: '1px', style: 'solid', color: 'red', })
      ).toThrow(message);
    });
  });
  testBorder(
    'create correct css rules when all arguments are present',
    borderVertical,
    [
      [ '2px', 1, 'solid', 'red', ],
      [ { width: '2px', lines: 1, style: 'solid', color: 'red', }, ],
      [ { width: 2, lines: 1, style: 'solid', color: 'red', }, ],
      [ 2, 1, 'solid', 'red', ],
    ],
    {
      borderTopColor: 'red',
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderBottomColor: 'red',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
      paddingTop: 'calc(1rem - 2px)',
    }
  );
  testBorder(
    'set borders correctly when all arguments but "color" are provided',
    borderVertical,
    [
      [ '2px', 1, 'solid', ],
      [ { width: '2px', lines: 1, style: 'solid', }, ],
      [ { width: 2, lines: 1, style: 'solid', }, ],
      [ 2, 1, 'solid', ],
    ],
    {
      borderTopStyle: 'solid',
      borderTopWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
      paddingTop: 'calc(1rem - 2px)',
    }
  );

  testBorder(
    'set borders correctly when all arguments but "style" and "color" are provided',
    borderVertical,
    [
      [ '2px', 1, ],
      [ { width: '2px', lines: 1, }, ],
      [ { width: 2, lines: 1, }, ],
      [ 2, 1, ],
    ],
    {
      borderBottomWidth: '2px',
      borderTopWidth: '2px',
      paddingBottom: 'calc(1rem - 2px)',
      paddingTop: 'calc(1rem - 2px)',
    }
  );
  describe('Zero lines of padding', () => {
    testBorder(
      'correctly sets styles with 0 lines and all arguments present',
      borderVertical,
      [
        [ '2px', 0, 'solid', 'red', ],
        [ { width: '2px', lines: 0, style: 'solid', color: 'red', }, ],
        [ { width: 2, lines: 0, style: 'solid', color: 'red', }, ],
        [ 2, 0, 'solid', 'red', ],
      ],
      {
        position: 'relative',

        ':before': {
          backgroundColor: 'red',
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          backgroundColor: 'red',
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 lines and no color',
      borderVertical,
      [
        [ '2px', 0, 'solid', ],
        [ { width: '2px', lines: 0, style: 'solid', }, ],
        [ { width: 2, lines: 0, style: 'solid', }, ],
        [ 2, 0, 'solid', ],
      ],
      {
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
    testBorder(
      'correctly sets styles with 0 line, no style and no color',
      borderVertical,
      [
        [ '2px', 0, ],
        [ { width: '2px', lines: 0, }, ],
        [ { width: 2, lines: 0, }, ],
        [ 2, 0, ],
      ],
      {
        position: 'relative',

        ':before': {
          content: '""',
          height: '2px',
          position: 'absolute',
          top: '0',
          width: '100%',
        },

        ':after': {
          content: '""',
          height: '2px',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        },
      }
    );
  });
});

function testBorder(
  name,
  fn,
  argsList,
  expected,
  { only = false, matcher = 'toEqual', } = {}
) {
  if (only) {
    it.only(name, () => {
      argsList.forEach(args => expect(fn(...args))[matcher](expected));
    });
  }
  else {
    it(name, () => {
      argsList.forEach(args => expect(fn(...args))[matcher](expected));
    });
  }
}
