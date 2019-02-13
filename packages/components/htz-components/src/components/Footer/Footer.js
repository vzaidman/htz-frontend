import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';

import Query from '../ApolloBoundary/Query';
import ButtonFooter from '../Button/Button';
import HtzLink from '../HtzLink/HtzLink';
import LayoutFooterRow from '../PageLayout/LayoutRow';
import LayoutFooterContainer from '../PageLayout/LayoutContainer';
import ExpandedList from './elements/Desktop/ExpandedList';
// Views ///////////////////////////////////////////////////////////////////
import FooterHead from './elements/FooterHead';
import MobileView from './elements/MobileMainContainer';
// ///////////////////////////////////////////////////////////////////
import FirstImpressionPlaceHolder from '../Paragraph/FirstImpressionPlaceholder';
import OutbrainPlaceholder from '../Paragraph/OutbrainPlaceholder';
import AccessListByIp from '../Scripts/AccessListByIp';
import UniversitiesPush from '../Scripts/UniversitiesPush';

import FirstImpression from '../Scripts/FirstImpression';
import IdxNielsen from '../Scripts/IdxNielsen';
import CrazyEgg from '../Scripts/CrazyEgg';
import OutbrainTVR from '../Scripts/OutbrainTVR';
import ChartBeat from '../Scripts/ChartBeat';
import Permutive from '../Scripts/Permutive';

const GET_FOOTER_ITEMS = gql`
  query FooterQuery($listId: String!) {
    footer(listId: $listId) {
      headList {
        contentName
        value
      }
      columns {
        contentName
        combineWithNextColumn
        rows {
          contentName
          value
        }
      }
      creditList {
        contentName
        value
      }
      toolbox {
        contentName
        value
      }
    }
  }
`;

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

const StyledHeadLink = createComponent(headLinkStyle, HtzLink, [ 'content', 'href', ]);

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

class Footer extends React.Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired,
    shouldRenderScripts: PropTypes.bool,
  };

  static defaultProps = {
    shouldRenderScripts: false,
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
    const { expanded, } = this.state;
    const { contentId, shouldRenderScripts, } = this.props;
    return (
      <Fragment>
        <FirstImpressionPlaceHolder />
        <FelaTheme
          render={theme => {
            const {
              footerDesktopI18n: { ExpandedButton, Copyright, },
              color,
            } = theme;
            return (
              <Query query={GET_FOOTER_ITEMS} variables={{ listId: contentId, }}>
                {({ data, loading, error, }) => {
                  if (error) return null;
                  if (loading) return null;
                  const { footer, } = data;
                  const columnsArr = footer.columns.reduce((r, e, i, arr) => {
                    const prev = arr[i - 1];
                    if (prev && prev.combineWithNextColumn) {
                      r[r.length - 1].push(e);
                    }
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
                              {footer.headList.map((item, index) => (
                                <StyledLi key={`${item.contentName}${item.value}`}>
                                  <StyledHeadLink
                                    key={`${item.contentName}${item.value}`}
                                    content={item.contentName}
                                    href={item.value}
                                    isLast={index === footer.headList.length - 1}
                                  />
                                </StyledLi>
                              ))}
                            </StyledUlLinks>
                            <ButtonFooter
                              variant="inverse"
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
                }}
              </Query>
            );
          }}
        />
        <AccessListByIp />
        <ChartBeat shouldRender={shouldRenderScripts} />
        <UniversitiesPush />
        <FirstImpression />
        <Permutive />
        <FirstImpressionPlaceHolder />
        <IdxNielsen shouldRender={shouldRenderScripts} />
        <CrazyEgg shouldRender={shouldRenderScripts} />
        <OutbrainTVR />
        <OutbrainPlaceholder />
      </Fragment>
    );
  }
}
export default Footer;
