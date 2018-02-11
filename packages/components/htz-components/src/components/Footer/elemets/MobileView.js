import React from 'react';
import { createComponent, } from 'react-fela';
import {
  borderBottom,
  borderTop,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
// import { buttonBoxModelType, } from './buttonBoxModelType';

const wrapperStyle = ({ theme, }) => ({
  display: 'block',
  textAlign: 'center',
  width: '100%',
  padding: '2rem 7rem 2rem 7rem',
  backgroundColor: '#005479',
  color: 'white',
  direction: 'rtl',
});
const Wrapper = createComponent(wrapperStyle);

const mobileHeadStyle = ({ theme, }) => ({
  fontSize: '4rem',
  ...borderBottom('1px', '2', 'solid', 'white'),
});
const StyledMobileHead = createComponent(mobileHeadStyle);

const mobileMainListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingBottom: '4rem',
  paddingTop: '4rem',
});
const StyledMobileMainList = createComponent(mobileMainListStyle, 'div');

const linkBoxStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'space-around',
});
const StyledLinkBox = createComponent(linkBoxStyle, 'ul');

const linkStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  marginTop: '1rem',
  marginBottom: '1rem',
});

const StyledLink = createComponent(linkStyle, 'li');

const textStyle = ({ theme, }) => ({
  fontSize: '10px',
});
const StyledText = createComponent(textStyle);

const listOne = [ 'רכשו מנוי', 'בלוגים', 'תנאי שימוש', ];

const MobileView = props => (
  <Wrapper>
    <StyledMobileHead> הארץ </StyledMobileHead>
    <div> Icons </div>
    <StyledMobileMainList>
      <StyledLinkBox>{listOne.map(link => <StyledLink>{link}</StyledLink>)}</StyledLinkBox>
      <StyledLinkBox>{listOne.map(link => <StyledLink>{link}</StyledLink>)}</StyledLinkBox>
      {/* <StyledRow>
        <div>רכשו מנוי</div>
        <div>צרו קשר</div>
      </StyledRow>
      <StyledRow>
        <div>בלוגים</div>
        <div>פרסמו באתר</div>
      </StyledRow>
      <StyledRow>
        <div>שירות למנויים</div>
        <div>תנאי שימוש</div>
      </StyledRow> */}
    </StyledMobileMainList>
    <button>להורדת האפליקציה</button>
    <StyledText>© כל הזכויות שמורות</StyledText>
  </Wrapper>
);

export default MobileView;
