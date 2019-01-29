// @flow

/**
 * Build mapper function based on a predefined mapping and default value.
 *
 * @export
 * @param {*} mapping key-value dict that specifies the mapping
 * @param {*} defaultValue will be used if no matching key is found in the mapping, omit to use the key itself
 * @returns a function that maps according to your mapping
 */

type Key = string | number;
type Mapping<T> = { [Key]: T, };
type Mapper<T> = Key => T | Key;

export default function createMapper<T>(mapping: Mapping<T>, defaultValue: T): Mapper<T> {
  return function mapper(key) {
    const defaultVal = defaultValue === undefined
      ? key
      : defaultValue;
    return (key in mapping
      ? mapping[key]
      : defaultVal
    );
  };
}
