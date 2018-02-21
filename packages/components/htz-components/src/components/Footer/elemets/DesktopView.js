import React, { Fragment, } from 'react';
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
import IconMailFooter from '../../Icon/icons/IconMailFooter';
import IconApple from '../../Icon/icons/IconApple';
import IconAndroid from '../../Icon/icons/IconAndroid';

const headLinkStyle = ({ theme, isLast, }) => ({
  ':after': {
    content: isLast ? '""' : '" | "',
    marginRight: '0.5rem',
  },
  // todo: ask for accurate margin left and right
  marginLeft: '0.5rem',
  fontWeight: 'bold',
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [ 'content', 'href', ]);

const listLinkStyle = ({ theme, isLast, isBold = false, }) => ({
  ...(isBold ? { fontWeight: 'bold', } : {}),
  extend: [ theme.type(-1), ],
});

const StyledListLink = createComponent(listLinkStyle, Link, [ 'content', 'href', 'ref', ]);

const headWrapperLinkStyle = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
});

const StyledHeadLinksWrapper = createComponent(headWrapperLinkStyle);

// todo: instead of wrapper use LayoutRow and LayoutContainer
const wrapperStyle = ({ theme, }) => ({
  paddingTop: '3rem',
  paddingBottom: '3rem',
  // todo: remove left and right padding, add a LayoutContainer component that will control max width
  paddingRight: '4rem',
  paddingLeft: '4rem',
  backgroundColor: theme.color('footer', 'bg'),
  color: theme.color('footer', 'text'),
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
  marginBottom: '4rem',
  marginTop: '2rem',
});
const StyledDesktopMainList = createComponent(desktopMainListStyle);

const desktopTextStyle = ({ theme, }) => ({
  extend: [ theme.type(-2), ],
});

// todo: change from div to p or something else?
const StyledDesktopText = createComponent(desktopTextStyle);

const expandedListContStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '6rem',
  ...borderBottom('1px', '2', 'solid', 'white'),
  marginBottom: '2rem',
});

const StyledExpandedListsCont = createComponent(expandedListContStyle);

const expandedListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'baseline',
});

const StyledExpandedLists = createComponent(expandedListStyle);

const listUlStyle = ({ theme, }) => ({
  marginInlineEnd: '12rem',
  paddingTop: '3rem',
  paddingBottom: '3rem',
});

const StyledLinkUl = createComponent(listUlStyle, 'ul');

const toolboxListStyle = () => ({
  minWidth: '20rem',
});

const StyledToolboxList = createComponent(toolboxListStyle, StyledLinkUl);

const titleLiStyle = ({ theme, }) => ({
  fontWeight: 'bold',
});

const StyledTitleLi = createComponent(titleLiStyle, 'li');

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
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
    this.firstLiEl.focus();
  };
  render() {
    const { footer, loading, } = this.props.Footer;
    const { expanded, } = this.state;
    if (loading) {
      return <div> Loading... </div>;
    }
    const columnsArr = footer.columns.reduce((r, e, i, arr) => {
      const prev = arr[i - 1];
      if (prev && prev.combineWithNextColumn) r[r.length - 1].push(e);
      else r.push([ e, ]);
      return r;
    }, []);

    return (
      <Wrapper>
        <StyledDesktopHead>
          <div>הארץ</div>
          <div>
            <IconFaceBookLogo size={3} miscStyles={IconMiscStyle} />
            <IconTwitter size={3} miscStyles={IconMiscStyle} />
            <IconAndroid size={3} miscStyles={IconMiscStyle} />
            <IconApple size={3} miscStyles={IconMiscStyle} />
            <IconGPlus size={3} miscStyles={IconMiscStyle} />
            <IconMailFooter size={3} miscStyles={IconMiscStyle} />
            <IconRss size={3} miscStyles={IconMiscStyle} />
          </div>
        </StyledDesktopHead>
        <StyledDesktopMainList>
          <StyledHeadLinksWrapper>
            {footer.head.map((item, index) => (
              <StyledHeadLink
                content={item.text}
                href={item.href}
                isLast={index === footer.head.length - 1}
              />
            ))}
          </StyledHeadLinksWrapper>
          <div>
            <ButtonFooter
              variant="secondary"
              boxModel={{ hp: 4.5, vp: 0.75, }}
              onClick={() => this.handleClick()}
              attrs={{
                'aria-exapnded': expanded ? 'true' : 'false',
              }}
            >
              {expanded ? 'סגור' : 'הצג עוד'}
            </ButtonFooter>
          </div>
        </StyledDesktopMainList>
        {expanded ? (
          <StyledExpandedListsCont>
            <StyledExpandedLists>
              {columnsArr.map((lists, colIdx) => (
                <StyledLinkUl>
                  {lists.map((innerList, listIdx) => (
                    <div>
                      <StyledTitleLi>{innerList.title}</StyledTitleLi>
                      {innerList.items.map(link => (
                        <li>
                          <StyledListLink
                            content={link.text}
                            href={link.href}
                            {...(colIdx === 0 && listIdx === 0
                              ? {
                                ref: firstLiEl => {
                                  this.firstLiEl = firstLiEl;
                                },
                              }
                              : {})}
                          />
                        </li>
                      ))}
                    </div>
                  ))}
                </StyledLinkUl>
              ))}
            </StyledExpandedLists>
            <StyledToolboxList>
              {footer.toolbox.map(link => (
                <li>
                  <StyledListLink content={link.text} href={link.href} isBold />
                </li>
              ))}
            </StyledToolboxList>
          </StyledExpandedListsCont>
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
