/* global window */
/* eslint no-shadow: 0, no-restricted-syntax:0 */
import 'jest-matcher-one-of';
import globalConfigFunc from './globalConfig';

const globalConfig = globalConfigFunc();

describe('globalConfig - unit tests for browser', () => {
  let config;
  let keys;
  beforeAll(() => {
    config = globalConfig;
    keys = [
      'referrer',
      'isMobile',
      'isHomepage',
      'department',
      'path',
      'environment',
      'articleId',
      'utm_',
      'adBlockRemoved',
      'wifiLocation',
      'isWriterAlerts',
      'gStatCampaignNumber',
      'adSlotConfig',
      'adManagerConfig',
      'breakpointsConfig',
      'userConfig',
      'sso',
    ];
  });

  it('should not be undefined', () => {
    expect(config).toBeDefined();
  });

  it('should be a object', () => {
    expect(config).toEqual(expect.any(Object));
  });

  // Containment check
  it(`should have the following keys: ${keys}`, () => {
    expect(Object.keys(config)).toEqual(expect.arrayContaining(keys));
  });

  describe('referrer property', () => {
    let referrer;
    beforeAll(() => {
      referrer = config.referrer;
    });

    it('should not be undefined', () => {
      expect(referrer).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof referrer).toBe('string');
    });
  });

  describe('isMobile property', () => {
    let isMobile;
    beforeAll(() => {
      isMobile = config.isMobile;
    });

    it('should not be undefined', () => {
      expect(isMobile).toBeDefined();
    });

    it('should be a boolean', () => {
      expect(isMobile).toBeOneOf([ true, false, ]);
    });
  });

  describe('isHomepage property', () => {
    let isHomepage;
    beforeAll(() => {
      isHomepage = config.isHomepage;
    });

    it('should not be undefined', () => {
      expect(isHomepage).toBeDefined();
    });

    it('should be a boolean', () => {
      expect(isHomepage).toBeOneOf([ true, false, ]);
    });
  });

  describe('department property', () => {
    let department;
    beforeAll(() => {
      department = config.department;
    });

    it('should not be undefined', () => {
      expect(department).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof department).toBe('string');
    });

    it('should either be a homepage or a section', () => {
      expect(department).toBeOneOf([ '_homepage', '_section', ]);
    });
  });

  describe('domain property', () => {
    let domain;
    const keys = [
      'haaretz.com',
      'haaretz.co.il',
      'themarker.com',
      'localhost',
      '',
    ];
    beforeAll(() => {
      domain = config.domain;
    });

    it('should not be undefined', () => {
      expect(domain).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof domain).toBe('string');
    });

    it(`should be one of the following keys: ${keys}`, () => {
      expect(domain).toBeOneOf(keys);
    });
  });

  describe('path property', () => {
    let path;
    beforeAll(() => {
      path = config.path;
      path = path.filter(path => path !== '.context.html');
    });

    it('should not be undefined', () => {
      expect(path).toBeDefined();
    });

    it('should be an empty array', () => {
      expect(path).toBeInstanceOf(Array)
        && expect(Object.keys(path)).toHaveLength(0);
    });
  });

  describe('site property', () => {
    let site;
    beforeAll(() => {
      site = config.site;
    });

    it('should not be undefined', () => {
      expect(site).toBeDefined();
    });

    it('should be an one of the supported sites', () => {
      expect(site).toBeOneOf([ 'haaretz', 'themarker', 'mouse', ]);
    });
  });

  describe('environment property', () => {
    let environment;
    let keys;
    beforeAll(() => {
      environment = config.environment;
      keys = [ 1, 2, 3, undefined, ];
    });

    it(`should be one of the following: ${keys}`, () => {
      expect(environment).toBeOneOf(keys);
    });
  });

  describe('articleId property', () => {
    let articleId;
    beforeAll(() => {
      articleId = config.articleId;
    });

    it('should be either undefined or a string', () => {
      expect(articleId).toBeDefined()
        && expect(typeof articleId).toBe('string');
    });
  });

  describe('utm_ property', () => {
    let utm;
    let keys = [];
    beforeAll(() => {
      utm = config.utm_; // eslint-disable-line no-underscore-dangle
      keys = [ 'content', 'source', 'medium', 'campaign', 'getUrlParam', ];
    });

    it(`should have the following keys: ${keys}`, () => {
      expect(Object.keys(utm)).toEqual(expect.arrayContaining(keys));
    });

    it("should have the 'getUrlParam' function", () => {
      expect(typeof utm.getUrlParam).toBe('function');
    });

    it('should have a content property that is either undefined or a string', () => {
      expect(utm.content).toBeOneOf([ undefined, expect.any(String), ]);
    });

    it('should have a source property that is either undefined or a string', () => {
      expect(utm.source).toBeOneOf([ undefined, expect.any(String), ]);
    });

    it('should have a medium property that is either undefined or a string', () => {
      expect(utm.medium).toBeOneOf([ undefined, expect.any(String), ]);
    });

    it('should have a campaign property that is either undefined or a string', () => {
      expect(utm.campaign).toBeOneOf([ undefined, expect.any(String), ]);
    });
  });

  describe('adBlockRemoved property', () => {
    let adBlockRemoved;
    beforeAll(() => {
      adBlockRemoved = config.adBlockRemoved;
    });

    it('should not be undefined', () => {
      expect(adBlockRemoved).toBeDefined();
    });

    it('should be a boolean', () => {
      expect(typeof adBlockRemoved).toBe('boolean');
    });
  });
  describe('isWriterAlerts property', () => {
    let isWriterAlerts;
    beforeAll(() => {
      isWriterAlerts = config.isWriterAlerts;
    });

    it('should not be undefined', () => {
      expect(isWriterAlerts).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof isWriterAlerts).toBe('boolean');
    });
  });
  describe('wifiLocation property', () => {
    let wifiLocation;
    beforeAll(() => {
      wifiLocation = config.wifiLocation;
    });

    it('should not be undefined', () => {
      expect(wifiLocation).toBeDefined();
    });

    it('should be a string', () => {
      expect(typeof wifiLocation).toBe('string');
    });

    it("should either be an empty string, 'ArCafe' of 'university'", () => {
      expect(wifiLocation).toBeOneOf([ '', 'ArCafe', 'university', ]);
    });
  });

  describe('gStat campaign property', () => {
    beforeAll(() => {
      window.localStorage.clear();
    });

    it('should not have a gStat campaign by default', () => {
      expect(config.gStatCampaignNumber).toBeUndefined();
    });

    it('should have properly read the Campaign property from localStorage', async done => {
      const item = {
        lastModifiedDateTime: 1456977600000,
        CampaignNumber: 6310,
      };
      window.localStorage.setItem('GstatCampaign', JSON.stringify(item));
      expect(config.gStatCampaignNumber).toEqual(6310);
      done();
    });

    afterAll(() => {
      window.localStorage.clear();
    });
  });

  describe('adSlot configuration', () => {
    let adSlotConfig;

    beforeAll(() => {
      adSlotConfig = config.adSlotConfig;
      keys = [ 'network', 'adUnitBase', ];
    });

    it('should not be undefined', () => {
      expect(adSlotConfig).toBeDefined();
    });

    it('should be an object', () => {
      expect(typeof adSlotConfig).toBe('object');
    });

    describe('inner adSlot', () => {
      let adSlot;
      let keys;
      beforeAll(() => {
        for (const slotKey in adSlotConfig) {
          if ({}.hasOwnProperty.call(adSlotConfig, slotKey)) {
            adSlot = adSlotConfig[slotKey];
            break;
          }
        }
        keys = [
          'id',
          'responsive',
          'fluid',
          'priority',
          'adSizeMapping',
          'responsiveAdSizeMapping',
          'blacklistReferrers',
          'whitelistReferrers',
        ];
      });
      it(`should have the following keys: ${keys}`, () => {
        expect(Object.keys(adSlot)).toEqual(expect.arrayContaining(keys));
      });

      describe('responsive property', () => {
        let responsive;
        beforeAll(() => {
          responsive = adSlot.responsive;
        });

        it('should be a boolean', () => {
          expect(typeof responsive).toBe('boolean');
        });
      });

      describe('fluid property', () => {
        let fluid;
        beforeAll(() => {
          fluid = adSlot.fluid;
        });

        it('should be a boolean', () => {
          expect(typeof fluid).toBe('boolean');
        });
      });

      describe('priority property', () => {
        let priority;
        const priorities = [ 'low', 'normal', 'high', ];
        beforeAll(() => {
          priority = adSlot.priority;
        });

        it(`'should be one of: ${priorities}'`, () => {
          expect(priority).toBeOneOf(priorities);
        });
      });

      describe('adSizeMapping property', () => {
        let adSizeMapping;
        beforeAll(() => {
          adSizeMapping = adSlot.adSizeMapping;
        });

        it('should be an array', () => {
          expect(adSizeMapping).toBeInstanceOf(Array);
        });
      });

      describe('responsiveAdSizeMapping property', () => {
        let responsiveAdSizeMapping;
        let keys;
        beforeAll(() => {
          for (const slotKey in adSlot) {
            if (
              {}.hasOwnProperty.call(adSlot, slotKey)
              && slotKey === 'responsiveAdSizeMapping'
            ) {
              responsiveAdSizeMapping = adSlot[slotKey];
              break;
            }
          }
          keys = [ 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', ];
        });

        it('should be an object', () => {
          expect(typeof responsiveAdSizeMapping).toBe('object');
        });

        it(`should have the following keys: ${keys}`, () => {
          expect(Object.keys(responsiveAdSizeMapping)).toEqual(
            expect.arrayContaining(keys)
          );
        });
      });

      describe('blacklistReferrers property', () => {
        let blacklistReferrers;
        beforeAll(() => {
          blacklistReferrers = adSlot.blacklistReferrers;
        });

        it('should be a string', () => {
          expect(typeof blacklistReferrers).toBe('string');
        });
      });

      describe('whitelistReferrers property', () => {
        let whitelistReferrers;
        beforeAll(() => {
          whitelistReferrers = adSlot.whitelistReferrers;
        });

        it('should be a string', () => {
          expect(typeof whitelistReferrers).toBe('string');
        });
      });
    });
  });

  describe('adManager configuration', () => {
    let adManagerConfig;
    let keys = [];
    beforeAll(() => {
      adManagerConfig = config.adManagerConfig;
      keys = [ 'network', 'adUnitBase', ];
    });

    it('should not be undefined', () => {
      expect(adManagerConfig).toBeDefined();
    });

    it('should be an object', () => {
      expect(typeof adManagerConfig).toBe('object');
    });

    it(`'should have the following keys: ${keys}`, () => {
      expect(Object.keys(adManagerConfig)).toEqual(
        expect.arrayContaining(keys)
      );
    });

    it('should have the network property fixed to 9401', () => {
      expect(adManagerConfig.network).toBe('9401');
    });
  });

  describe('breakpointsConfig configuration', () => {
    let breakpointsConfig;
    const keys = [ 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', ];
    // const values = [600, 761, 993, 1009, 1291, 1600, 1900];
    beforeAll(done => {
      breakpointsConfig = config.breakpointsConfig;
      done();
    });

    it('should not be undefined', () => {
      expect(breakpointsConfig).toBeDefined();
    });

    it('should be an object', () => {
      expect(typeof breakpointsConfig).toBe('object');
    });

    it('should have the breakpoint computed property ', () => {
      expect(typeof breakpointsConfig.breakpoints).toBe('object');
    });

    it(`should have the following keys: ${keys}`, () => {
      expect(Object.keys(breakpointsConfig.breakpoints)).toEqual(
        expect.arrayContaining(keys)
      );
    });

    keys.forEach((key, index) => {
      const breakpoints = [];
      breakpointsConfig = globalConfig.breakpointsConfig;
      breakpoints.push(breakpointsConfig.breakpoints1[key]);
      breakpoints.push(breakpointsConfig.breakpoints2[key]);
      breakpoints.push(breakpointsConfig.breakpoints3[key]);
      breakpoints.push(breakpointsConfig.breakpoints4[key]);
      it(`${key} breakpoint should be equal to one of: ${breakpoints}`, () => {
        expect(breakpointsConfig.breakpoints[key]).toBeOneOf(breakpoints);
      });
      it('and it should be a number', () => {
        expect(typeof breakpointsConfig.breakpoints[key]).toBe('number');
      });
    });
  });

  describe('conflictManagement configuration', () => {
    let blockingSlot;
    const keys = [ 'onsize', 'avoid', ];
    const conflictManagement = globalConfig.conflictManagementConfig;
    for (const key in conflictManagement) {
      if ({}.hasOwnProperty.call(conflictManagement, key)) {
        blockingSlot = conflictManagement[key];
        break;
      }
    }

    it('should not be undefined', () => {
      expect(conflictManagement).toBeDefined();
    });

    it('should be an object', () => {
      expect(conflictManagement).toEqual(expect.any(Object));
    });

    describe('blocking slot', () => {
      it('should be an array', () => {
        expect(blockingSlot).toEqual(expect.any(Array));
      });

      Array.prototype.forEach.call(blockingSlot, blockedSlot => {
        it(`should have the following keys: ${keys}`, () => {
          expect(Object.keys(blockedSlot)).toEqual(
            expect.arrayContaining(keys)
          );
        });
      });
    });
  });

  describe('googleGlobalSettings configuration', () => {
    const keys = [ 'enableSingleRequest', 'enableAsyncRendering', ];
    const googleGlobalSettings = globalConfig.googleGlobalSettings;

    it('should not be undefined', () => {
      expect(googleGlobalSettings).toBeDefined();
    });

    it('should be an object', () => {
      expect(typeof googleGlobalSettings).toBe('object');
    });

    it(`should have the following keys: ${keys}`, () => {
      expect(Object.keys(googleGlobalSettings)).toEqual(
        expect.arrayContaining(keys)
      );
    });

    it('enableSingleRequest should be a boolean', () => {
      expect(typeof googleGlobalSettings.enableSingleRequest).toBe('boolean');
    });

    it('enableAsyncRendering should be a boolean', () => {
      expect(typeof googleGlobalSettings.enableAsyncRendering).toBe('boolean');
    });

    it('breakpointType should be a string', () => {
      expect(googleGlobalSettings.breakpointType).toMatch(
        /type1|type2|type3|type4/
      );
    });

    it('refreshIntervalTime should be a number', () => {
      expect(typeof googleGlobalSettings.refreshIntervalTime).toBe('number');
    });
  });

  describe('sso property', () => {
    let sso;
    beforeAll(() => {
      sso = config.sso;
    });

    it('should be a string', () => {
      expect(typeof sso).toBe('string');
    });

    it("should be equal to either 'tmsso' or 'engsso'", () => {
      expect(sso).toMatch(/tmsso|engsso/);
    });
  });
});
