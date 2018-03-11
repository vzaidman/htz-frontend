/* global window, googletag */
import 'jest-matcher-one-of';
import GPT from 'gpt-mock';
import AdSlot from './adSlot';
import AdManager, { adTargets, adTypes, } from './adManager';
import globalConfigMock from '../__mocks__/globalConfig.mock';

window.googletag = new GPT();

describe('adSlot', () => {
  let adSlot;
  beforeAll(() => {
    googletag.destroySlots();
    adSlot = definePlazmaSlot();
  });

  it('should throw an error if no id param is passed', () => {
    expect(defineSlotWithoutAnId).toThrow();
  });

  it('should not throw an error on a well defined adSlot', () => {
    googletag.destroySlots(); // We must destroy the slot in order for 'this.defineSlot' to pass;
    expect(definePlazmaSlot).not.toThrow();
  });

  it('should be a object', () => {
    expect(adSlot).toEqual(expect.any(Object));
  });

  it('should have a configuration ', () => {
    expect(adSlot.config).toEqual(expect.any(Object));
  });

  describe('adSlot properties', () => {
    it('should have a configuration ', () => {
      expect(adSlot.config).toEqual(expect.any(Object));
    });

    // Part I : Markup configuration - passed from AdManager

    it('should have a id ', () => {
      expect(adSlot.id).toEqual(expect.any(String));
    });

    it("should have a target that is one of 'adTargets' ", () => {
      expect(adSlot.target).toBeOneOf(Object.values(adTargets));
    });

    it("should have a type that is one of 'adTypes' ", () => {
      expect(adSlot.type).toBeOneOf(Object.values(adTypes));
    });

    it("should have a 'responsive' flag (boolean) ", () => {
      expect(adSlot.responsive).toEqual(expect.any(Boolean));
    });

    it('should have a configuration ', () => {
      expect(adSlot.user).toEqual(expect.any(Object));
    });

    // Part II : Global, general ad configuration - passed from AdManager

    it('should have a department property ', () => {
      expect(adSlot.department).toEqual(expect.any(String));
    });

    it('should have a network property ', () => {
      expect(adSlot.network).toEqual(expect.any(Number));
    });

    it('should have an adUnitBase property ', () => {
      expect(adSlot.adUnitBase).toEqual(expect.any(String));
    });

    // Part III : ad specific configuration - passed from globalConfig.adSlotConfig

    it('should have an adSizeMapping property ', () => {
      expect(adSlot.adSizeMapping).toEqual(expect.any(Array));
    });

    it('should have an responsiveAdSizeMapping property ', () => {
      expect(adSlot.responsiveAdSizeMapping).toEqual(expect.any(Object));
    });

    it('should have an blacklistReferrers property ', () => {
      expect(adSlot.blacklistReferrers).toEqual(expect.any(Array));
    });

    it('should have an whitelistReferrers property ', () => {
      expect(adSlot.whitelistReferrers).toEqual(expect.any(Array));
    });

    // Part IV : Runtime configuration - calculated data - only present in runtime
    it('should not have initialized the lastResolvedSize property ', () => {
      expect(adSlot.lastResolvedSize).toBeUndefined();
    });

    it('should not have initialized the lastResolvedWithBreakpoint property ', () => {
      expect(adSlot.lastResolvedWithBreakpoint).toBeUndefined();
    });

    describe('slot property', () => {
      it('should have a slot property ', () => {
        expect(adSlot.slot).toEqual(expect.any(Object));
      });
    });
  });

  describe('adSlot functions', () => {
    describe('isOutOfPage', () => {
      let stub;
      const adExamples = {
        maavaron: 'haaretz.co.il.web.maavaron.',
        popunder: 'haaretz.co.il.web.popunder',
        talkback: 'haaretz.co.il.web.fullbanner.talkback',
        regular: 'haaretz.co.il.web.marketing.promotional_madrid.left_text3',
      };
      beforeAll(() => {
        stub = jest.fn();
        stub.mockImplementation(arg => {
          switch (arg) {
            case undefined:
              throw new Error();
            case adExamples.maavaron:
              return true;
            case adExamples.popunder:
              return true;
            case adExamples.talkback:
              return true;
            case adExamples.regular:
              return false;
            default:
              return false;
          }
        });
      });

      it('should be a function ', () => {
        expect(adSlot.isOutOfPage).toEqual(expect.any(Function));
      });

      it('should return a boolean ', () => {
        expect(adSlot.isOutOfPage()).toEqual(expect.any(Boolean));
      });

      it('should throw for an undefined argument ', () => {
        expect(() => {
          stub(undefined);
        }).toThrow();
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.maavaron
      } `, () => {
        expect(stub(adExamples.maavaron)).toEqual(true);
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.popunder
      } `, () => {
        expect(stub(adExamples.popunder)).toEqual(true);
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.talkback
      } `, () => {
        expect(stub(adExamples.talkback)).toEqual(true);
      });

      it('should return false for any other adSlotId ', () => {
        expect(stub(adExamples.regular)).toEqual(false) &&
          expect(stub('random.data.ad.id')).toEqual(false);
      });
    });

    describe('isMaavaron', () => {
      let stub;
      const adExamples = {
        maavaron: 'haaretz.co.il.web.maavaron.',
        popunder: 'haaretz.co.il.web.popunder',
        talkback: 'haaretz.co.il.web.fullbanner.talkback',
        regular: 'haaretz.co.il.web.marketing.promotional_madrid.left_text3',
      };
      beforeAll(() => {
        stub = jest.fn();
        stub.mockImplementation(arg => {
          switch (arg) {
            case undefined:
              throw new Error();
            case adExamples.maavaron:
              return true;
            case adExamples.popunder:
              return false;
            case adExamples.talkback:
              return false;
            case adExamples.regular:
              return false;
            default:
              return false;
          }
        });
      });

      it('should be a function ', () => {
        expect(adSlot.isMaavaron).toEqual(expect.any(Function));
      });

      it('should return a boolean ', () => {
        expect(adSlot.isMaavaron()).toEqual(expect.any(Boolean));
      });

      it('should throw for an undefined argument ', () => {
        expect(() => {
          stub(undefined);
        }).toThrow(Error);
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.maavaron
      } `, () => {
        expect(stub(adExamples.maavaron)).toEqual(true);
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.popunder
      } `, () => {
        expect(stub(adExamples.popunder)).toEqual(false);
      });

      it(`should return true for an adSlotId that contains ${
        adTypes.talkback
      } `, () => {
        expect(stub(adExamples.talkback)).toEqual(false);
      });

      it('should return false for any other adSlotId ', () => {
        expect(stub(adExamples.regular)).toEqual(false) &&
          expect(stub('random.data.ad.id')).toEqual(false);
      });
    });

    describe('isWhitelisted', () => {
      it('should be a function ', () => {
        expect(adSlot.isWhitelisted).toEqual(expect.any(Function));
      });

      it('should return a boolean ', () => {
        expect(adSlot.isWhitelisted()).toEqual(expect.any(Boolean));
      });
    });

    describe('isBlacklisted', () => {
      it('should be a function ', () => {
        expect(adSlot.isBlacklisted).toEqual(expect.any(Function));
      });

      it('should return a boolean ', () => {
        expect(adSlot.isBlacklisted()).toEqual(expect.any(Boolean));
      });
    });

    describe('show', () => {
      it('should be a function ', () => {
        expect(adSlot.show).toEqual(expect.any(Function));
      });
    });

    describe('defineSlot', () => {
      it('should be a function ', () => {
        expect(adSlot.defineSlot).toEqual(expect.any(Function));
      });
    });

    describe('getPath', () => {
      it('should be a function ', () => {
        expect(adSlot.getPath).toEqual(expect.any(Function));
      });

      it('should return a string ', () => {
        expect(adSlot.getPath()).toEqual(expect.any(String));
      });

      it('should be a valid path ', () => {
        expect(adSlot.getPath()).toEqual(
          '/9401/haaretz.co.il_web/haaretz.co.il.web.plazma/haaretz.co.il.web.plazma_homepage'
        );
      });
    });

    describe('slotRendered', () => {
      it('should be a function ', () => {
        expect(adSlot.slotRendered).toEqual(expect.any(Function));
      });
    });

    describe('refresh', () => {
      it('should be a function ', () => {
        expect(adSlot.refresh).toEqual(expect.any(Function));
      });
    });

    describe('defineMaavaron', () => {
      it('should be a function ', () => {
        expect(adSlot.defineMaavaron).toEqual(expect.any(Function));
      });
    });
  });
});

function definePlazmaSlot() {
  const adManagerInstance = new AdManager(globalConfigMock);
  const user = adManagerInstance.user;
  // console.log(globalConfigMock.adSlotConfig['haaretz.co.il.web.plazma']);

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

function defineSlotWithoutAnId() {
  const adManagerInstance = new AdManager(globalConfigMock);
  const user = adManagerInstance.user;
  const adSlotConfig = Object.assign(
    {},
    globalConfigMock.adSlotConfig['haaretz.co.il.web.plazma'],
    {
      id: undefined,
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
