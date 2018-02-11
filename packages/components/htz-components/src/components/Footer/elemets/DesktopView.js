import React from 'react';
import { createComponent, } from 'react-fela';
import {
  borderBottom,
  borderTop,
  parseComponentProp,
  parseStyleProps,
} from '@haaretz/htz-css-tools';
import Button from '../../Button/Button';
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import IconRss from '../../Icon/icons/IconRss';
// import IconMail from '../../Icon/icons/IconMail';
// import IconApple from '../../Icon/icons/IconApple';
// import IconAndroid from '../../Icon/icons/IconAndroid';
// import { buttonBoxModelType, } from './buttonBoxModelType';

const wrapperStyle = ({ theme, }) => ({
  display: 'block',
  width: '100%',
  padding: '3rem 20rem 3rem 20rem',
  backgroundColor: theme.color('footer', 'bg'),
  color: theme.color('footer', 'text'),
  direction: 'rtl',
});
const Wrapper = createComponent(wrapperStyle);

const desktopHeadStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  ...borderBottom('1px', '2', 'solid', 'white'),
});
const StyledDesktopHead = createComponent(desktopHeadStyle);

const desktopMainListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingBottom: '4rem',
  paddingTop: '2rem',
});
const StyledDesktopMainList = createComponent(desktopMainListStyle);

const desktopTextStyle = ({ theme, }) => ({
  fontSize: '10px',
});
const StyledDesktopText = createComponent(desktopTextStyle);

const expandedListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingBottom: '6rem',
  paddingTop: '1rem',
});
const StyledExpandedLists = createComponent(expandedListStyle);

const IconMiscStyle = {
  marginRight: '3.5rem',
};

class DesktopView extends React.Component {
  state = {
    expanded: false,
  };
  handleClick = () => {
    console.warn('clicked');
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };
  render() {
    const { expanded, } = this.state;
    return (
      <Wrapper>
        <StyledDesktopHead>
          <div>הארץ</div>
          <div>
            <IconFaceBookLogo size={3} miscStyles={IconMiscStyle} />
            <IconTwitter size={3} miscStyles={IconMiscStyle} />
            <IconGPlus size={3} miscStyles={IconMiscStyle} />
            <IconRss size={3} miscStyles={IconMiscStyle} />
            <IconRss size={3} miscStyles={IconMiscStyle} />
            <IconRss size={3} miscStyles={IconMiscStyle} />
            <IconRss size={3} miscStyles={IconMiscStyle} />
          </div>
        </StyledDesktopHead>
        <StyledDesktopMainList>
          <span>
            מערכת | הנהלה | אודות הארץ | דרושים | צור קשר | עשה מנוי | שאלות ותשובות | ביטול מנוי
            דיגיטלי | פרסם אלינו
          </span>
          <span>
            <Button
              variant="secondary"
              boxModel={{ hp: 4.5, vp: 1, }}
              onClick={() => this.handleClick()}
            >
              {expanded ? 'סגור' : 'הצג עוד'}
            </Button>
          </span>
        </StyledDesktopMainList>
        {expanded ? (
          <StyledExpandedLists>
            <div>List 1</div>
            <div>List 2</div>
            <div>List 3</div>
            <div>List 4</div>
            <div>List 5</div>
          </StyledExpandedLists>
        ) : null}
        <StyledDesktopText>
          חדשות, ידיעות מהארץ והעולם - הידיעות והחדשות בעיתון הארץ. סקופים, מאמרים, פרשנויות ותחקירי
          עומק באתר האיכותי בישראל
        </StyledDesktopText>
        <StyledDesktopText>© כל הזכויות שמורות להוצאת עיתון הארץ בע"מ</StyledDesktopText>
      </Wrapper>
    );
  }
}

export default DesktopView;
