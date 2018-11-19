import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import SectionTitleA from '../../../SectionTitleA/SectionTitleA';
import Section from '../../../AutoLevels/Section';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';

const margineliaStyle = ({ theme, theme: { layoutStyle, }, hideUnderLargeBreakPoint, }) => ({
  extend: [
    ...(hideUnderLargeBreakPoint ? [ theme.mq({ until: 'l', }, { display: 'none', }), ] : []),
    theme.mq(
      { from: 'l', },
      {
        position: 'absolute',
      }
    ),
    theme.mq(
      { from: 'l', until: 'xl', },
      {
        start: `${layoutStyle.startColumnPadding}rem`,
        maxWidth: `${layoutStyle.startColumnWidthL - layoutStyle.startColumnPadding}rem`,
      }
    ),
    theme.mq(
      { from: 'xl', },
      {
        start: `${layoutStyle.startColumnPaddingXL}rem`,
        maxWidth: `${layoutStyle.startColumnWidthXL - layoutStyle.startColumnPaddingXL}rem`,
      }
    ),
  ],
});

const wrapperStyle = ({ miscStyles, theme, }) => ({
    // marginTop: '3rem',
    ...theme.mq({ from: 'l', }, { marginTop: '4rem', }),
    extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  });

const LiveBlogLayoutRow = ({
  children,
  id,
  isArticleBody,
  title,
  margineliaComponent,
  hideMargineliaComponentUnderLBp,
  isCommentsSection,
  miscStyles,
}) => (
  <FelaComponent
    miscStyles={miscStyles}
    rule={wrapperStyle}
    render={({ className, }) => (
      <Section className={className}>
        {title ? (
          <SectionTitleA isInMargin={!!(id === 'commentsSection')} title={title} id={id || null} />
        ) : null}
        <FelaComponent
          style={({ layoutStyle, mq, }) => ({
            position: 'relative',
            extend: [
              mq(
                { from: 'l', until: 'xl', },
                { paddingInlineStart: `${layoutStyle.startColumnWidthL}rem`, }
              ),
              mq({ from: 'xl', }, { paddingInlineStart: `${layoutStyle.startColumnWidthXL}rem`, }),
            ],
          })}
        >
          <FelaComponent
            rule={margineliaStyle}
            hideUnderLargeBreakPoint={hideMargineliaComponentUnderLBp}
          >
            {margineliaComponent || null}
          </FelaComponent>

          <FelaComponent
            style={theme => ({
                ...(isCommentsSection ? {
                    ...theme.mq({ until: 's', }, { paddingInlineStart: '3rem', paddingInlineEnd: '3rem', }),
                    ...theme.mq(
                        { from: 's', until: 'l', },
                        { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }),
                    } : {}
                ),
              extend: [
                // theme.mq({ until: 's', }, { paddingInlineStart: '3rem', paddingInlineEnd: '3rem', }),
                // theme.mq(
                //   { from: 's', until: 'l', },
                //   { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
                // ),
                theme.mq({ from: 'l', }, { paddingInlineStart: '5rem', paddingInlineEnd: '5rem', }),
              ],
            })}
          >
            {children}
          </FelaComponent>
        </FelaComponent>
      </Section>
    )}
  />
);

LiveBlogLayoutRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  id: PropTypes.string,
  isArticleBody: PropTypes.bool,
  isCommentsSection: PropTypes.bool,
  title: PropTypes.string,
  margineliaComponent: PropTypes.arrayOf(PropTypes.element),
  hideMargineliaComponentUnderLBp: PropTypes.bool,
    /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

LiveBlogLayoutRow.defaultProps = {
  children: null,
  id: null,
  isArticleBody: false,
  isCommentsSection: false,
  title: null,
  margineliaComponent: null,
  hideMargineliaComponentUnderLBp: true,
  miscStyles: null,
};

export default LiveBlogLayoutRow;
