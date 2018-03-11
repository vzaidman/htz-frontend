/* global window, document, googletag */
import GPT from 'gpt-mock';
import globalConfig from './__mocks__/globalConfig.mock';
import DFP from './index';

describe('DFP - unit tests for browser', () => {
  let dfp;
  beforeAll(() => {
    dfp = new DFP(globalConfig);
    mockGoogleTagInit(dfp);
  });

  it('should not throw an error', () => {
    expect(() => {
      new DFP(globalConfig); // eslint-disable-line no-new
    }).not.toThrowError(Error);
  });

  it('should be a object', () => {
    expect(dfp).toEqual(expect.any(Object));
  });

  describe(' DFP properties ', () => {
    describe('configuration', () => {
      it('should have a configuration ', () => {
        expect(dfp.config).toEqual(expect.any(Object));
      });
    });

    // describe('version', () => {
    //   it('should have a version defined at package.json', () => {
    //     expect(DFP.version).toBeDefined();
    //     expect(DFP.version).toEqual(expect.any(String));
    //     expect(DFP.version).toEqual(require('../package.json').version);
    //   });
    // });
  });

  describe(' DFP functions ', () => {
    it("should have the 'resumeInit' function", () => {
      expect(typeof dfp.resumeInit).toBe('function');
    });

    it("should have the 'initGoogleTag' function", () => {
      expect(typeof dfp.initGoogleTag).toBe('function');
    });

    it("should have the 'initWindowResizeListener' function", () => {
      expect(typeof dfp.initWindowResizeListener).toBe('function');
    });
  });

  describe('dfp init', () => {
    beforeAll(() => {
      window.googletag = new GPT();
    });

    it(' should load the google tag script correctly ', done => {
      dfp.initGoogleTag().then(() => {
        expect(window.googletag).toBeDefined();
        done();
      });
    });

    it(' should not break on multiple calls to initGoogleTag', done => {
      dfp.initGoogleTag().then(() => {
        expect(window.googletag).toBeDefined();
        done();
      });
    });

    // eslint-disable-next-line no-shadow
    it(' should have a single adManager', done => {
      dfp.initGoogleTag().then(() => {
        expect(typeof dfp.adManager).toBe('object');
        done();
      });
    });
    afterAll(() => {
      window.dfp = dfp;
    });
  });
});

// Mock init google tag on instance
function mockGoogleTagInit(dfpInstance) {
  // eslint-disable-next-line no-param-reassign
  dfpInstance.initGoogleTag = () => {
    window.googletag = new GPT();
    // eslint-disable-next-line no-underscore-dangle
    window.googletag._loaded();
    dfpInstance.resumeInit();
    return Promise.resolve();
  };
}
