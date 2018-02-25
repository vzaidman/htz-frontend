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

const desktopHeadStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  ...borderBottom('1px', '2', 'solid', 'white'),
});
const StyledDesktopHead = createComponent(desktopHeadStyle);

const optionalExtendedWrapper = ({ theme, }) => ({});
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
    // this.firstLiEl.focus();
  };
  render() {
    // eslint-disable-next-line react/prop-types
    const { theme, } = this.props;
    const { footerDesktopI18n: { ExpandedButton, Copyright, }, } = theme;
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
      <LayoutFooterRow
        miscStyles={Object.assign(
          { color: theme.color('footer', 'text'), },
          layoutWrapperAttrsStyle
        )}
        bgc={theme.color('footer', 'bg')}
      >
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
        <LayoutFooterContainer miscStyles={desktopMainListLayoutContainerStyle} bgc={theme.color('footer', 'bg')}>
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
                'aria-exapnded': expanded ? 'true' : 'false',
              }}
            >
              {expanded ? ExpandedButton.close : ExpandedButton.showMore }
            </ButtonFooter>
          </div>
        </LayoutFooterContainer>
        <ExpandedList toolbox={footer.toolbox} columnsArr={columnsArr} showMe={expanded} />
        <StyledDesktopText>
          {Copyright.firstRow}
        </StyledDesktopText>
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
