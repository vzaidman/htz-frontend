import PropTypes from 'prop-types';

export const PairTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  })
);

export const ColumnTypes = PropTypes.arrayOf(
  PropTypes.shape({
    combineWithNextColumn: PropTypes.bool,
    items: PairTypes,
    title: PropTypes.string,
  })
);
