import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import ButtonFooter from '../../../Button/Button';
import Link from '../../../Link/Link';
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
    content: isLast ? '""' : '" | "',
    marginRight: '0.5rem',
  },
  // todo: ask for accurate margin left and right
  marginLeft: '0.5rem',
  fontWeight: 'bold',
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [ 'content', 'href', ]);

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
  paddingInlineStart: '4rem',
  paddingInlineEnd: '4rem',
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

const optionalExtendedWrapper = ({ theme, }) => ({

});
const StyledDesktopText = createComponent(optionalExtendedWrapper);

const IconMiscStyle = {
  marginInlineStart: '3.5rem',
};

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
    // this.firstLiEl.focus();
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
              {expanded ? 'סגור' : 'הצג עוד'}
            </ButtonFooter>
          </div>
        </StyledDesktopMainList>
        <ExpandedList toolbox={footer.toolbox} columnsArr={columnsArr} showMe={expanded} />
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
