import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import ButtonFooter from '../Button/Button';
import Link from '../Link/Link';
import LayoutFooterRow from '../PageLayout/LayoutRow';
import LayoutFooterContainer from '../PageLayout/LayoutContainer';
import ExpandedList from './elements/Desktop/ExpandedList';
import {
  ColumnTypes,
  PairTypes,
} from './elements/Desktop/DesktopElementPropTypes';
// Views ///////////////////////////////////////////////////////////////////
import FooterHead from './elements/FooterHead';
import MobileView from './elements/MobileMainContainer';
// ///////////////////////////////////////////////////////////////////

const desktopMainListLayoutContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: [ { from: 's', value: '13rem', }, ],
  paddingBottom: [ { from: 's', value: '8rem', }, { until: 's', value: '4rem', }, ],
};

const headLinkStyle = ({ theme, isLast, }) => ({
  marginLeft: '1rem',
  fontWeight: 'bold',
  ':after': {
    content: isLast ? '""' : '"|"',
    marginRight: '1rem',
  },
});

const StyledHeadLink = createComponent(headLinkStyle, Link, [
  'content',
  'href',
]);

const ListUlStyle = () => ({
  marginInlineEnd: '2rem',
});
const StyledUlLinks = createComponent(ListUlStyle, 'ul');

const ListLiStyle = () => ({
  display: 'inline-block',
});
const StyledLi = createComponent(ListLiStyle, 'li');

const desktopBodyStyle = ({ theme, }) => ({
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
const StyledDesktopBody = createComponent(desktopBodyStyle);

const headWrapperLinkStyle = ({ theme, }) => ({
  display: 'flex',
  flexWrap: 'no-wrap',
  alignItems: 'center',
  marginTop: '2rem',
  marginBottom: '4rem',
  extend: [ theme.mq({ until: 'l', }, { alignItems: 'start', }), ],
});

const StyledHeadLinksWrapper = createComponent(headWrapperLinkStyle);

const optionalExtendedWrapper = ({ theme, }) => ({
  extend: [ theme.type(-2), ],
});
const StyledDesktopText = createComponent(optionalExtendedWrapper);

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
    this.focusElement.focus();
  };

  render() {
    const { theme, } = this.props;
    const {
      theme: { footerDesktopI18n: { ExpandedButton, Copyright, }, color, },
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
        tagName="footer"
      >
        <LayoutFooterContainer
          miscStyles={desktopMainListLayoutContainerStyle}
          bgc={color('footer', 'bg')}
        >
          <FooterHead />
          <MobileView theme={theme} />
          <StyledDesktopBody>
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
              <ButtonFooter
                variant="secondary"
                boxModel={{ hp: 4, vp: 1, }}
                onClick={() => this.handleClick()}
                attrs={{
                  'aria-expanded': expanded ? 'true' : 'false',
                }}
                miscStyles={{ marginInlineStart: 'auto', }}
              >
                {expanded ? ExpandedButton.close : ExpandedButton.showMore}
              </ButtonFooter>
            </StyledHeadLinksWrapper>
            <div
              ref={el => {
                this.focusElement = el;
              }}
              tabIndex="-1"
            >
              <ExpandedList
                toolbox={footer.toolbox}
                columnsArr={columnsArr}
                showMe={expanded}
              />
            </div>
            <StyledDesktopText>{Copyright.firstRow}</StyledDesktopText>
            <StyledDesktopText>{Copyright.secondRow}</StyledDesktopText>
          </StyledDesktopBody>
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
