import React from 'react';
import Login from './Login';
import Logout from './Logout';
import UserDispenser from './UserDispenser';
import Form from '../Form/Form'; // eslint-disable-line import/no-named-as-default
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

export function LoginExample() {
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
          <Login
            render={({ login, }) => (
              <div style={{ marginTop: '24px', marginBottom: '24px', }}>
                <h2>Login</h2>
                <Form
                  onSubmit={({ email, password, }) => {
                    login(email, password)
                      .then(() => {
                        console.log('Login Success!');
                      })
                      .catch(err => {
                        console.log('Login Error!', err);
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

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
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

export default LoginExample;
