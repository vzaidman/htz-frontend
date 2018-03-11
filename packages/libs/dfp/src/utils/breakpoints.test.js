import { getBreakpoint, debounce, } from './breakpoints';
import globalConfigMock from '../__mocks__/globalConfig.mock';

const breakpoints = globalConfigMock.breakpointsConfig.breakpoints;

describe('breakpoints ', () => {
  describe('debounce', () => {
    it('should be a function', () => {
      expect(debounce).toEqual(expect.any(Function));
    });

    it('should return a function', () => {
      const debouncedFn = debounce(() => {}, 100); // eslint-disable-line arrow-body-style
      expect(debouncedFn).toEqual(expect.any(Function));
    });

    it('should return a function that not throw', () => {
      const debouncedFn = debounce(() => {}); // eslint-disable-line arrow-body-style
      expect(() => {
        debouncedFn();
      }).not.toThrow();
    });

    it('should return a function that not throw', () => {
      const debouncedFn = debounce(() => {}); // eslint-disable-line arrow-body-style
      expect(() => {
        debouncedFn();
      }).not.toThrow();
    });

    describe(' debounced function ', () => {
      let spy;
      beforeAll(() => {
        const spyedFn = debounce(i => i + 1, 250);
        spy = jest.fn(spyedFn);
      });

      it('should run once ', () => {
        spy();
        expect(spy.mock.instances.length).toBe(1);
      });

      it('should run twice ', () => {
        spy();
        expect(spy.mock.instances.length).toBe(2);
      });

      it('should run thrice ', () => {
        spy();
        expect(spy.mock.instances.length).toBe(3);
      });
    });
  });

  describe('getBreakpoint', () => {
    it('should be a function', () => {
      expect(getBreakpoint).toEqual(expect.any(Function));
    });

    it('should return a number', () => {
      const breakpoint = getBreakpoint(breakpoints);
      expect(typeof breakpoint).toBe('number');
    });
  });
  /* describe( 'breakpoints resize spy', () => {
   //  let w;
   //  before(() => {
   //    w = window.open("","","width=100,height=100");
   //    w.document.write( '<script>${debounce}</script> ');
   //    w.document.write( '<script>${getBreakpoint}</script> ');
   //  });
   //  it('should be a function', () => {
   //    expect(getBreakpoint ).to.be.a('function');
   //  });
   //
   //  it('should return a number', () => {
   //    const breakpoint = getBreakpoint();
   //    console.log( 'Breakpoint is: ${getBreakpoint()} ');
   //    expect(breakpoint ).to.be.a('number');
   //  });
   //
   //  after(() => {
   //    w.close();
   //  })
   //}); */
});
