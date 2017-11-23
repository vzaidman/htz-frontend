import PropTypes from 'prop-types';
/**
 * Basic generic shape of a component prop's responsive options object.
 */
export const responsivePropBaseType = {
  /** A named-breakpoint boundary used as the `min-width` value (inclusive) */
  from: PropTypes.string,
  /** A named-breakpoint boundary used as the The `max-width` value (exclusive) */
  until: PropTypes.string,
  /** A named miscellaneous media-feature query */
  misc: PropTypes.string,
  /** A media type, e.g., `print` */
  type: PropTypes.string,
  /** The value to use at given breakpoint */
  value: PropTypes.any.isRequired,
};
