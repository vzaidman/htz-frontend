import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import UserDispenser from './UserDispenser';

export const LoginExample = (
  <UserDispenser
    render={({ isLoggedIn, user, plantImages, handleImgOnload, }) =>
      (isLoggedIn ? (
        <Logout
          isLoggedIn={isLoggedIn}
          user={user}
          render={({ logout, }) => (
            <div style={{ marginTop: '24px', marginBottom: '24px', }}>
              <button
                onClick={() => {
                  logout(plantImages, handleImgOnload);
                }}
              >
                Logout
              </button>
            </div>
          )}
        />
      ) : (
        <Login
          isLoggedIn={isLoggedIn}
          user={user}
          render={({ login, email, password, handleInputChange, }) => (
            <div style={{ marginTop: '24px', marginBottom: '24px', }}>
              <h2>Login</h2>
              <input
                name="email"
                onChange={handleInputChange}
                value={email}
                placeholder="Email"
              />
              <input
                name="password"
                onChange={handleInputChange}
                value={password}
                type="password"
                placeholder="Password"
              />
              <button
                onClick={() => {
                  login(email, password, plantImages, handleImgOnload);
                }}
              >
                Submit
              </button>
            </div>
          )}
        />
      ))
    }
  />
);

export const RegisterExample = (
  <UserDispenser
    render={({ isLoggedIn, user, plantImages, handleImgOnload, }) => (
      <Register
        isLoggedIn={isLoggedIn}
        user={user}
        render={({
          register,
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          mobilePrefix,
          mobileNumber,
          termsChk,
          gRecaptchaResponse,
          // eslint-disable-next-line no-shadow
          user,
          handleInputChange,
        }) =>
          (isLoggedIn ? null : (
            <div style={{ marginTop: '24px', marginBottom: '24px', }}>
              <h2>Register</h2>
              <input
                name="email"
                onChange={handleInputChange}
                value={email}
                placeholder="Email"
              />
              <br />
              <input
                name="password"
                onChange={handleInputChange}
                value={password}
                type="password"
                placeholder="Password"
              />
              <input
                name="confirmPassword"
                onChange={handleInputChange}
                value={confirmPassword}
                type="password"
                placeholder="confirmPassword"
              />
              <br />
              <input
                name="firstName"
                onChange={handleInputChange}
                value={firstName}
                type="text"
                placeholder="First Name"
              />
              <input
                name="lastName"
                onChange={handleInputChange}
                value={lastName}
                type="text"
                placeholder="Last Name"
              />
              <br />
              <input
                name="mobilePrefix"
                onChange={handleInputChange}
                value={mobilePrefix}
                type="text"
                placeholder="Mobile Prefix"
              />
              <input
                name="mobileNumber"
                onChange={handleInputChange}
                value={mobileNumber}
                type="text"
                placeholder="Mobile Number"
              />
              <br />
              <input
                style={{ appearance: 'checkbox', WebkitAppearance: 'checkbox', }}
                id="pTermsChk"
                name="termsChk"
                onChange={handleInputChange}
                checked={termsChk}
                type="checkbox"
                aria-labelledby="frmRegister_termsChk-lbl"
                aria-describedby="frmRegister_termsChk-message"
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label
                id="frmRegister_termsChk-lbl"
                htmlFor="pTermsChk"
                className="t-milli"
              >
                אני מאשר/ת את תנאי השימוש באתר הארץ, וכן קבלת דיוורים מהאתר
                והצעות לרכישת מינוי
              </label>
              <div id="frmRegister_termsChk-message" className="form__note" />
              <br />
              <button
                onClick={() => {
                  register(
                    email,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    mobilePrefix,
                    mobileNumber,
                    termsChk,
                    gRecaptchaResponse,
                    plantImages,
                    handleImgOnload
                  );
                }}
              >
                Register
              </button>
            </div>
          ))
        }
      />
    )}
  />
);

export default {
  LoginExample,
  RegisterExample,
};
