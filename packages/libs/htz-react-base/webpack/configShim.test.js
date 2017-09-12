/* global window */
const expectedConfig = {
  objectValue: {
    boolValue: true,
    stringValue: 'bar',
    numberValue: 5,
    nullValue: null,
    arrayValue: [ 1, 2, 3, ],
    undefinedValue: undefined,
  },
};

window.__HTZ_DATA__ = { config: expectedConfig, };

const config = require('./configShim');

describe('config', () => {
  test('returns the config field of the __HTZ_DATA__ global', () => {
    expect(config).toBe(expectedConfig);
  });

  describe('get', () => {
    test('returns the value if the property is defined', () => {
      expect(config.get('objectValue')).toBe(expectedConfig.objectValue);
      expect(config.get('objectValue.boolValue')).toBe(
        expectedConfig.objectValue.boolValue
      );
      expect(config.get('objectValue.stringValue')).toBe(
        expectedConfig.objectValue.stringValue
      );
      expect(config.get('objectValue.numberValue')).toBe(
        expectedConfig.objectValue.numberValue
      );
      expect(config.get('objectValue.nullValue')).toBe(
        expectedConfig.objectValue.nullValue
      );
      expect(config.get('objectValue.arrayValue')).toBe(
        expectedConfig.objectValue.arrayValue
      );
      expect(config.get('objectValue.arrayValue.0')).toBe(
        expectedConfig.objectValue.arrayValue[0]
      );
    });

    test('throws an error if the property is not defined', () => {
      expect(() => config.get('foo')).toThrow(Error);
      expect(() => config.get('objectValue.undefinedValue')).toThrow(Error);
      expect(() => config.get('objectValue.arrayValue.3')).toThrow(Error);
    });
  });

  describe('has', () => {
    test('returns true if the property is defined', () => {
      expect(config.has('objectValue')).toBe(true);
      expect(config.has('objectValue.boolValue')).toBe(true);
      expect(config.has('objectValue.nullValue')).toBe(true);
      expect(config.has('objectValue.arrayValue')).toBe(true);
      expect(config.has('objectValue.arrayValue.0')).toBe(true);
    });

    test('returns false if the property is not defined', () => {
      expect(config.has('foo')).toBe(false);
      expect(config.has('objectValue.undefinedValue')).toBe(false);
      expect(config.has('objectValue.arrayValue.3')).toBe(false);
    });
  });
});
