/* global window, document, googletag */
import GPT from 'gpt-mock';
import { UserTypes, } from '@haaretz/htz-user-utils';
import AdManager, { adTargets, adTypes, } from './adManager';
import globalConfigMock from '../__mocks__/globalConfig.mock';
import User from './user';
import AdSlot from './adSlot';

const breakpoints = globalConfigMock.breakpointsConfig.breakpoints;
prepareMarkup();
window.googletag = new GPT();

describe('AdManager', () => {
  let adManager;
  // let dfp;
  beforeAll(async () => {
    // dfp = new DFP(globalConfigMock);
    // mockGoogleTagInit(dfp);

    adManager = await new AdManager(globalConfigMock);
    // Removes initializers pushed to google's CMD (CommandArray) for later execution
    window.googletag.cmd.splice(0, 3);
    // console.log('====================================');
    // console.log(window.googletag.cmd);
    // console.log('====================================');
    // eslint-disable-next-line no-underscore-dangle
    window.googletag._loaded();
    // console.log('====================================');
    // console.log(window.googletag.cmd);
    // console.log('====================================');

    // dfp.initGoogleTag().then(() => {
    //   done();
    // });
  });

  it('should not throw an error', () => {
    /* eslint-disable no-new */
    expect(() => {
      adManager = new AdManager(globalConfigMock);
    }).not.toThrow();
    /* eslint-enable no-new */
  });

  it('should be a object', () => {
    expect(adManager).toEqual(expect.any(Object));
  });

  describe('adManager properties', () => {
    // beforeAll(done => {
    //   dfp.initGoogleTag().then(() => {
    //     done();
    //   });
    // });

    it('should have a configuration ', () => {
      expect(adManager.config).toEqual(expect.any(Object));
    });

    it('should have a user object ', () => {
      expect(adManager.user).toEqual(expect.any(Object));
    });

    it('should have a conflict resolver object ', () => {
      expect(adManager.conflictResolver).toEqual(expect.any(Object));
    });

    it('should have initialized the adSlots object ', () => {
      expect(adManager.adSlots).toEqual(expect.any(Map));
    });
  });

  describe('adManager functions', () => {
    // beforeAll(done => {
    //   // dfp.initGoogleTag().then(() => {
    //   //   done();
    //   // });
    //   done();
    // });

    describe('initAdSlots', () => {
      let spy; // eslint-disable-line no-unused-vars
      beforeAll(() => {
        spy = jest.spyOn(adManager, 'initAdSlots');
      });

      it("should have the 'initAdSlots' function", () => {
        expect(adManager.initAdSlots).toEqual(expect.any(Function));
      });

      /*
       it('should have been called', () => {
       expect(spy.called).to.be.true();
       });
       */

      it('should have initialized the adSlots object', () => {
        expect(adManager.adSlots).toEqual(expect.any(Map));
      });

      it("should have sorted the adSlots based on its selector's offsetTop ", () => {
        let adSlotsFromConfig = Object.keys(adManager.config.adSlotConfig);
        // // Only high priority will be initialized at first
        // adSlotsFromConfig = adSlotsFromConfig.filter(adSlotName =>
        //   adManager.config.adSlotConfig[adSlotName].priority === adPriorities.high
        // );
        function byOffsetTop(a, b) {
          const firstElement = document.getElementById(a.id);
          const secondElement = document.getElementById(b.id);
          return !firstElement || !secondElement
            ? 0
            : firstElement.offsetTop - secondElement.offsetTop;
        }
        adSlotsFromConfig = adSlotsFromConfig.sort(byOffsetTop);
        const adSlotsKeys = Array.from(adManager.adSlots.keys()); // adSlot keys
        expect(adSlotsKeys).toEqual(adSlotsFromConfig);
      });
    });

    describe('getAdType', () => {
      let spy;
      let stub;
      let opts; // eslint-disable-line no-unused-vars
      const adExamples = {
        maavaron: 'haaretz.co.il.web.maavaron.',
        popunder: 'haaretz.co.il.web.popunder',
        talkback: 'haaretz.co.il.web.fullbanner.talkback',
        regular: 'haaretz.co.il.web.marketing.promotional_madrid.left_text3',
      };
      beforeAll(() => {
        spy = jest.spyOn(adManager, 'getAdType');
        stub = jest.fn();
        opts = {
          call: adSlotId => {
            spy(adSlotId);
          },
        };

        // We can control how the mock will behave based on how it’s called!
        stub.mockImplementation(arg => {
          switch (arg) {
            case undefined:
              throw new Error();
            case adExamples.maavaron:
              return adTypes.maavaron;
            case adExamples.popunder:
              return adTypes.popunder;
            case adExamples.talkback:
              return adTypes.talkback;
            case adExamples.regular:
              return adTypes.regular;
            default:
              return adTypes.regular;
          }
        });
      });

      it("should have the 'getAdType' function", () => {
        expect(adManager.getAdType).toEqual(expect.any(Function));
      });

      it("should call the 'getAdType' function from 'adManager' ", () => {
        adManager.getAdType(adExamples.regular);
        expect(spy).toBeCalled();
      });

      it('should throw for an undefined argument', () => {
        expect(() => {
          stub(undefined);
        }).toThrow();
      });

      it(`should return adTypes.maavaron for an adSlotId that contains ${
        adTypes.maavaron
      } `, () => {
        expect(stub(adExamples.maavaron)).toEqual(adTypes.maavaron);
      });

      it(`should return adTypes.maavaron for an adSlotId that contains ${
        adTypes.popunder
      } `, () => {
        expect(stub(adExamples.popunder)).toEqual(adTypes.popunder);
      });

      it(`should return adTypes.maavaron for an adSlotId that contains ${
        adTypes.talkback
      } `, () => {
        expect(stub(adExamples.talkback)).toEqual(adTypes.talkback);
      });

      it('should return adTypes.regular for an adSlotId that does not contains the other types', () => {
        expect(stub(adExamples.regular)).toEqual(adTypes.regular);
      });

      it('should return adTypes.regular for random args ', () => {
        expect(stub('random.data.ad.id')).toEqual(adTypes.regular);
      });
    });

    describe('shouldSendRequestToDfp', () => {
      let adSlot;
      beforeAll(() => {
        adSlot = definePlazmaSlot(adManager);
      });

      it("should have the 'shouldSendRequestToDfp' function", () => {
        expect(adManager.shouldSendRequestToDfp).toEqual(expect.any(Function));
      });

      it('should return a boolean', () => {
        expect(typeof adManager.shouldSendRequestToDfp(adSlot)).toBe('boolean');
      });
    });

    describe('doesUserTypeMatchBannerTargeting', () => {
      it("should have the 'doesUserTypeMatchBannerTargeting' function", () => {
        expect(adManager.doesUserTypeMatchBannerTargeting).toEqual(
          expect.any(Function)
        );
      });

      Object.keys(UserTypes).map((userType, index) =>
        describe(`for user of type ${userType} `, () => {
          let adSlot;
          const results = {
            anonymous: [
              adTargets.all,
              adTargets.anonymous,
              adTargets.nonPaying,
            ],
            registered: [
              adTargets.all,
              adTargets.registered,
              adTargets.nonPaying,
            ],
            paying: [
              adTargets.all,
              adTargets.digitalOnly,
              adTargets.digitalAndPrint,
              adTargets.paying,
            ],
          };
          beforeAll(() => {
            adManager.user.type = userType;
            googletag.destroySlots();
          });
          afterEach(() => {
            googletag.destroySlots();
          });
          Object.keys(adTargets).map(adTarget =>
            it(` should display an adSlot targeted at: '${adTarget}'`, () => {
              adSlot = definePromotionalMadridSlot(adManager, adTarget);
              const match = adManager.doesUserTypeMatchBannerTargeting(adSlot);
              const shouldMatch = results[userType].indexOf(adTarget) > -1;
              expect(match).toEqual(shouldMatch);
            })
          );
        })
      );
    });

    describe('switchedToBreakpoint', () => {
      it("should have the 'switchedToBreakpoint' function", () => {
        expect(adManager.switchedToBreakpoint).toEqual(expect.any(Function));
      });

      it('should throw if a breakpoint is not being passed', () => {
        expect(() => {
          adManager.switchedToBreakpoint();
        }).toThrow();
      });

      Object.keys(breakpoints).map((breakpoint, index) => {
        const breakpointDescription = `${breakpoint}:${
          breakpoints[breakpoint]
        }`;
        it(`should return an integer on valid breakpoint input: '${
          breakpointDescription
        }'`, () => {
          expect(
            typeof adManager.switchedToBreakpoint(breakpoints[breakpoint])
          ).toBe('number');
        });
        return this;
      });
    });

    describe('doesBreakpointContainAd', () => {
      it("should have the 'doesBreakpointContainAd' function", () => {
        expect(adManager.doesBreakpointContainAd).toEqual(expect.any(Function));
      });
    });

    describe('initSlotRenderedCallback', () => {
      it("should have the 'initSlotRenderedCallback' function", () => {
        expect(adManager.initSlotRenderedCallback).toEqual(
          expect.any(Function)
        );
      });
    });

    describe('initGoogleTargetingParams', () => {
      it("should have the 'initGoogleTargetingParams' function", () => {
        expect(adManager.initGoogleTargetingParams).toEqual(
          expect.any(Function)
        );
      });
    });

    describe('initGoogleGlobalSettings', () => {
      it("should have the 'initGoogleGlobalSettings' function", () => {
        expect(adManager.initGoogleGlobalSettings).toEqual(
          expect.any(Function)
        );
      });
    });
  });

  describe('const exports', () => {
    describe('adTargets', () => {
      const keys = [
        'all',
        'nonPaying',
        'anonymous',
        'registered',
        'paying',
        'digitalOnly',
        'digitalAndPrint',
      ];
      it(`should have all of the keys: ${keys}`, () => {
        expect(Object.keys(adTargets)).toEqual(
          expect.arrayContaining([ ...keys, ])
        );
      });
    });

    describe('UserTypes', () => {
      const keys = [ 'anonymous', 'registered', 'paying', ];
      it(`should have all of the keys: ${keys}`, () => {
        expect(Object.keys(UserTypes)).toEqual(
          expect.arrayContaining([ ...keys, ])
        );
      });
    });

    describe('adTypes', () => {
      const keys = [ 'maavaron', 'popunder', 'talkback', 'regular', ];
      it(`should have all of the keys: ${keys}`, () => {
        expect(Object.keys(adTypes)).toEqual(expect.arrayContaining([ ...keys, ]));
      });
    });
  });
});

/**
 * Helper function to define a plazma slot
 * @param {AdManager} adManagerInstance an instance of an adManager
 *  to inject into the slot
 * @returns {adSlot}
 */
function definePlazmaSlot(adManagerInstance) {
  const user = new User(globalConfigMock.userConfig);
  const adSlotConfig = Object.assign(
    {},
    globalConfigMock.adSlotConfig['haaretz.co.il.web.plazma'],
    {
      id: 'haaretz.co.il.web.plazma',
      target: 'all',
      type: '',
      responsive: true,
      user,
      adManager: adManagerInstance,
      department: globalConfigMock.department,
      network: globalConfigMock.adManagerConfig.network,
      adUnitBase: globalConfigMock.adManagerConfig.adUnitBase,
    }
  );
  return new AdSlot(adSlotConfig);
}

function definePromotionalMadridSlot(adManagerInstance, target) {
  const user = new User(globalConfigMock.userConfig);
  const adSlotConfig = Object.assign(
    {},
    globalConfigMock.adSlotConfig[
      'haaretz.co.il.web.marketing.promotional_madrid.left_text3'
    ],
    {
      id: 'haaretz.co.il.web.marketing.promotional_madrid.left_text3',
      target,
      type: '',
      responsive: true,
      user,
      adManager: adManagerInstance,
      department: globalConfigMock.department,
      network: globalConfigMock.adManagerConfig.network,
      adUnitBase: globalConfigMock.adManagerConfig.adUnitBase,
    }
  );
  return new AdSlot(adSlotConfig);
}

function prepareMarkup() {
  const divs = `<div id="haaretz.co.il.web.plazma" class="js-dfp-ad js-dfp-resp-refresh h-dib"
 data-audtarget="section"></div>
  <div id="haaretz.co.il.web.popunder" class="js-dfp-ad js-dfp-resp-refresh h-dib"
   data-audtarget="all"></div>
   <div id="haaretz.co.il.web.marketing.promotional_madrid.left_text3"
  class="js-dfp-ad js-dfp-resp-refresh h-dib"
   data-audtarget="homepage"></div>`;
  document.write(divs);
}
