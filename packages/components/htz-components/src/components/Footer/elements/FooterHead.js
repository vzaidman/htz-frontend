import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Link from '../../Link/Link';
import IconFaceBookLogo from '../../Icon/icons/IconFacebookLogo';
import IconHaaretzLogo from '../../Icon/icons/IconHaaretzLogo';
import IconTwitter from '../../Icon/icons/IconTwitter';
import IconGPlus from '../../Icon/icons/IconGPlus';
import IconRss from '../../Icon/icons/IconRss';
import IconMailFooter from '../../Icon/icons/IconMailFooter';
import IconApple from '../../Icon/icons/IconApple';
import IconAndroid from '../../Icon/icons/IconAndroid';

const IconMiscStyle = {
  marginTop: [ { until: 's', value: '1.5rem', }, ],
  fontSize: [ { until: 's', value: '3.5rem', }, ],
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
  ...(!isLast && { marginInlineEnd: '3rem', }),
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
                      <Link
                        content={
                          <IconFaceBookLogo
                            miscStyles={IconMiscStyle}
                            size={theme.mq({ from: 's', }) ? 3 : 5}
                          />
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
                      <Link
                        content={
                          <IconTwitter miscStyles={IconMiscStyle} size={3} />
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
                      <Link
                        content={<IconAndroid size={3} />}
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
                      <Link
                        content={<IconApple size={3} />}
                        href="https://itunes.apple.com/us/app/id521559643"
                      />
                    </li>
                  )}
                />
                <FelaComponent
                  rule={IconsListStyle}
                  render={({ className, }) => (
                    <li className={className}>
                      <Link
                        content={
                          <IconGPlus miscStyles={IconMiscStyle} size={3} />
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
                      <Link
                        content={<IconMailFooter size={3} />}
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
                      <Link
                        content={<IconRss size={3} />}
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
