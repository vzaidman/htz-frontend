import React, { Fragment, } from 'react';
import { HtzLink, } from '@haaretz/htz-components';
import BottomLinks from '../../../components/Misc/BottomLinks';
import { PhoneInputForm, } from './PhoneInputForm';
import OtpForm from './OtpForm';
import { getFlowNumber, } from '../../FlowDispenser/flowStorage';
import { LoginContentStyles, } from '../../StyleComponents/LoginStyleComponents';

// Styling Components -----------------
const { ItemCenterer, } = LoginContentStyles;
// ------------------------------------

const shouldShowForm = (userFlow) => {
  return '12'.includes(userFlow);
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
            בשביל להשתמש בשירות כניסה באמצעות SMS, יש לאמת כתובת דוא"ל ומספר סלולרי
          </ItemCenterer>
        </div>
      );
  }

  getLinks = ({ findRout, doTransition, }) =>
    (this.state.formIndex === 0 ? null : (
      <BottomLinks spacing={2.5}>
        <HtzLink
          href="/"
          onClick={e => {
            e.preventDefault();
            //doTransition('notMyPhone');
            this.changeFormType(0);
          }}
        >
          לא הטלפון שלך?
        </HtzLink>
      </BottomLinks>
    ));

  changeFormType = formIndex => {
    this.setState({ formIndex, });
  };

  render() {
    const Form = () => this.getForm(this.props);
    const Links = () => this.getLinks(this.props);
    return (
      <Fragment>
        <Form />
        <Links />
      </Fragment>
    );
  }
}

export { PhoneForms, };
