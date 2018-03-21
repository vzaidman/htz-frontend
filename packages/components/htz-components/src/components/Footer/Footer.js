import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import ButtonFooter from '../Button/Button';
import Link from '../Link/Link';
import LayoutFooterRow from '../PageLayout/LayoutRow';
import LayoutFooterContainer from '../PageLayout/LayoutContainer';
import IconFaceBookLogo from '../Icon/icons/IconFacebookLogo';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconTwitter from '../Icon/icons/IconTwitter';
import IconGPlus from '../Icon/icons/IconGPlus';
import IconRss from '../Icon/icons/IconRss';
import IconMailFooter from '../Icon/icons/IconMailFooter';
import IconApple from '../Icon/icons/IconApple';
import IconAndroid from '../Icon/icons/IconAndroid';
import ExpandedList from './elements/Desktop/ExpandedList';
import {
  ColumnTypes,
  PairTypes,
} from './elements/Desktop/DesktopElementPropTypes';
import MobileView from './elements/MobileMainContainer';

const desktopMainListLayoutContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: [ { from: 's', value: '10rem', }, ],
  paddingBottom: [ { from: 's', value: '10rem', }, { until: 's', value: '2rem', }, ],
};

const desktopHeadStyle = ({
  theme: { color, mq, footerBorderStyle: { borderWidth, lines, borderStyle, }, },
}) => ({
  ...mq(
    { from: 's', },
    {
      ...borderBottom(
        borderWidth,
        lines,
        borderStyle,
        color('footer', 'border')
      ),
      alignItems: 'baseline',
      display: 'flex',
      justifyContent: 'space-between',
    }
  ),
});

const StyledDesktopHead = createComponent(desktopHeadStyle);

const LogoStyle = ({
  theme: {
    color,
    mq,
    footerBorderStyle: {
      footerMobileBorderStyle: { borderWidth, lines, borderStyle, },
    },
  },
}) => ({
  ...mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      ...borderBottom(
        borderWidth,
        lines,
        borderStyle,
        color('footer', 'border')
      ),
    }
  ),
});
const StyledLogo = createComponent(LogoStyle);

const IconsStyle = ({ theme, }) => ({
  ...theme.mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      marginInlineStart: '-3rem',
      marginBottom: '3rem',
    }
  ),
});
const StyledIcons = createComponent(IconsStyle);

const IconMiscStyle = {
  marginInlineStart: [
    { from: 's', value: '3rem', },
    { until: 's', value: '4rem', },
  ],
  marginTop: [ { until: 's', value: '1.5rem', }, ],
  fontSize: [ { until: 's', value: '3.5rem', }, ],
};

const GoogleIconMiscStyle = {
  marginInlineStart: [
    { from: 's', value: '3rem', },
    { until: 's', value: '4rem', },
  ],
  marginTop: [ { until: 's', value: '2rem', }, ],
  fontSize: [ { until: 's', value: '4rem', }, ],
};

const MobileIconStyle = {
  display: [ { until: 's', value: 'none', }, ],
  marginInlineStart: '3rem',
};

const headLinkStyle = ({ theme, isLast, }) => ({
  ':after': {
    content: isLast ? '""' : '"|"',
    marginRight: '1rem',
  },
  marginLeft: '1rem',
  fontWeight: 'bold',
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [
  'content',
  'href',
]);

const ListLiStyle = () => ({
  display: 'inline-block',
});
const StyledLi = createComponent(ListLiStyle, 'li');

const ListUlStyle = () => ({
  marginInlineEnd: '2rem',
});
const StyledUlLinks = createComponent(ListUlStyle, 'ul');

const headWrapperLinkStyle = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'no-wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  marginBottom: '5rem',
  extend: [
    {
      ...theme.mq(
        {
          until: 's',
        },
        {
          display: 'none',
        }
      ),
    },
  ],
});

const StyledHeadLinksWrapper = createComponent(headWrapperLinkStyle);

const optionalExtendedWrapper = ({ theme, }) => ({
  extend: [
    theme.type(-2),
    theme.mq(
      {
        until: 's',
      },
      {
        display: 'none',
      }
    ),
  ],
});
const StyledDesktopText = createComponent(optionalExtendedWrapper);

// todo: ask if there is better fix for logo when svg shape is not square
const LogoMiscStyle = {
  marginBottom: '-1rem',
  // marginTop: '0.5rem',
  // marginInlineStart: '-0.5rem',
  paddingTop: [
    {
      until: 's',
      value: '1.5rem',
    },
  ],
};

export class Footer extends React.Component {
  static propTypes = {
    Footer: PropTypes.shape({
      /** Indicates data loading state */
      loading: PropTypes.bool,
      /** Indicates data error state */
      error: PropTypes.bool,
      /** Footer data from polopoly */
      footer: PropTypes.shape({
        head: PairTypes,
        columns: ColumnTypes,
        credit: PairTypes,
        toolbox: PairTypes,
      }),
    }).isRequired,
    theme: PropTypes.shape({
      footerDesktopI18n: PropTypes.shape({
        ExpandedButton: PropTypes.object,
        Copyright: PropTypes.object,
      }),
      color: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    expanded: false,
  };

  handleClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  render() {
    const { theme, } = this.props;
    const {
      theme: { footerDesktopI18n: { ExpandedButton, Copyright, }, color, mq, },
      Footer: { footer, loading, },
    } = this.props;

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
      <LayoutFooterRow
        bgc={color('footer', 'bg')}
        miscStyles={{
          color: color('footer', 'text'),
          paddingInlineStart: '8rem',
          paddingInlineEnd: '8rem',
        }}
      >
        <LayoutFooterContainer
          miscStyles={desktopMainListLayoutContainerStyle}
          bgc={color('footer', 'bg')}
        >
          <StyledDesktopHead>
            <StyledLogo>
              <IconHaaretzLogo size={6} miscStyles={LogoMiscStyle} />
            </StyledLogo>
            <StyledIcons>
              <Link
                content={
                  <IconFaceBookLogo
                    size={mq({ from: 's', }) ? 3 : 5}
                    miscStyles={IconMiscStyle}
                  />
                }
                href="https://www.facebook.com/haaretz"
              />
              <Link
                content={<IconTwitter size={3} miscStyles={IconMiscStyle} />}
                href="https://twitter.com/haaretz"
              />
              <Link
                content={<IconAndroid size={3} miscStyles={MobileIconStyle} />}
                href="https://play.google.com/store/apps/details?id=com.haaretz"
              />
              <Link
                content={<IconApple size={3} miscStyles={MobileIconStyle} />}
                href="https://itunes.apple.com/us/app/id521559643"
              />
              <Link
                content={
                  <IconGPlus size={3} miscStyles={GoogleIconMiscStyle} />
                }
                href="https://plus.google.com/+haaretzcoil"
              />
              <Link
                content={
                  <IconMailFooter size={3} miscStyles={MobileIconStyle} />
                }
                href="https://www.haaretz.co.il/misc/redemail"
              />
              <Link
                content={<IconRss size={3} miscStyles={MobileIconStyle} />}
                href="https://www.haaretz.co.il/misc/rss"
              />
            </StyledIcons>
          </StyledDesktopHead>
          <MobileView theme={theme} />
          <StyledHeadLinksWrapper>
            <StyledUlLinks>
              {footer.head.map((item, index) => (
                <StyledLi key={`${item.text}${item.href}`}>
                  <StyledHeadLink
                    key={`${item.text}${item.href}`}
                    content={item.text}
                    href={item.href}
                    isLast={index === footer.head.length - 1}
                  />
                </StyledLi>
              ))}
            </StyledUlLinks>
            <StyledLi>
              <ButtonFooter
                variant="secondary"
                boxModel={{ hp: 4.5, vp: 0.75, }}
                onClick={() => this.handleClick()}
                attrs={{
                  'aria-expanded': expanded ? 'true' : 'false',
                }}
              >
                {expanded ? ExpandedButton.close : ExpandedButton.showMore}
              </ButtonFooter>
            </StyledLi>
          </StyledHeadLinksWrapper>

          <ExpandedList
            toolbox={footer.toolbox}
            columnsArr={columnsArr}
            showMe={expanded}
          />
          <StyledDesktopText>{Copyright.firstRow}</StyledDesktopText>
          <StyledDesktopText>{Copyright.secondRow}</StyledDesktopText>
        </LayoutFooterContainer>
      </LayoutFooterRow>
    );
  }
}
const footerWithTheme = withTheme(Footer);

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
)(footerWithTheme);
