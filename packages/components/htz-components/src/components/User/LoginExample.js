import React from 'react';
import Login from './Login';
import Logout from './Logout';
import UserDispenser from './UserDispenser';

export function LoginExample() {
  return (
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
}

export default LoginExample;
