import React, { Fragment, } from 'react';
import { createComponent, } from 'react-fela';
import {
  parseStyleProps,
  parseTypographyProp,
  borderVertical,
  parseComponentProp,
} from '@haaretz/htz-css-tools';

// eslint-disable-next-line import/no-named-as-default
import Grid from '../Grid/Grid';
// eslint-disable-next-line import/no-named-as-default
import GridItem from '../Grid/GridItem';
import CreditArticle from '../Credit/CreditArticle';
import AlertsDesktopButton from '../AlertsButton/AlertsDesktopButton';
import AlertsMobileButton from '../AlertsButton/AlertsMobileButton';
import Image from '../Image/Image';
import Time from '../Time/Time';

const wrapperStyle = ({ theme, miscStyles, }) => ({
  extend: [
    theme.mq(
      { until: 'm', },
      {
        ...borderVertical({
          width: '1px',
          lines: 1,
          style: 'solid',
          color: theme.color('neutral', '-5'),
        }),
      }
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const Wrapper = createComponent(wrapperStyle);

const TimeStyled = createComponent(
  ({ theme, }) => ({
    marginEnd: '1rem',
    ...parseComponentProp(
      'display',
      [
        { until: 'm', value: 'block', },
        { from: 'm', until: 'l', value: 'inline', },
        { from: 'l', value: 'none', },
      ],
      theme.mq,
      (prop, value) => ({ [prop]: value, })
    ),
    extend: [
      parseTypographyProp(theme.articleStyle.header.bylineFontSize, theme.type),
    ],
  }),
  Time,
  [ 'time', 'format', ]
);

// eslint-disable-next-line react/prop-types
function ArticleByLineMobileComponent({ authors, publishDateTime, }) {
  const authorMiscStyles = {
    marginEnd: '1rem',
    display: [ { until: 'l', value: 'inline', }, { from: 'l', value: 'none', }, ],
    ...(authors.length > 1 && {
      ':nth-last-child(1n+4):after': {
        content: '","',
      },
      ':nth-last-child(2):before': {
        content: '"ו"',
      },
    }),
  };
  return (
    <Wrapper>
      <Grid
        gutter={1}
        vAlign="center"
        miscStyles={{
          flexWrap: 'nowrap',
        }}
      >
        {/*  Author image */}
        {authors[0].image && (
          <GridItem
            width={6}
            miscStyles={{
              display: [ { from: 'm', value: 'none', }, ],
            }}
          >
            <Image
              data={authors[0].image}
              imgOptions={{
                transforms: {
                  width: '100',
                  aspect: 'square',
                  quality: 'auto',
                },
              }}
              miscStyles={{
                width: '6rem',
                paddingBottom: '6rem',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'inline-block',
              }}
            />
          </GridItem>
        )}
        {/* Author name and publish-date */}
        <GridItem>
          {authors.map(
            (author, key) =>
              (author.name ? (
                <CreditArticle
                  contentName={author.name}
                  miscStyles={authorMiscStyles}
                />
              ) : (
                <CreditArticle
                  key={author.contentId}
                  {...author}
                  miscStyles={authorMiscStyles}
                />
              ))
          )}
          <TimeStyled time={publishDateTime} format="DD.MM.YYYY HH:mm" />
        </GridItem>
        {/* Follow author */}
        {authors.length === 1 &&
          !authors[0].name && (
            <Fragment>
              <GridItem
                miscStyles={{
                  flexGrow: 0,
                  marginStart: 'auto',
                  display: [ { from: 'm', value: 'none', }, ],
                }}
              >
                <AlertsMobileButton author={authors[0]} />
              </GridItem>
              <GridItem
                miscStyles={{
                  flexGrow: 0,
                  display: [
                    { until: 'm', value: 'none', },
                    { from: 'l', value: 'none', },
                  ],
                }}
              >
                <AlertsDesktopButton author={authors[0]} />
              </GridItem>
            </Fragment>
          )}
      </Grid>
    </Wrapper>
  );
}

function ArticleByLineMobile(props) {
  return <ArticleByLineMobileComponent {...props} />;
}

export default ArticleByLineMobile;
