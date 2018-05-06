import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, } from 'react-apollo';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import submitNewsletter from './mutations/submitNewsletter';
import NewsletterWithoutApollo from './NewsletterWithoutApollo';
import { newsletterVariantType, } from './elements/types/newsletterVariantType';

Newsletter.propTypes = {
  /** determine newsletter icon if exists */
  brand: PropTypes.oneOf([ 'tm', 'htz', ]),
  /** The element's DOM ID */
  id: PropTypes.string,
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
  brand: null,
  id: null,
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
