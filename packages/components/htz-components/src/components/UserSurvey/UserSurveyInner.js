/* global document */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

// import { Form,RadioButton,Button } from '@haaretz/htz-components';
import Form from '../Form/Form';
import { RadioButton, } from '../RadioButton/RadioButton';
import TextInput from '../TextInput/TextInput';
import IconClose from '../Icon/icons/IconClose';
import WelcomeCartoon from './WelcomeCartoon';
import Button from '../Button/Button';

import UPDATE_PAGE_COUNT from './UpdatePageCount';
import UPDATE_USER_SURVEY from './UpdateUserSurvey';

import { Mutation, } from '../ApolloBoundary/ApolloBoundary';
import H from '../AutoLevels/H';
import Section from '../AutoLevels/Section';
import {
  slopeWrapper,
  slopeElement,
  contentWrapper,
  closeButton,
  topWrapper,
  surveyTitle,
  welcomeCartoon,
  whatYouThink,
  thankYou,
  forHelpingUs,
  surveyWrapper,
  radioWrapper,
  textArea,
  radioStyle,
  buttonWrapper,
  button,
} from './UserServeyCss';

// import { stylesPropType, } from '../../propTypes/stylesPropType';

class UserSurveyInner extends Component {
  static propTypes = {
    /* User information regarding the survey previus interaction */
    userInfo: PropTypes.shape({
      reactHtzArticleOptIn: PropTypes.bool,
      pageCount: PropTypes.number,
      welcomeScreenViewed: PropTypes.bool,
      articlePageSurvey: PropTypes.shape({
        isOptOut: PropTypes.bool,
        isSubmitted: PropTypes.bool,
        surveySubmission: PropTypes.string,
        surveyAdditionalText: PropTypes.string,
      }),
    }).isRequired,
    /* User basic details */
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  };

  state = {
    didCount: false,
    userAnswer: null,
    showSurvey: true,
    userText: '',
    surveySubmited: false,
  };

  onCheck = e => {
    const newState = this.state;
    newState.userAnswer = e.target.value;
    this.setState(newState);
  };

  onSubmit = (user, setArticlePageSurvey) => {
    if (this.state.userAnswer) {
      setArticlePageSurvey({
        variables: {
          id: user.id,
          isOptOut: false,
          isSubmitted: true,
          surveySubmission: this.state.userAnswer,
          surveyAdditionalText: this.state.userText,
        },
      });
      const newState = this.state;
      newState.surveySubmited = true;
      this.setState(newState);
    }
  };

  onClose = async (user, setArticlePageSurvey) => {
    try {
      await setArticlePageSurvey({
        variables: {
          id: user.id,
          isOptOut: true,
          isSubmitted: false,
          surveySubmission: null,
          surveyAdditionalText: null,
        },
      });
      this.hideSurvey();
    }
    catch (error) {
      this.hideSurvey();
    }
  };

  hideSurvey = () => {
    const newState = this.state;
    newState.showSurvey = false;
    this.setState(newState);
  };

  render() {
    const userOptions = {
      1: 'מרוצה מאוד',
      2: 'מרוצה',
      3: 'לא מרוצה',
    };

    const radios = Object.keys(userOptions).map(option => (
      <FelaComponent
        style={{ display: 'flex', }}
        render={({ className, }) => (
          <RadioButton
            key={option}
            label={userOptions[option]}
            className={className}
            value={option}
            miscStyles={radioStyle}
            onChange={this.onCheck}
            checked={this.state.userAnswer === option}
          />
        )}
      />
    ));

    let surveyContent;

    if (this.state.surveySubmited) {
      surveyContent = (
        <div>
          <FelaComponent tagName="div" style={closeButton}>
            <IconClose onClick={this.onClose} />
          </FelaComponent>
          <FelaComponent style={topWrapper} render="div">
            <FelaComponent
              style={thankYou}
              render={({ className, }) => (
                <H className={className}>
                  {'תודה '}
                  <FelaComponent style={forHelpingUs} render="span">
                    שעזרת לנו להיות טובים יותר
                  </FelaComponent>
                </H>
              )}
            />
            <FelaComponent style={welcomeCartoon} render="div">
              <WelcomeCartoon size="25" />
            </FelaComponent>
          </FelaComponent>
        </div>
      );
    }
    else {
      surveyContent = (
        <div>
          <Mutation mutation={UPDATE_USER_SURVEY}>
            {setArticlePageSurvey => (
              <div>
                <FelaComponent tagName="div" style={closeButton}>
                  <IconClose
                    onClick={() =>
                      this.onClose(this.props.user, setArticlePageSurvey)
                    }
                  />
                </FelaComponent>
                <FelaComponent style={topWrapper} render="div">
                  <FelaComponent
                    style={surveyTitle}
                    render={({ className, }) => (
                      <H className={className}>
                        {`היי ${this.props.user.firstName}, `}
                        <FelaComponent style={whatYouThink} render="span">
                          מה דעתך על עמוד הכתבה החדש שלנו?
                        </FelaComponent>
                      </H>
                    )}
                  />
                  <FelaComponent style={welcomeCartoon} render="div">
                    <WelcomeCartoon size="25" />
                  </FelaComponent>
                </FelaComponent>
                <Form
                  onSubmit={() =>
                    this.onSubmit(this.props.user, setArticlePageSurvey)
                  }
                  render={({ handleSubmit, }) => (
                    <div>
                      <FelaComponent render="div" style={surveyWrapper}>
                        <FelaComponent render="div" style={radioWrapper}>
                          {radios}
                        </FelaComponent>
                        <FelaComponent style={{ flex: '1', }}>
                          <TextInput
                            variant="primaryInverse"
                            label=""
                            isTextArea
                            labelHidden
                            placeholder="בחוויה שלי..."
                            height={[
                              { from: 's', value: 13, },
                              { until: 's', value: 16, },
                            ]}
                            miscStyles={textArea}
                            onChange={evt =>
                              this.setState({ userText: evt.target.value, })
                            }
                            value={this.state.userText}
                          />
                        </FelaComponent>
                      </FelaComponent>
                      <FelaComponent style={buttonWrapper} render="div">
                        <Button
                          variant="primary"
                          boxModel={{ hp: 3, vp: 1, }}
                          miscStyles={button}
                          onClick={handleSubmit}
                        >
                          שלח
                        </Button>
                      </FelaComponent>
                    </div>
                  )}
                />
              </div>
            )}
          </Mutation>
        </div>
      );
    }

    return (
      <FelaComponent
        style={{
          ...slopeWrapper,
          ...{ display: this.state.showSurvey ? 'block' : 'none', },
        }}
        render={({ className, }) => (
          <Section tagName="aside" className={className}>
            {!this.state.didCount ? (
              <Mutation mutation={UPDATE_PAGE_COUNT}>
                {setPageCount => {
                  setPageCount({
                    variables: {
                      id: this.props.user.id,
                      value: this.props.userInfo.pageCount + 1,
                    },
                  });

                  this.setState({
                    didCount: true,
                  });
                  return null;
                }}
              </Mutation>
            ) : null}
            <FelaComponent style={slopeElement} render="div" />
            <FelaComponent style={contentWrapper} render="div">
              {surveyContent}
            </FelaComponent>
          </Section>
        )}
      />
    );
  }
}

export default UserSurveyInner;
