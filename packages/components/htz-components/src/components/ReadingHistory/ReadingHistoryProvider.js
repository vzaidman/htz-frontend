/* global localStorage */
import PropTypes from 'prop-types';

const ReadingHistoryProvider = ({ children, }) => {
  let readingHistory;
  if (process.browser) {
    try {
      readingHistory = JSON.parse(localStorage.getItem('readingHistory'));
    }
    catch (err) {
      console.warn('unable to parse readingHistory from localStorage\n', err);
      readingHistory = null;
    }
  }
  return children(readingHistory || []);
};

ReadingHistoryProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ReadingHistoryProvider;
