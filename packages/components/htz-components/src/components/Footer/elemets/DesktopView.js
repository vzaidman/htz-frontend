import React from 'react';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ButtonFooter from '../../Button/Button';
import Link from '../../Link/Link';
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import IconRss from '../../Icon/icons/IconRss';
// import IconMail from '../../Icon/icons/IconMail';
// import IconApple from '../../Icon/icons/IconApple';
// import IconAndroid from '../../Icon/icons/IconAndroid';

const mockMainLinkList = [
  { text: 'מערכת', link: 'https://www.haaretz.co.il', },
  { text: 'הנהלה', link: 'https://www.haaretz.co.il', },
  { text: 'אודות הארץ', link: 'https://www.haaretz.co.il', },
  { text: 'דרושים', link: 'https://www.haaretz.co.il', },
  { text: 'צור קשר', link: 'https://www.haaretz.co.il', },
  { text: 'עשה מנוי', link: 'https://www.haaretz.co.il', },
  { text: 'שאלות ותשובות', link: 'https://www.haaretz.co.il', },
  { text: 'ביטול מנוי דיגיטלי', link: 'https://www.haaretz.co.il', },
  { text: 'פרסם אלינו', link: 'https://www.haaretz.co.il', },
];
const linkStyle = ({ theme, isLast, }) => ({
  ':after': {
    content: isLast ? '""' : '" | "',
    marginRight: '0.5rem',
  },
  marginLeft: '0.5rem',
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

const StyledLink = createComponent(linkStyle, Link, [ 'content', 'href', ]);

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
  alignItems: 'space-between',
  paddingBottom: '4rem',
  paddingTop: '2rem',
});
const StyledDesktopMainList = createComponent(desktopMainListStyle);

const desktopTextStyle = ({ theme, }) => ({
  fontSize: '10px',
  marginTop: '-1rem',
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
          <div>
            {mockMainLinkList.map((item, index) => (
              <StyledLink
                content={item.text}
                href={item.link}
                isLast={index === mockMainLinkList.length - 1}
              />
            ))}
          </div>
          <div>
            <ButtonFooter
              variant="secondary"
              boxModel={{ hp: 4.5, vp: 0.75, }}
              onClick={() => this.handleClick()}
            >
              {expanded ? 'סגור' : 'הצג עוד'}
            </ButtonFooter>
          </div>
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
        <StyledDesktopText>© כל הזכויות שמורות להוצאת עיתון הארץ בעמ</StyledDesktopText>
      </Wrapper>
    );
  }
}

export default DesktopView;
