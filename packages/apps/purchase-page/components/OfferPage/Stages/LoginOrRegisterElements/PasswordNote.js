/* global window */
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { BIAction, } from '@haaretz/htz-components';

const passwordNoteContStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const PasswordNote = (text, forgotPasswordText, openModal, userExists) => (
  <Fragment>
    {userExists ? (
      <FelaComponent style={passwordNoteContStyle}>
        <div>{text}</div>
        <FelaComponent
          style={theme => ({
            textDecoration: 'underline',
            color: theme.color('loginOrRegister', 'inFormText'),
          })}
          render={({ className, }) => (
            <BIAction>
              {action => (
                <button
                  className={className}
                  type="button"
                  onClick={evt => {
                    openModal(evt);
                    action({
                      actionCode: 32,
                      additionalInfo: {
                        stage: 'login-register',
                      },
                    });
                  }}
                >
                  {forgotPasswordText}
                </button>
              )}
            </BIAction>
          )}
        />
      </FelaComponent>
    ) : (
      text
    )}
  </Fragment>
);

export default PasswordNote;
