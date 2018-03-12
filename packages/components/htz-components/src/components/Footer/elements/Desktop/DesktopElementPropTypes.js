import PropTypes from 'prop-types';

export const PairTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  })
);

export const ColumnTypes = PropTypes.arrayOf(
  PropTypes.shape({
    /** Indicate list combination, if true the next list will be attached in the same column */
    combineWithNextColumn: PropTypes.bool,
    /** Inner Lists items passed from polopoly */
    items: PairTypes,
    // todo: ask if Pair type is needed (text and link options should pass?)
    /** List title  */
    title: PropTypes.string,
  })
);
