const SURVEY_SKEW_S = 10;
const SURVEY_SKEW = 4;

const slopeWrapper = {
  overflow: 'hidden',
  position: 'relative',
};

const slopeElement = theme => ({
  backgroundImage: `linear-gradient(to bottom, ${theme.color(
    'neutral',
    '-6'
  )}, ${theme.color('primary', '-4')})`,
  transformOrigin: 'logical top end',
  transform: `skewY(${SURVEY_SKEW_S}deg)`,
  width: '100%',
  height: '100%',
  position: 'absolute',
  marginBottom: '5rem',
  pointerEvents: 'none',
  top: '4rem',
  extend: [
    theme.mq(
      { from: 's', },
      {
        top: '0',
        transform: `skewY(${SURVEY_SKEW}deg)`,
      }
    ),
  ],
});

const contentWrapper = theme => ({
  paddingLeft: '2rem',
  paddingRight: '2rem',
  paddingBottom: '2rem',
  position: 'relative',
  extend: [
    theme.mq(
      { from: 's', },
      {
        paddingLeft: '5rem',
        paddingRight: '5rem',
      }
    ),
  ],
});
const closeButton = theme => ({
  position: 'absolute',
  cursor: 'pointer',
  top: '5rem',
  left: '1.5rem',
  zIndex: '1',
  color: theme.color('primary'),
  fontSize: theme.type(1),
  extend: [ theme.mq({ from: 's', }, { top: '1rem', }), ],
});
const topWrapper = theme => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column-reverse',
  extend: [
    theme.mq(
      { from: 's', },
      { flexDirection: 'row', alignItems: 'flex-end', marginTop: '1rem', }
    ),
  ],
});
const surveyTitle = theme => ({
  paddingBottom: '3.5rem',
  marginTop: '3rem',
  extend: [
    theme.mq({ from: 's', }, { marginTop: '0', }),
    theme.type(2, { until: 'xl', }),
    theme.type(1, { from: 'xl', }),
  ],
});
const welcomeCartoon = theme => ({
  alignSelf: 'center',
  margin: 'auto',
  extend: [ theme.mq({ from: 's', }, { alignSelf: 'auto', }), ],
});
const whatYouThink = theme => ({
  color: theme.color('primary', 'base'),
});
const thankYou = theme => ({
  paddingBottom: '3.5rem',
  fontWeight: 'bold',
  fontSize: '4rem',
  width: '100%',
  textAlign: 'center',
  extend: [ theme.mq({ from: 's', }, { textAlign: 'initial', width: 'auto', }), ],
});
const forHelpingUs = theme => ({
  color: theme.color('primary', 'base'),
  fontSize: '4rem',
});

const surveyWrapper = theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  extend: [ theme.mq({ from: 's', }, { flexDirection: 'row', }), ],
});

const radioWrapper = theme => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '13.3rem',
  marginBottom: '3rem',
  extend: [
    theme.mq(
      { from: 's', },
      { flex: 'none', marginLeft: '7.5rem', height: 'auto', marginBottom: '0', }
    ),
  ],
});
const radioStyle = theme => ({
  fontWeight: 'bold',
  display: 'flex',
  color: theme.color('neutral', '-1'),
  extend: [ theme.type(-1), ],
});
const textArea = {
  flex: 1,
};

const buttonWrapper = theme => ({
  textAlign: 'center',
  extend: [ theme.mq({ from: 's', }, { textAlign: 'end', }), ],
});
const button = {
  width: '18.3rem',
  marginTop: '3.5rem',
  marginBottom: '3.5rem',
  type: [ { from: 'xl', value: -1, }, ],
};

export {
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
  radioStyle,
  textArea,
  buttonWrapper,
  button,
};
