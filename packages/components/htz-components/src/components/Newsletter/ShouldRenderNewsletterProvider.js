import React from 'react';
import PropTypes from 'prop-types';
import ReadingHistoryProvider from '../ReadingHistory/ReadingHistoryProvider';

const renderFrequency = 10;

const ShouldRenderNewsletterProvider = ({ children, }) => (
  <ReadingHistoryProvider>
    {
      readingHistory => {
        const shouldRenderNewsletter = readingHistory && readingHistory.length % renderFrequency === 0;
        return children(shouldRenderNewsletter);
      }
    }
  </ReadingHistoryProvider>
);

ShouldRenderNewsletterProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ShouldRenderNewsletterProvider;
