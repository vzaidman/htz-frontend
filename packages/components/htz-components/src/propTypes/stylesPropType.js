import {
  arrayOf,
  number,
  object,
  objectOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import { responsivePropBaseType, } from './responsivePropBaseType';

export const stylesPropType = objectOf(
  oneOfType([
    number,
    string,
    arrayOf(
      shape({
        ...responsivePropBaseType,
        /** Miscellaneous options to be passed to a function parsing
        * the prop, e.g., the `type` prop, which is parsed by the
        * typesetter function.
        */
        options: object,
      })
    ),
  ])
);
