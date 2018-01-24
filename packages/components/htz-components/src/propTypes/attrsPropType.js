import { bool, func, number, objectOf, oneOfType, string, } from 'prop-types';

export const attrsPropType = objectOf(oneOfType([ bool, number, string, func, ]));
