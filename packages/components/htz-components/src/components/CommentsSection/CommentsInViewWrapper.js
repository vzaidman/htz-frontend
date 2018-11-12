/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Observer from 'react-intersection-observer';

function CommentsInViewWrapper({ rootMargin, ...props }) {
  return (
    <Observer triggerOnce rootMargin={rootMargin}>
      {inView => {
        if (inView) {
          const WrappedComments = dynamic(() => import('./ApolloWrappedComments'));
          return <WrappedComments {...props} />;
        }
        return null;
      }}
    </Observer>
  );
}

CommentsInViewWrapper.propTypes = {
  /** react-intersection-observer  Margin around the root.
   * Can have values similar to the CSS margin property,
   * e.g. "10px 20px 30px 40px" (top, right, bottom, left). */
  rootMargin: PropTypes.string,
};
CommentsInViewWrapper.defaultProps = {
  rootMargin: '2000px',
};
export default CommentsInViewWrapper;
