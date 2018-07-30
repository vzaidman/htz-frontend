import React from 'react';

import USER_INFO from './UserInfo';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import UserDispenser from '../User/UserDispenser';
import UserSurveyInner from './UserSurveyInner';

export default function UserSurvey() {
  return (
    <UserDispenser
      render={({ isLoggedIn, user, }) =>
        (!isLoggedIn ? null : (
          <Query query={USER_INFO} variables={{ id: user.id, }}>
            {({ data, error, loading, }) => {
              if (error || loading) return null;

              if (
                data.userInfo.pageCount < 3 ||
                data.userInfo.articlePageSurvey.isOptOut ||
                data.userInfo.articlePageSurvey.isSubmitted
              ) {
                return null;
              }
              return <UserSurveyInner userInfo={data.userInfo} user={user} />;
            }}
          </Query>
        ))
      }
    />
  );
}
