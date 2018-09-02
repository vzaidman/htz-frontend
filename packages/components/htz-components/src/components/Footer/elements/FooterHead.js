import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import HtzLink from '../../HtzLink/HtzLink';
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconHaaretzLogo from '../../Icon/icons/IconHaaretzLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import IconRss from '../../Icon/icons/IconRss';
import IconMail from '../../Icon/icons/IconMail';
import IconApple from '../../Icon/icons/IconApple';
import IconAndroid from '../../Icon/icons/IconAndroid';
import AriaDescription from '../../AriaDescription/AriaDescription';

const IconMiscStyle = {
  marginTop: [ { until: 's', value: '1.5rem', }, ],
  fontSize: [ { until: 's', value: '3.5rem', }, ],
};

const desktopHeadStyle = ({
  theme: {
    color,
    mq,
    footerBorderStyle: { borderWidth, lines, borderStyle, },
  },
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
    }
  ),
});

const LogoMiscStyle = {
  marginBottom: '-1rem',
  paddingTop: [
    {
      until: 's',
      value: '1.5rem',
    },
  ],
};

const LogoStyle = ({
  theme: {
    color,
    mq,
    footerBorderStyle: {
      footerMobileBorderStyle: { borderWidth, lines, borderStyle, },
    },
  },
}) => ({
  marginBottom: '-1rem',
  ...mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      paddingTop: '1.5rem',
      ...borderBottom(
        borderWidth,
        lines,
        borderStyle,
        color('footer', 'border')
      ),
    }
  ),
});

const IconsUlStyle = ({ theme, }) => ({
  marginInlineStart: 'auto',
  fontSize: '3rem',
  ...theme.mq(
    {
      until: 's',
    },
    {
      display: 'block',
      textAlign: 'center',
      marginBottom: '3rem',
    }
  ),
});

const IconsListStyle = ({ theme, isHiddenOnMobile, isLast, }) => ({
  display: 'inline-block',
  ...(!isLast ? { marginInlineEnd: '3rem', } : {}),
  extend: [
    theme.mq(
      {
        until: 's',
      },
      {
        display: isHiddenOnMobile ? 'none' : 'inline-block',
        marginTop: '1.5rem',
        fontSize: '3rem',
        marginInlineStart: '2rem',
      }
    ),
  ],
});

export default function FooterHead() {
  return (
    <FelaComponent
      rule={desktopHeadStyle}
      render={({ className, theme, }) => (
        <div className={className}>
          <FelaComponent
            rule={LogoStyle}
            render={({ className, }) => (
              <div className={className}>
                <IconHaaretzLogo size={6} miscStyles={LogoMiscStyle} />
                <AriaDescription id="footerhaaretzLogo">הארץ</AriaDescription>
              </div>
            )}
          />
          <FelaComponent
            rule={IconsUlStyle}
            render={({ className, }) => (
              <ul className={className}>
                <FelaComponent
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footerfacebookIcon">
                              facebook
                            </AriaDescription>
                            <IconFaceBookLogo miscStyles={IconMiscStyle} />
                          </Fragment>
                        }
                        href="https://www.facebook.com/haaretz"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footertwitterIcon">
                              Twitter
                            </AriaDescription>
                            <IconTwitter miscStyles={IconMiscStyle} />
                          </Fragment>
                        }
                        href="https://twitter.com/haaretz"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  isHiddenOnMobile
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footerandroidIcon">
                              Android
                            </AriaDescription>
                            <IconAndroid />
                          </Fragment>
                        }
                        href="https://play.google.com/store/apps/details?id=com.haaretz"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  isHiddenOnMobile
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footerappleIcon">
                              Apple
                            </AriaDescription>
                            <IconApple />
                          </Fragment>
                        }
                        href="https://itunes.apple.com/us/app/id521559643"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footergoogleplus">
                              Google Plus
                            </AriaDescription>
                            <IconGPlus miscStyles={IconMiscStyle} size={3} />
                          </Fragment>
                        }
                        href="https://plus.google.com/+haaretzcoil"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  isHiddenOnMobile
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footermail">
                              Email
                            </AriaDescription>
                            <IconMail />
                          </Fragment>
                        }
                        href="https://www.haaretz.co.il/misc/redemail"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  isLast
                  isHiddenOnMobile
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <HtzLink
                        content={
                          <Fragment>
                            <AriaDescription id="footerrss">
                              RSS
                            </AriaDescription>
                            <IconRss />
                          </Fragment>
                        }
                        href="https://www.haaretz.co.il/misc/rss"
                      />
                    </li>
                  )}
                />
              </ul>
            )}
          />
        </div>
      )} // The end of the first FelaComponent render method
    />
  );
}
