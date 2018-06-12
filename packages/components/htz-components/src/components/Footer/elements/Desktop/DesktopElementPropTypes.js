import PropTypes from 'prop-types';

export const PairTypes = PropTypes.arrayOf(
  PropTypes.shape({
    contentName: PropTypes.string,
    value: PropTypes.string,
  })
);

export const ColumnTypes = PropTypes.arrayOf(
  PropTypes.shape({
    /** Indicate list combination, if true the next list will be attached in the same column */
    combineWithNextColumn: PropTypes.bool,
    /** Inner Lists items passed from polopoly */
    rows: PairTypes,
    // todo: ask if Pair type is needed (text and link options should pass?)
    /** List title  */
    contentName: PropTypes.string,
  })
);
