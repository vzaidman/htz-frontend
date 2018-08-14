/* global localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, } from '../ApolloBoundary/ApolloBoundary';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import submitNewsletter from './mutations/submitNewsletter';
import NewsletterWithoutApollo from './NewsletterWithoutApollo';
import { newsletterVariantType, } from './elements/types/newsletterVariantType';
import UserDispenser from '../User/UserDispenser';

Newsletter.propTypes = {
  /**  determine newsletter button text */
  buttonText: PropTypes.string,
  /**
   * The element's DOM ID needs to be unique per page,
   * if there are 2 newsletter components in one page they should be passed an id manually
   * */
  contentId: PropTypes.string.isRequired,
  /**  determine newsletter headline text */
  headlineText: PropTypes.string,
  /** determine newsletter host if exists */
  host: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** determine newsletter icon if exists */
  icon: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** Trigger user's function when modal is open */
  onSubmit: PropTypes.func,
  /** Render The newsletter component every x articles, this prop will indicate the x */
  renderFrequency: PropTypes.number,
  /** Indicates article category id */
  segmentId: PropTypes.number.isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /** The `<newsletter />`'s stylistic variant */
  variant: PropTypes.oneOfType([
    newsletterVariantType,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: newsletterVariantType.isRequired,
      })
    ),
  ]),
};

Newsletter.defaultProps = {
  buttonText: 'להרשמה',
  headlineText: 'הירשמו עכשיו: סיכום כותרות הבוקר אצלכם במייל מדי יום',
  host: null,
  icon: null,
  onSubmit: () => {},
  miscStyles: null,
  renderFrequency: null,
  variant: 'highlight',
};

function Newsletter({ renderFrequency, ...props }) {
  let history;
  let shouldRender = true;
  if (typeof localStorage !== 'undefined' && renderFrequency) {
    history = JSON.parse(localStorage.getItem('readingHistory'));
    shouldRender = history.length % renderFrequency === 0;
  }
  return shouldRender ? (
    <Mutation mutation={submitNewsletter}>
      {(signUpNewsletter, { data, loading, }) => (
        <UserDispenser
          render={({ user: { email, }, }) => (
            <NewsletterWithoutApollo
              signUpNewsletter={signUpNewsletter}
              loading={loading}
              userEmail={email}
              {...props}
            />
          )}
        />
      )}
    </Mutation>
  ) : null;
}
export default Newsletter;
