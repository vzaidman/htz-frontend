import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
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
const headLinkStyle = ({ theme, isLast, }) => ({
  ':after': {
    content: isLast ? '""' : '" | "',
    marginRight: '0.5rem',
  },
  marginLeft: '0.5rem',
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [ 'content', 'href', ]);

const listLinkStyle = ({ theme, isLast, }) => ({
  marginLeft: '0.5rem',
  fontSize: '2rem',
});

const StyledListLink = createComponent(listLinkStyle, Link, [ 'content', 'href', ]);

const toolBoxLinkStyle = ({ theme, isLast, }) => ({
  fontSize: '2.4rem',
  fontWeight: 'bold',
});

const StyledToolBoxHeadLink = createComponent(toolBoxLinkStyle, Link, [ 'content', 'href', ]);

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
  alignItems: 'center',
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
  ...borderBottom('1px', '2', 'solid', 'white'),
  marginBottom: '2rem',
});
const StyledExpandedLists = createComponent(expandedListStyle);

const IconMiscStyle = {
  marginRight: '3.5rem',
};

const PairTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  })
);

const ColumnTypes = PropTypes.arrayOf(
  PropTypes.shape({
    combineWithNextColumn: PropTypes.bool,
    items: PairTypes,
    title: PropTypes.string,
  })
);

class DesktopView extends React.Component {
  static propTypes = {
    Footer: PropTypes.shape({
      /** Indicates data loading state */
      loading: PropTypes.bool,
      /** Indicates data error state */
      error: PropTypes.bool,
      /** Footer data */
      footer: PropTypes.shape({
        head: PairTypes,
        columns: ColumnTypes,
        credit: PairTypes,
        toolbox: PairTypes,
      }),
    }).isRequired,
  };
  state = {
    expanded: false,
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props !== nextProps || this.state.expanded !== nextState.expanded;
  // }

  handleClick = () => {
    console.warn('clicked');
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };
  render() {
    const { footer, loading, } = this.props.Footer;
    const { expanded, } = this.state;
    if (loading) {
      return <div> Loading... </div>;
    }
    console.warn('footer data ', this.props.Footer);
    // console.warn('footer data ', footer);
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
            {footer.head.map((item, index) => (
              <StyledHeadLink
                content={item.text}
                href={item.href}
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
            {footer.columns.map(list => (
              <ul>
                <li>
                  <strong>{list.title}</strong>
                </li>
                {list.items.map(link => (
                  <div>
                    <StyledListLink content={link.text} href={link.href} />
                  </div>
                ))}
              </ul>
            ))}
            <ul>
              {footer.toolbox.map(link => (
                <li>
                  <StyledToolBoxHeadLink content={link.text} href={link.href} />
                </li>
              ))}
            </ul>
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

export default graphql(
  gql`
    {
      footer {
        head {
          text
          href
        }
        columns {
          title
          combineWithNextColumn
          items {
            text
            href
          }
        }
        credit {
          text
          href
        }
        toolbox {
          text
          href
        }
      }
    }
  `,
  { name: 'Footer', }
)(DesktopView);
