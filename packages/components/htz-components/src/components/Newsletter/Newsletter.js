import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, } from '../ApolloBoundary/ApolloBoundary';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import submitNewsletter from './mutations/submitNewsletter';
import NewsletterWithoutApollo from './NewsletterWithoutApollo';
import { newsletterVariantType, } from './elements/types/newsletterVariantType';

Newsletter.propTypes = {
  /**  determine newsletter button text */
  buttonText: PropTypes.string,
  /**  determine newsletter headline text */
  headlineText: PropTypes.string,
  /** determine newsletter host if exists */
  host: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** determine newsletter icon if exists */
  icon: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** The element's DOM ID */
  id: PropTypes.string,
  /** Trigger user's function when modal is open */
  onSubmit: PropTypes.func,
  /** Indicates article category id */
  segmentId: PropTypes.number.isRequired,
  /** Indicates registered/paying user email */
  userEmail: PropTypes.string,
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
  id: null,
  onSubmit: () => {},
  miscStyles: null,
  userEmail: null,
  variant: 'highlight',
};

function Newsletter(props) {
  return (
    <Mutation mutation={submitNewsletter}>
      {(signUpNewsletter, { data, loading, }) => (
        <NewsletterWithoutApollo
          signUpNewsletter={signUpNewsletter}
          loading={loading}
          {...props}
        />
      )}
    </Mutation>
  );
}
export default Newsletter;
