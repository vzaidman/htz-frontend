import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import ButtonFooter from '../../../Button/Button';
import Link from '../../../Link/Link';
import LayoutFooterRow from '../../../PageLayout/LayoutRow';
import LayoutFooterContainer from '../../../PageLayout/LayoutContainer';
import IconFaceBookLogo from '../../../Icon/icons/IconFacebookLogo';
import IconTwitter from '../../../Icon/icons/IconTwitter';
import IconGPlus from '../../../Icon/icons/IconGPlus';
import IconRss from '../../../Icon/icons/IconRss';
import IconMailFooter from '../../../Icon/icons/IconMailFooter';
import IconApple from '../../../Icon/icons/IconApple';
import IconAndroid from '../../../Icon/icons/IconAndroid';
import ExpandedList from './ExpandedList';
import { ColumnTypes, PairTypes, } from './DesktopElementPropTypes';

const headLinkStyle = ({ theme, isLast, }) => ({
  ':after': {
    content: isLast ? '""' : '"|"',
    marginRight: '1rem',
  },
  marginLeft: '1rem',
  fontWeight: 'bold',
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [ 'content', 'href', ]);

const headWrapperLinkStyle = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '0.5rem',
});

const StyledHeadLinksWrapper = createComponent(headWrapperLinkStyle);

const layoutWrapperAttrsStyle = {
  paddingTop: '3rem',
  paddingBottom: '3rem',
  paddingInlineStart: '15rem',
  paddingInlineEnd: '15rem',
};

const desktopMainListLayoutContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4rem',
  marginTop: '2rem',
};

const desktopHeadStyle = ({
  theme: { color, footerBorderStyle: { borderWidth, lines, borderStyle, }, },
}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  ...borderBottom(borderWidth, lines, borderStyle, color('footer', 'border')),
});
const StyledDesktopHead = createComponent(desktopHeadStyle);

const optionalExtendedWrapper = ({ theme, }) => ({
  extend: [ theme.type(-2), ],

});
const StyledDesktopText = createComponent(optionalExtendedWrapper);

const IconMiscStyle = {
  marginInlineStart: '3.5rem',
};

export class DesktopView extends React.Component {
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
  }

  render() {
    const {
      theme: {
        footerDesktopI18n: { ExpandedButton, Copyright, },
        color,
      },
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
        miscStyles={Object.assign({ color: color('footer', 'text'), }, layoutWrapperAttrsStyle)}
        bgc={color('footer', 'bg')}
      >
        <StyledDesktopHead>
          <div>הארץ</div>
          <div>
            <Link content={<IconFaceBookLogo size={3} miscStyles={IconMiscStyle} />} href="https://www.facebook.com/haaretz" />
            <Link content={<IconTwitter size={3} miscStyles={IconMiscStyle} />} href="https://twitter.com/haaretz" />
            <Link content={<IconAndroid size={3} miscStyles={IconMiscStyle} />} href="https://play.google.com/store/apps/details?id=com.haaretz" />
            <Link content={<IconApple size={3} miscStyles={IconMiscStyle} />} href="https://itunes.apple.com/us/app/id521559643" />
            <Link content={<IconGPlus size={3} miscStyles={IconMiscStyle} />} href="https://plus.google.com/+haaretzcoil" />
            <Link content={<IconMailFooter size={3} miscStyles={IconMiscStyle} />} href="https://www.haaretz.co.il/misc/redemail" />
            <Link content={<IconRss size={3} miscStyles={IconMiscStyle} />} href="https://www.haaretz.co.il/misc/rss" />
          </div>
        </StyledDesktopHead>
        <LayoutFooterContainer
          miscStyles={desktopMainListLayoutContainerStyle}
          bgc={color('footer', 'bg')}
        >
          <StyledHeadLinksWrapper>
            {footer.head.map((item, index) => (
              <StyledHeadLink
                key={`${item.text}${item.href}`}
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
                'aria-expanded': expanded ? 'true' : 'false',
              }}
            >
              {expanded ? ExpandedButton.close : ExpandedButton.showMore}
            </ButtonFooter>
          </div>
        </LayoutFooterContainer>
        <ExpandedList
          toolbox={footer.toolbox}
          columnsArr={columnsArr}
          showMe={expanded}
        />
        <StyledDesktopText>{Copyright.firstRow}</StyledDesktopText>
        <StyledDesktopText>{Copyright.secondRow}</StyledDesktopText>
      </LayoutFooterRow>
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
