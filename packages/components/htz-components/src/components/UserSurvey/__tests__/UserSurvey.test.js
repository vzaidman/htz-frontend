import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import UserSurveyInner from '../UserSurveyInner';

const user = { firstName: 'Yehuda', lastName: 'Goldner', id: '9037999662', };
const userInfo = {
  reactHtzArticleOptIn: null,
  pageCount: 3,
  welcomeScreenViewed: null,
  articlePageSurvey: {
    isOptOut: false,
    isSubmitted: false,
    surveySubmission: null,
    surveyAdditionalText: null,
  },
};

describe('<UserSurveyInner />', () => {
  it('should render UserSurveyInner currectly', () => {
    const { component, styles, } = felaSnapshotter(
      <UserSurveyInner user={user} userInfo={userInfo} />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
