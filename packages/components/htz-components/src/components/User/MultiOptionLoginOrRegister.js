import React from 'react';
import { Form } from '@haaretz/htz-components'; // , TextInput, Login, Register

const changeEmailContStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

class MultiOptionLoginOrRegister extends React.Component {
  static defaultProps = {};

  render() {
    // const email = this.state;

    return (
      <Form
        clearFormAfterSubmit={false}
        onSubmit={fields => {
          console.log('submitting fields', fields);
        }}
        validate={null}
        // render={({ getInputProps, handleSubmit, }) => (
        //   <TextInput
        //     {...getInputProps({
        //       label: 'test input',
        //     })}
        //   />
        // )}
      />
    );
  }
}

export default MultiOptionLoginOrRegister;