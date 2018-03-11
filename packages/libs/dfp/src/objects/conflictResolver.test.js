import ConflictResolver from './conflictResolver';
import globalConfig from '../__mocks__/globalConfig.mock';

const conflictManagementConfig = globalConfig.conflictManagementConfig;

describe('conflictResolver', () => {
  let conflictResolver;
  beforeAll(() => {
    conflictResolver = new ConflictResolver(conflictManagementConfig);
  });

  it('should not throw an error', () => {
    /* eslint-disable no-new */
    expect(() => {
      new ConflictResolver(conflictManagementConfig);
    }).not.toThrow();
    /* eslint-enable no-new */
  });

  it('should be a object', () => {
    expect(conflictResolver).toEqual(expect.any(Object));
  });

  it('should not have a configuration ', () => {
    expect(conflictResolver.config).not.toEqual(expect.any(Object));
  });

  it('should not have a deferredSlots set ', () => {
    expect(conflictResolver.deferredSlots).toEqual(new Set());
  });

  describe(' initializeDependencyMap', () => {
    beforeAll(() => {
      conflictResolver = new ConflictResolver(conflictManagementConfig);
    });

    it(' should be a Map', () => {
      expect(
        conflictResolver.initializeDependencyMap(conflictManagementConfig)
      ).toEqual(expect.any(Map));
    });

    it('should be a Map with a single entry', () => {
      const keys = Array.from(conflictResolver.dependencyMap.keys());
      expect(keys.length).toEqual(1);
    });

    it('should properly init the dependencyMap rules', () => {
      const values = Array.from(conflictResolver.dependencyMap.values());
      expect(values[0].rules.length).toEqual(2);
    });
  });

  describe('updateResolvedSlot', () => {
    it("should properly define a 'updateResolvedSlot' method on 'conflictResolver'", () => {
      expect(conflictResolver.updateResolvedSlot).toEqual(expect.any(Function));
    });

    it("should throw an error when called without an 'adSlotId' parameter", () => {
      expect(() => conflictResolver.updateResolvedSlot('970x250')).toThrow();
    });

    it("should throw an error when called without an 'resolvedSize' parameter", () => {
      expect(() =>
        conflictResolver.updateResolvedSlot(
          'haaretz.co.il.web.halfpage.floating_x'
        )
      ).toThrow();
    });

    it('should not throw an error when called with both parameters', () => {
      expect(() =>
        conflictResolver.updateResolvedSlot('haaretz.co.il.web.plazma', [
          970,
          250,
        ])
      ).not.toThrow();
    });

    it('should not throw an error when called with an undefined node', () => {
      expect(() =>
        conflictResolver.updateResolvedSlot(
          'haaretz.co.il.web.halfpage.floating_x',
          [ 970, 250, ]
        )
      ).not.toThrow();
    });

    it("should return 'isBlocked=true' on an blocked node", () => {
      expect(conflictResolver.isBlocked('haaretz.co.il.web.ruler')).toBe(true);
    });

    it("should return 'isBlocked=false' on an unblocked node", () => {
      expect(conflictResolver.isBlocked('haaretz.co.il.web.plazma')).toBe(
        false
      );
    });
  });

  describe('isBlocked', () => {
    beforeAll(() => {
      conflictResolver = new ConflictResolver(conflictManagementConfig);
    });
    it("should properly define a 'isBlocked' method on 'conflictResolver'", () => {
      expect(conflictResolver.isBlocked).toEqual(expect.any(Function));
    });

    it("should throw an error when called without an 'adSlotId' parameter", () => {
      expect(() => {
        new ConflictResolver(conflictManagementConfig).isBlocked();
      }).toThrow();
    });

    it('should not throw an error when called with a parameter', () => {
      expect(() => {
        conflictResolver.isBlocked('haaretz.co.il.web.plazma');
      }).not.toThrow();
    });

    it("should return 'isBlocked=true' on an blocked node", () => {
      expect(conflictResolver.isBlocked('haaretz.co.il.web.ruler')).toBe(true);
    });

    it("once 'isBlocked returns true on an unresolved node, it adds it to the deferred slots Set", () => {
      expect(Array.from(conflictResolver.deferredSlots).length).toEqual(1);
    });

    it("should not add duplicate entries to the to the 'blocked' deferred slots set", () => {
      conflictResolver.isBlocked('haaretz.co.il.web.ruler');
      expect(Array.from(conflictResolver.deferredSlots).length).toEqual(1);
    });

    it("should only add new, unique entries to the 'blocked' deferred slots set", () => {
      conflictResolver.isBlocked('haaretz.co.il.web.halfpage.floating_x');
      expect(Array.from(conflictResolver.deferredSlots).length).toEqual(2);
    });

    it('should only add blocked slot id entries to the set', () => {
      conflictResolver.isBlocked('haaretz.co.il.web.plazma');
      expect(Array.from(conflictResolver.deferredSlots).length).toEqual(2);
    });

    it("should return 'isBlocked=false' on an unblocked node", () => {
      expect(conflictResolver.isBlocked('haaretz.co.il.web.plazma')).toBe(
        false
      );
    });

    it('should keep blocking after blocking node was resolved with a blocking size', () => {
      conflictResolver.updateResolvedSlot('haaretz.co.il.web.ruler', '970x250');
      expect(conflictResolver.isBlocked('haaretz.co.il.web.ruler')).toBe(true);
    });

    it('should release a block after blocking node was resolved with a permitted size', () => {
      conflictResolver = new ConflictResolver(conflictManagementConfig); // clean side effects
      conflictResolver.updateResolvedSlot(
        'haaretz.co.il.web.plazma',
        '250x250'
      );
      expect(conflictResolver.isBlocked('haaretz.co.il.web.ruler')).toBe(false);
    });
  });

  describe('isBlocking', () => {
    beforeAll(() => {
      conflictResolver = new ConflictResolver(conflictManagementConfig);
    });
    it("should properly define a 'isBlocking' method on 'conflictResolver'", () => {
      expect(conflictResolver.isBlocking).toEqual(expect.any(Function));
    });

    it("should throw an error when called without an 'adSlotId' parameter", () => {
      expect(() => {
        conflictResolver.isBlocking();
      }).toThrow();
    });

    it('should not throw an error when called with a parameter', () => {
      expect(() => {
        conflictResolver.isBlocking('haaretz.co.il.web.plazma');
      }).not.toThrow();
    });

    it("should return 'isBlocking=true' on a blocking node", () => {
      expect(conflictResolver.isBlocking('haaretz.co.il.web.plazma')).toBe(
        true
      );
    });
    it("should return 'isBlocked=false' on an none blocking node", () => {
      expect(conflictResolver.isBlocking('haaretz.co.il.web.ruler')).toBe(
        false
      ) &&
        expect(
          conflictResolver.isBlocking('haaretz.co.il.web.halfpage.floating_x')
        ).toBe(false);
    });
    it("should return 'isBlocked=false' on an none existing node", () => {
      expect(
        conflictResolver.isBlocking('haaretz.co.il.web.promotional.big.box.2')
      ).toBe(false);
    });
  });
});
