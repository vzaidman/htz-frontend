/* global window */
import ImpressionsManager, { keys, } from './impressionsManager';
import globalConfigMock from '../__mocks__/globalConfig.mock';

/*
 //from global binding
 var adUnitsFrequencyMap = {};
 adUnitsFrequencyMap['haaretz.co.il.web.halfpage.floating_x.section']  = '1/1day';
 adUnitsFrequencyMap['haaretz.co.il.web.ruler.hp']  = '1/1day';
 adUnitsFrequencyMap['haaretz.co.il.web.maavaron..all']  = '6/1day';
 adUnitsFrequencyMap['haaretz.co.il.web.inread.all']  = '5/1day';
 adUnitsFrequencyMap['haaretz.co.il.mobile_web.top.all']  = '2/1hour';
 adUnitsFrequencyMap['haaretz.co.il.web.popunder.all']  = '1/4hour';
 adUnitsFrequencyMap['haaretz.co.il.web.ruler.section']  = '1/1day';
 adUnitsFrequencyMap['haaretz.co.il.web.halfpage.floating_x.hp']  = '1/1day';
 adUnitsFrequencyMap['haaretz.co.il.mobile_web.maavaron1.section']  = '2/1hour';


 Object.keys(adUnitsFrequencyMap).map(function(key, index) {
 globalConfig[key] = adUnitsFrequencyMap[key];
 });
 */

const mock = {
  oldImpressions:
    'haaretz.co.il.web.maavaron..all = 10/1457906399000;' +
    'haaretz.co.il.web.popunder.all = 10/1457866799000;' +
    'haaretz.co.il.web.ruler.section = 5/1457906399000;' +
    'haaretz.co.il.web.halfpage.floating_x.hp = 7/1457906399000;' +
    'haaretz.co.il.web.ruler.hp = 6/1457906399000;' +
    'haaretz.co.il.web.inread.all = 3/1457906399000;' +
    'haaretz.co.il.web.halfpage.floating_x.section = 2/1457906399000;' +
    'haaretz.co.il.web.plazma.section = 1/1457279999000' +
    ';haaretz.co.il.mobile_web.top.all = 1/1457024399000;' +
    'haaretz.co.il.web.slideshow_hp_picday.hp = 1/1457456399000;',
};

// const impressionManagerConfig = globalConfigMock;

describe('impressionsManager', () => {
  let impressionsManager;
  beforeAll(() => {
    impressionsManager = new ImpressionsManager(globalConfigMock);
  });

  describe(' with a new user ', () => {
    beforeAll(() => {
      window.localStorage.clear();
      impressionsManager = new ImpressionsManager(globalConfigMock);
    });

    it('should not be undefined', () => {
      expect(impressionsManager).toBeDefined();
    });

    it('should be a object', () => {
      expect(impressionsManager).toEqual(expect.any(Object));
    });

    it('should have a configuration ', () => {
      expect(impressionsManager.config).toEqual(expect.any(Object));
    });

    it("should have a 'now' property ", () => {
      expect(typeof impressionsManager.now).toBe('number');
    });

    describe('impressionsManager.migrateImpressionsData', () => {
      it('should retrieve an impression map regardless of localStorage data', () => {
        expect(impressionsManager.migrateImpressionsData()).toEqual(
          expect.any(Object)
        );
      });
    });

    describe('impressionsManager.impressions', () => {
      it('should have initial configuration for each slot ', () => {
        expect(impressionsManager.impressions).toEqual(expect.any(Object));
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        describe(`slot configuration for slot: ${key}`, () => {
          it('should have initial configuration for slot', () => {
            expect(impressionsManager.impressions[key]).toEqual(
              expect.any(Object)
            );
          });
          // it('should have a frequency', () => {
          //   expect(typeof impressionsManager.impressions[key].frequency).toBe('string');
          // });
          // it('should have an expiry date', () => {
          //   expect(typeof impressionsManager.impressions[key].expires).toBe('number');
          // });
          // it("should have an 'exposed' counter ", () => {
          //   expect(typeof impressionsManager.impressions[key].exposed).toBe('number');
          // });
          // it("should have a 'target' property ", () => {
          //   expect(typeof impressionsManager.impressions[key].target).toMatch(/all|section|homepage/);
          // });
        })
      );
    });

    describe('impressionsManager.reachedQuota', () => {
      it("should have the 'reachedQuota' function ", () => {
        expect(impressionsManager.reachedQuota).toEqual(expect.any(Function));
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        it(`should return a boolean for any adSlotId given.
         adSlotId: ${key}`, () => {
          const quota = impressionsManager.reachedQuota(key);
          expect(typeof quota).toBe('boolean');
        })
      );

      it('should return false in case adSlotId passed was undefined', () => {
        const quota = impressionsManager.reachedQuota(undefined);
        expect(quota).toBe(false);
      });
    });

    describe('impressionsManager.registerImpression', () => {
      it("should have the 'registerImpression' function ", () => {
        expect(impressionsManager.registerImpression).toEqual(
          expect.any(Function)
        );
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        it(`should return a boolean for any attempt to register an impression.
         checking adSlotId: ${key}`, () => {
          const result = impressionsManager.registerImpression(key);
          expect(typeof result).toBe('boolean');
        })
      );

      it('should return false in case adSlotId passed was undefined', () => {
        const result = impressionsManager.registerImpression(undefined);
        expect(result).toBe(false);
      });
    });
  });

  describe('with an existing user (data migration) ', () => {
    beforeAll(done => {
      window.localStorage.clear();
      window.localStorage.setItem(keys.impressions, mock.oldImpressions);
      impressionsManager = new ImpressionsManager(globalConfigMock);
      done();
    });

    it('should not be undefined', () => {
      expect(impressionsManager).toBeDefined();
    });

    it('should be a object', () => {
      expect(impressionsManager).toEqual(expect.any(Object));
    });

    it('should have a configuration ', () => {
      expect(impressionsManager.config).toEqual(expect.any(Object));
    });

    it("should have a 'now' property ", () => {
      expect(typeof impressionsManager.now).toBe('number');
    });

    describe('impressionsManager.impressions', () => {
      it('should have initial configuration for each slot ', () => {
        expect(impressionsManager.impressions).toEqual(expect.any(Object));
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        describe(`slot configuration for slot: ${key}`, () => {
          it('should have initial configuration for slot', () => {
            expect(impressionsManager.impressions[key]).toEqual(
              expect.any(Object)
            );
          });
          it('should have a frequency', () => {
            expect(typeof impressionsManager.impressions[key].frequency).toBe(
              'string'
            );
          });
          it('should have an expiry date', () => {
            expect(typeof impressionsManager.impressions[key].expires).toBe(
              'number'
            );
          });
          it("should have an 'exposed' counter ", () => {
            expect(typeof impressionsManager.impressions[key].exposed).toBe(
              'number'
            );
          });
          it("should have a 'target' property ", () => {
            expect(impressionsManager.impressions[key].target).toMatch(
              /all|section|homepage/
            );
          });
        })
      );
    });

    describe('impressionsManager.reachedQuota', () => {
      it("should have the 'reachedQuota' function ", () => {
        expect(impressionsManager.reachedQuota).toEqual(expect.any(Function));
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        it(`should return a boolean for any adSlotId given. adSlotId: ${
          key
        }`, () => {
          const quota = impressionsManager.reachedQuota(key);
          expect(typeof quota).toBe('boolean');
        })
      );

      it('should return false in case adSlotId passed was undefined', () => {
        const quota = impressionsManager.reachedQuota(undefined);
        expect(quota).toBe(false);
      });
    });

    describe('impressionsManager.registerImpression', () => {
      it("should have the 'registerImpression' function ", () => {
        expect(impressionsManager.registerImpression).toEqual(
          expect.any(Function)
        );
      });

      Object.keys(globalConfigMock.impressionManagerConfig).map((key, index) =>
        it(`should return a boolean for an attempt to register an impression.
         checking adSlotId: ${key}`, () => {
          const result = impressionsManager.registerImpression(key);
          expect(typeof result).toBe('boolean');
        })
      );

      it('should return false in case adSlotId passed was undefined', () => {
        const result = impressionsManager.registerImpression(undefined);
        expect(result).toEqual(false);
      });
    });

    afterAll(done => {
      window.localStorage.clear();
      done();
    });
  });
});
