import React from 'react';
import Register from './Register';
import Logout from './Logout';
import Form from '../Form/Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import UserDispenser from './UserDispenser';
import CheckBox from '../CheckBox/CheckBox'; // eslint-disable-line import/no-named-as-default

export function RegisterExample() {
  return (
    <UserDispenser
      render={({ isLoggedIn, }) =>
        (isLoggedIn ? (
          <Logout
            render={({ logout, }) => (
              <div style={{ marginTop: '24px', marginBottom: '24px', }}>
                <Button
                  onClick={() => {
                    logout()
                      .then(() => console.log('logoutSuccess'))
                      .catch(err => console.log('logout failed', err));
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          />
        ) : (
          <Register
            render={({ register, }) => (
              <div>
                <h2>Register</h2>
                <Form
                  onSubmit={({
                    email,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    mobilePrefix,
                    mobileNumber,
                    termsChk,
                    gRecaptchaResponse = '',
                  }) => {
                    console.log(
                      email,
                      password,
                      confirmPassword,
                      firstName,
                      lastName,
                      mobilePrefix,
                      mobileNumber,
                      termsChk,
                      gRecaptchaResponse
                    );
                    register(
                      email,
                      password,
                      confirmPassword,
                      firstName,
                      lastName,
                      mobilePrefix,
                      mobileNumber,
                      termsChk,
                      gRecaptchaResponse
                    )
                      .then(() => {
                        console.log('register Success!');
                      })
                      .catch(err => {
                        console.log('register Error!', err);
                      });
                  }}
                  render={({ getInputProps, handleSubmit, }) => (
                    <div>
                      <TextInput
                        {...getInputProps({
                          name: 'email',
                          label: 'email',
                          type: 'email',
                        })}
                      />
                      <TextInput
                        {...getInputProps({
                          name: 'password',
                          label: 'password',
                          type: 'password',
                        })}
                      />
                      <TextInput
                        {...getInputProps({
                          name: 'firstName',
                          label: 'firstName',
                        })}
                      />
                      <TextInput
                        {...getInputProps({
                          name: 'lastName',
                          label: 'lastName',
                        })}
                      />
                      <TextInput
                        {...getInputProps({
                          name: 'mobilePrefix',
                          label: 'mobilePrefix',
                        })}
                      />
                      <TextInput
                        {...getInputProps({
                          name: 'mobileNumber',
                          label: 'mobileNumber',
                        })}
                      />
                      <CheckBox
                        {...getInputProps({
                          name: 'termsChk',
                          label: 'termsChk',
                        })}
                      />
                      <div>
                        <Button onClick={handleSubmit}>submit</Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}
          />
        ))
      }
    />
  );
}

export default RegisterExample;
