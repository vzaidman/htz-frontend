import React, { PureComponent, Fragment, } from 'react';
import PropTypes from 'prop-types';
// import gql from 'graphql-tag';
import ReactGA from 'react-ga';
import ApolloConsumer from '../components/ApolloBoundary/ApolloConsumer';
import { GET_USER, } from '../components/User/UserInjector';
import { doStatAction, } from '../components/BI/statutil';

const getBIActionWithQuery = client => async BIaction => {
  const { data, } = await client.query({
    query: GET_USER,
  });
  return doStatAction(BIaction, data.user);
};

const getGaActionWithQuery = () => async gaAction => {
  const { category, action, label, } = gaAction;
  return ReactGA.event({
    category,
    action,
    label,
  });
};

const biActionMapper = new Map([
  [ 'send_comment', 1, ],
  [ 'newsletter_signUp', 9, ],
  [ 'facebook_share', 10, ],
  [ 'whatsApp_share', 11, ],
  [ 'mail_share', 13, ],
  [ 'author_alert', 91, ],
  [ 'zen_mode', 92, ],
  [ 'author_alert_approve', 93, ],
  [ 'text_design_tools', 104, ],
  [ 'next_page', 109, ],
  [ 'breadcrumbs', 110, ],
  [ 'go_to_comments', 111, ],
  [ 'print', 112, ],
]);

class EventTracker extends PureComponent {
  static propTypes = {
    /** Indicates rendered JSX wrapped */
    children: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Fragment>
            {this.props.children({
              HtzReactGA: ReactGA,
              biAction: getBIActionWithQuery(client),
              gaAction: getGaActionWithQuery(client),
              biActionMapper,
              gaMapper: {
                productId: {
                  243: 'haaretz',
                  273: 'themarker',
                  274: 'dual',
                },
              },
            })}
          </Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default EventTracker;
