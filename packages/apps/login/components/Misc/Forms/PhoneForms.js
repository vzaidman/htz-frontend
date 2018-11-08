import React, { Fragment, } from 'react';
import { HtzLink, } from '@haaretz/htz-components';
import BottomLinks from '../../../components/Misc/BottomLinks';
import { PhoneInputForm, } from './PhoneInputForm';
import OtpForm from './OtpForm';

class PhoneForms extends React.Component {
  static displayName = 'PhoneForm';
  state = {
    formIndex: this.props.formindex,
  };

  getForm = () => (this.state.formIndex === 0
    ? <PhoneInputForm {...this.props} />
    : <OtpForm {...this.props} />);

  getLinks = ({ findRout, doTransition, }) => (this.state.formIndex === 0 ?
    (null) : (
      <BottomLinks spacing={2.5}>
        <HtzLink
          href="/"
          onClick={e => {
            e.preventDefault();
            doTransition('notMyPhone');
            this.changeFormType(1);
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
    const Form = () => this.getForm();
    const Links = () => this.getLinks(this.props);
    return (
      <Fragment>
        <Form />
        <Links />
      </Fragment>);
  }
}

export { PhoneForms, };
