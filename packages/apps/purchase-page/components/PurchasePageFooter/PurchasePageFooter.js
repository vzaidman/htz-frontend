import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import {
  IconAlefLogo,
  IconTheMarker,
  Link,
  BIAction,
} from '@haaretz/htz-components';

import Astronaut from '../illustrations/Astronaut/Astronaut';
import Diver from '../illustrations/Diver/Diver';

const propTypes = {
  /** passed as a a prop by fela's withTheme func before default export */
  host: PropTypes.string.isRequired,
  hasIllustration: PropTypes.bool,
  /** passing stage from client promotionsPageState to BIAction */
  stage: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]).isRequired,
};

const defaultProps = {
  hasIllustration: true,
};

const footerContStyle = theme => ({
  position: 'relative',
  backgroundColor: theme.color('purchasePageFooter', 'bg'),
  color: theme.color('purchasePageFooter', 'text'),
  extend: [ theme.mq({ until: 'l', }, { flexDirection: 'row-reverse', }), ],
});
const footerLinkListContStyle = theme => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '4rem',
  paddingBottom: '5rem',
});

const linkStyle = ({ theme, isLast = false, }) => ({
  paddingInlineEnd: '1rem',
  paddingInlineStart: '1rem',
  extend: [ theme.type(0), ],
});

const StyledLink = createComponent(linkStyle, Link, [
  'href',
  'content',
  'onClick',
]);

const homePageLinkStyle = ({ theme, }) => ({
  fontWeight: 'bold',
  marginTop: '1rem',
  textAlign: 'center',
});

const StyledHomePageLink = createComponent(homePageLinkStyle, StyledLink, [
  'href',
  'content',
  'onClick',
]);

const linkListStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '3rem',
  extend: [
    theme.mq(
      { until: 's', },
      { flexDirection: 'column', alignItems: 'center', marginTop: 'none', }
    ),
  ],
});

const StyledLinkList = createComponent(linkListStyle, 'ul');

const listItemStyle = ({ theme, isLast = false, }) => ({
  ...(!isLast
    ? {
      ':after': {
        content: '"|"',
      },
    }
    : {}),
  extend: [
    theme.mq(
      { until: 's', },
      {
        marginTop: '1rem',
        ':after': {
          content: '""',
        },
      }
    ),
  ],
});

const StyledListItem = createComponent(listItemStyle, 'li');

export function PurchasePageFooter({ host, hasIllustration, stage, }) {
  const isTheMarker = host === 'themarker.com';
  return (
    <FelaComponent style={footerContStyle}>
      <FelaComponent
        style={footerLinkListContStyle}
        render={({
          className,
          theme: { purchasePageFooter: { homePageLink, links, }, },
        }) => (
          <div className={className}>
            <BIAction>
              {action => (
                <StyledHomePageLink
                  href={homePageLink.href[host]}
                  content={
                    <Fragment>
                      {isTheMarker ? (
                        <IconTheMarker
                          color="primary"
                          fill={[ 'purchasePageFooter', 'bg', ]}
                          size={6}
                        />
                      ) : (
                        <IconAlefLogo
                          color="white"
                          fill={[ 'purchasePageFooter', 'bg', ]}
                          size={6}
                        />
                      )}
                      <p>{homePageLink.text}</p>
                    </Fragment>
                  }
                  onClick={() => {
                    action({
                      actionCode: 42,
                      additionalInfo: {
                        stage,
                      },
                    });
                  }}
                />
              )}
            </BIAction>
            <StyledLinkList>
              {links.map((link, idx) => (
                <StyledListItem isLast={idx === links.length - 1} key={link.id}>
                  <BIAction>
                    {action => (
                      <StyledLink
                        onClick={() => {
                          action({
                            actionCode: link.text === 'שאלות ותשובות' ? 43 : 41,
                            additionalInfo: {
                              stage,
                            },
                          });
                        }}
                        href={link.href[host]}
                        content={link.text}
                      />
                    )}
                  </BIAction>
                </StyledListItem>
              ))}
            </StyledLinkList>
          </div>
        )}
      />
      {hasIllustration && (
        <FelaComponent
          style={theme => ({
            position: 'absolute',
            bottom: '0',
            overflow: 'hidden',
            maxHeight: isTheMarker ? '200%' : '135%',
            extend: [
              theme.mq({ from: 'l', }, { left: '10rem', }),
              theme.mq({ from: 'm', until: 'l', }, { left: '0', }),
              theme.mq(
                { from: 's', until: 'm', },
                {
                  right: isTheMarker ? '-5rem' : '-6rem',
                  maxHeight: isTheMarker ? '135%' : '120%',
                }
              ),
              theme.mq(
                { until: 's', },
                {
                  right: isTheMarker ? '-9rem' : '-10rem',
                  maxHeight: isTheMarker ? '100%' : '55%',
                }
              ),
            ],
          })}
        >
          {isTheMarker ? (
            <Diver
              size={[
                { until: 's', value: 30, },
                { from: 's', until: 'm', value: 40, },
                { from: 'm', until: 'l', value: 50, },
                { from: 'l', value: 60, },
              ]}
            />
          ) : (
            <Astronaut
              size={[
                { until: 's', value: 30, },
                { from: 's', until: 'm', value: 40, },
                { from: 'm', until: 'l', value: 50, },
                { from: 'l', value: 60, },
              ]}
            />
          )}
        </FelaComponent>
      )}
    </FelaComponent>
  );
}

PurchasePageFooter.propTypes = propTypes;

PurchasePageFooter.defaultProps = defaultProps;

export default PurchasePageFooter;
