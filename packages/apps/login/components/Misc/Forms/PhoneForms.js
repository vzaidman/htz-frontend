import React, { Fragment, } from 'react';
import { HtzLink, } from '@haaretz/htz-components';
import BottomLinks from '../../../components/Misc/BottomLinks';
import { PhoneInputForm, } from './PhoneInputForm';
import OtpForm from './OtpForm';
import { getFlowNumber, } from '../../FlowDispenser/flowStorage';
import { LoginContentStyles, LoginMiscLayoutStyles, } from '../../StyleComponents/LoginStyleComponents';
import { sendTrackingEvents, } from '../../../util/trackingEventsUtil';

// Styling Components -----------------
const { ItemCenterer, } = LoginContentStyles;
const { TextBox, } = LoginMiscLayoutStyles;
// ------------------------------------

const shouldShowForm = (userFlow) => {
  return '1256'.includes(userFlow);
}

class PhoneForms extends React.Component {
  static displayName = 'PhoneForm';
  state = {
    formIndex: this.props.formindex,
  };

  getForm = ({client}) => {
    return shouldShowForm(getFlowNumber(client)) ? (this.state.formIndex === 0 ? <PhoneInputForm {...this.props} /> : <OtpForm {...this.props} />) : 
      (
        <div>
          <ItemCenterer>
            <TextBox>
              <h5>
              בשביל להשתמש בשירות כניסה באמצעות SMS, יש לאמת כתובת דוא"ל ומספר סלולרי
              </h5>
            </TextBox>
          </ItemCenterer>
        </div>
      );
  }

  getLinks = ({ findRout, doTransition, }, eventsTrackers, flow,) =>
    (this.state.formIndex === 0 ? null : (
      <BottomLinks spacing={2.5}>
        <HtzLink
          href="/"
          onClick={e => {
            e.preventDefault();
            sendTrackingEvents(eventsTrackers, { page: 'SMS code', flowNumber: flow, label: 'notMyPhone', });
              this.changeFormType(0);
            }}
        >
          לא המספר שלכם?
        </HtzLink>
      </BottomLinks>
    ));

  changeFormType = formIndex => {
    this.setState({ formIndex, });
  };

  render() {
    const { eventsTrackers, flow, } = this.props;
    const Form = () => this.getForm(this.props);
    const Links = () => this.getLinks(this.props, eventsTrackers, flow,);
    return (
      <Fragment>
        <Form />
        <Links />
      </Fragment>
    );
  }
}

export { PhoneForms, };
