import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import SectionTitleA from '../SectionTitleA/SectionTitleA';
import Section from '../AutoLevels/Section';

const margineliaStyle = ({
  theme,
  theme: { layoutStyle, },
  hideUnderLargeBreakPoint,
}) => ({
  extend: [
    ...(hideUnderLargeBreakPoint
      ? [ theme.mq({ until: 'l', }, { display: 'none', }), ]
      : []),
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
        maxWidth: `${layoutStyle.startColumnWidthL
          - layoutStyle.startColumnPadding}rem`,
      }
    ),
    theme.mq(
      { from: 'xl', },
      {
        start: `${layoutStyle.startColumnPaddingXL}rem`,
        maxWidth: `${layoutStyle.startColumnWidthXL
          - layoutStyle.startColumnPaddingXL}rem`,
      }
    ),
  ],
});

const ArticleLayoutRow = ({
  children,
  id,
  isArticleBody,
  title,
  margineliaComponent,
  hideMargineliaComponentUnderLBp,
}) => (
  <FelaComponent
    style={theme => ({
      marginTop: '3rem',
      // backgroundColor: 'white',
      extend: [ theme.mq({ from: 'xl', }, { marginTop: '4rem', }), ],
    })}
    render={({ className, }) => (
      <Section className={className}>
        {title ? (
          <SectionTitleA
            isInMargin={!!(id === 'commentsSection')}
            title={title}
            id={id || null}
          />
        ) : null}
        <FelaComponent
          style={({ layoutStyle, mq, }) => ({
            position: 'relative',
            extend: [
              mq(
                { from: 'l', until: 'xl', },
                { paddingInlineStart: `${layoutStyle.startColumnWidthL}rem`, }
              ),
              mq(
                { from: 'xl', },
                { paddingInlineStart: `${layoutStyle.startColumnWidthXL}rem`, }
              ),
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
              extend: [
                theme.mq(
                  { until: 's', },
                  { paddingInlineStart: '3rem', paddingInlineEnd: '3rem', }
                ),
                theme.mq(
                  { from: 's', until: 'l', },
                  { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
                ),
                theme.mq({ from: 'l', }, { paddingInlineStart: '5rem', }),
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

ArticleLayoutRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  id: PropTypes.string,
  isArticleBody: PropTypes.bool,
  title: PropTypes.string,
  margineliaComponent: PropTypes.arrayOf(PropTypes.element),
  hideMargineliaComponentUnderLBp: PropTypes.bool,
};

ArticleLayoutRow.defaultProps = {
  children: null,
  id: null,
  isArticleBody: false,
  title: null,
  margineliaComponent: null,
  hideMargineliaComponentUnderLBp: true,
};

export default ArticleLayoutRow;
