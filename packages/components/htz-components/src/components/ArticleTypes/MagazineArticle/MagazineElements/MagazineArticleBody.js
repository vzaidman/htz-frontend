import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../../../utils/componentFromInputTemplate';
import ArticleImage from '../../../ArticleBodyImage/ArticleBodyImage';
import Caption from '../../../Caption/Caption';
import NoSSR from '../../../NoSSR/NoSSR';
import buildImgOptions from './magazineArticleBodyBuildImgOptions';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
};

const defaultProps = {};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

// eslint-disable-next-line react/prop-types
const Figure = ({ lastItem, children, }) => (
  <FelaComponent
    style={theme => (!lastItem
      ? {
        ...parseComponentProp(
          'marginBottom',
          theme.articleStyle.body.marginBottom,
          theme.mq,
          mediaQueryCallback
        ),
      }
      : {})
    }
    render="figure"
  >
    {children}
  </FelaComponent>
);

const buildComponent = (context, index, isLastItem, magazineLayout) => {
  const uniqueId = context.elementType || context.inputTemplate || context.tag || null;

  if ([ 'com.tm.Image', 'com.tm.BlogImage', ].includes(uniqueId)) {
    return (
      <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
        <ArticleImage
          key={context.contentId}
          lastItem={isLastItem}
          {...context}
          imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen, context.viewMode, context.position)
          }
        />
      </MagazineContentWrapper>
    );
  }

  const Component = getComponent(uniqueId);
  switch (uniqueId) {
    case 'embedElement':
      return (
        <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
          <Figure key={context.contentId} lastItem={isLastItem}>
            <Component {...context} />
          </Figure>
        </MagazineContentWrapper>
      );
    case 'com.tm.ImageGalleryElement':
      return (
        <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
          <Figure key={context.contentId} lastItem={isLastItem}>
            <Component
              {...context}
              imgOptions={(aspect, isFullScreen) => buildImgOptions(aspect, isFullScreen)}
            />
            {context.title || context.caption || context.credit ? (
              <Caption caption={context.title || context.caption} credit={context.credit} />
            ) : null}
          </Figure>
        </MagazineContentWrapper>
      );
    case 'interactiveElement':
    case 'com.tm.Video': // eslint-disable-line no-case-declarations
      return (
        <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
          <Figure key={context.contentId} lastItem={isLastItem}>
            <Component {...context} />
            {context.title || context.caption || context.credit ? (
              <Caption caption={context.title || context.caption} credit={context.credit} />
            ) : null}
          </Figure>
        </MagazineContentWrapper>
      );
    case 'com.htz.MagazineArticleQuote':
      return (
        // <Aside key={context.contentId}>
        <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
          <Component {...context} />
        </MagazineContentWrapper>
        // </Aside>
      );
    case 'com.polobase.DfpBannerElement':
      // todo: add miscStyles and then textAlign end on large bp
      return (
        <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
          <Component key={context.contentId} {...context} {...context.properties} />
        </MagazineContentWrapper>
      );
    case 'com.tm.newsLetterQuickRegistrationRespAuto':
      return (
        <NoSSR key={context.contentId}>
          <MagazineContentWrapper component={context} magazineLayout={magazineLayout}>
            <Component
              {...context}
              miscStyles={{
                marginTop: '4rem',
                marginBottom: '4rem',
                maxWidth: [ { from: 's', until: 'l', value: '70rem', }, ],
                marginRight: [ { from: 's', until: 'l', value: 'auto', }, ],
                marginLeft: [ { from: 's', until: 'l', value: 'auto', }, ],
              }}
            />
          </MagazineContentWrapper>
        </NoSSR>
      );
    default:
      return (
        <FelaTheme
          key={context.contentId || uniqueId + index}
          render={theme => (
            <Component
              {...context}
              miscStyles={{
                ...(isLastItem
                  ? {}
                  : parseComponentProp(
                    'marginBottom',
                    theme.articleStyle.body.marginBottom,
                    theme.mq,
                    mediaQueryCallback
                  )),
                marginRight: 'auto',
                marginLeft: 'auto',
                maxWidth: [
                  { until: 's', value: magazineLayout.maxWidth.s, },
                  { from: 's', until: 'm', value: magazineLayout.maxWidth.m, },
                  { from: 'm', until: 'l', value: magazineLayout.maxWidth.ml, },
                  { from: 'l', until: 'xl', value: magazineLayout.maxWidth.l, },
                  { from: 'xl', value: magazineLayout.maxWidth.xl, },
                ],
                paddingInlineStart: [
                  { until: 's', value: magazineLayout.innerPadding.s, },
                  { from: 's', until: 'm', value: magazineLayout.innerPadding.m, },
                  { from: 'm', until: 'l', value: magazineLayout.innerPadding.ml.start, },
                  { from: 'l', until: 'xl', value: magazineLayout.innerPadding.l.start, },
                  { from: 'xl', value: magazineLayout.innerPadding.xl, },
                ],
                paddingInlineEnd: [
                  { until: 's', value: magazineLayout.innerPadding.s, },
                  { from: 's', until: 'm', value: magazineLayout.innerPadding.m, },
                  { from: 'm', until: 'l', value: magazineLayout.innerPadding.ml.end, },
                  { from: 'l', until: 'xl', value: magazineLayout.innerPadding.l.end, },
                  { from: 'xl', value: magazineLayout.innerPadding.xl, },
                ],
              }}
              {...(uniqueId === 'p' || uniqueId === 'a' || uniqueId === 'h4'
                ? {
                  renderFirstImpression: !isLastItem,
                }
                : {})}
            />
          )}
        />
      );
  }
};

const MagazineContentWrapper = ({
  children,
  magazineLayout: { maxWidth, innerPadding, spacing, },
  component,
}) => {
  const { position, viewMode, } = component;
  // if position is left or right we need a absolute position container to take the element out of the flow
  const isAbsolutePosition = position === 'left' || position === 'right';
  const InnerCont = !isAbsolutePosition ? Fragment : FelaComponent;
  return (
    <FelaComponent
      style={theme => ({
        ...(viewMode === 'landscapeView'
          ? {}
          : {
            marginInlineStart: 'auto',
            marginInlineEnd: 'auto',
            extend: [
              theme.mq(
                { from: 'xl', },
                {
                  paddingInlineStart:
                      position === 'midRightPosition' || position === 'midWide'
                        ? 0
                        : innerPadding.xl,
                  paddingInlineEnd:
                      position === 'midLeftPosition' || position === 'midWide'
                        ? 0
                        : innerPadding.xl,
                  maxWidth: maxWidth.xl,
                }
              ),
              theme.mq(
                { from: 'l', until: 'xl', },
                {
                  maxWidth: maxWidth.l,
                  paddingInlineStart:
                      position === 'midRightPosition' || position === 'midWide'
                        ? 0
                        : innerPadding.l.start,
                  paddingInlineEnd:
                      position === 'midLeftPosition' || position === 'midWide'
                        ? 0
                        : innerPadding.l.end,
                }
              ),
              theme.mq(
                { from: 'm', until: 'l', },
                {
                  maxWidth: maxWidth.ml,
                  paddingInlineStart: innerPadding.ml.start,
                  paddingInlineEnd:
                      position === 'midRightPosition'
                      || position === 'midWide'
                      || position === 'midLeftPosition'
                        ? 0
                        : innerPadding.ml.end,
                }
              ),
              theme.mq(
                { from: 's', until: 'm', },
                {
                  maxWidth: maxWidth.m,
                  paddingInlineStart: innerPadding.m,
                  paddingInlineEnd: innerPadding.m,
                }
              ),
              theme.mq(
                { from: 's', },
                {
                  ...(position === 'midLeftPosition'
                    || position === 'midRightPosition'
                    || position === 'midWide'
                    || position === 'midCenterPosition'
                    ? { clear: 'both', }
                    : {}),
                }
              ),
              theme.mq(
                { until: 's', },
                {
                  marginInlineStart: spacing.s,
                  marginInlineEnd: spacing.s,
                }
              ),
            ],
          }),
      })}
    >
      <InnerCont
        {...(isAbsolutePosition
          ? {
            style: theme => ({
              zIndex: 1,
              paddingTop: '1rem',
              extend: [
                theme.mq(
                  { from: 'xl', },
                  {
                    ...(position === 'left'
                      ? {
                        float: 'end',
                        clear: 'end',
                        marginInlineEnd: `-${innerPadding.xl}`,
                        paddingInlineStart: spacing.xl,
                      }
                      : {}),
                    ...(position === 'right'
                      ? {
                        float: 'start',
                        clear: 'start',
                        marginInlineStart: `-${innerPadding.xl}`,
                        paddingInlineEnd: spacing.xl,
                      }
                      : {}),
                    width: innerPadding.xl,
                  }
                ),
                theme.mq(
                  { from: 'l', until: 'xl', },
                  {
                    float: 'end',
                    clear: 'end',
                    marginInlineEnd: `-${innerPadding.l.end}`,
                    paddingInlineStart: spacing.l,
                    width: innerPadding.l.end,
                  }
                ),
                theme.mq(
                  { from: 's', until: 'l', },
                  {
                    ...(position === 'left'
                      ? {
                        float: 'end',
                        width: '37rem',
                        marginInlineStart: spacing.m,
                        marginTop: spacing.m,
                      }
                      : {
                        float: 'start',
                        marginInlineEnd: spacing.m,
                        marginTop: spacing.m,
                      }),
                  }
                ),
              ],
            }),
          }
          : {})}
      >
        {children}
      </InnerCont>
    </FelaComponent>
  );
};

function MagazineArticleBody({ body, magazineLayout, }) {
  return body.map((component, i) => {
    const isLastItem = i === body.length - 1;
    return buildComponent(component, i, isLastItem, magazineLayout);
  });
}

MagazineArticleBody.propTypes = propTypes;
MagazineArticleBody.defaultProps = defaultProps;

export default MagazineArticleBody;
