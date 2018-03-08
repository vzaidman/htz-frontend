import React from 'react';
import { createComponent, withTheme, } from 'react-fela';
import {
  parseStyleProps,
  parseTypographyProp,
  borderVertical,
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

const styleArticleByLineMobile = ({ theme, miscStyles, }) => ({
  extend: [
    theme.mq(
      { until: 'm', },
      {
        ...borderVertical({
          width: '1px',
          lines: 1,
          style: 'solid',
          color: theme.color('neutral', '-6'),
        }),
      }
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const TimeStyled = createComponent(
  ({ theme, }) => ({
    marginEnd: '1rem',
    extend: [
      parseTypographyProp(theme.articleStyle.header.bylineFontSize, theme.type),
    ],
  }),
  Time,
  [ 'time', 'format', ]
);

// eslint-disable-next-line react/prop-types
function ArticleByLineMobileComponent({ author, publishDateTime, className, }) {
  return (
    <Grid className={className} gutter={1} vAlign="center">
      {/*  Author image */}
      <GridItem
        width={6}
        miscStyles={{
          display: [ { from: 'm', value: 'none', }, ],
        }}
      >
        <Image
          data={author.image}
          imgOptions={{
            transforms: {
              width: '100',
              aspect: 'square',
              quality: 'auto',
            },
          }}
          miscStyles={{
            width: '10rem',
            paddingBottom: '10rem',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'inline-block',
          }}
        />
      </GridItem>
      {/* Author name and publish-date */}
      <GridItem
        miscStyles={{
          display: 'flex',
          flexGrow: 0,
          flexDirection: [ { until: 'm', value: 'column', }, ],
        }}
      >
        <CreditArticle
          {...author}
          miscStyles={{
            marginEnd: '1rem',
          }}
        />
        <TimeStyled time={publishDateTime} format="DD.MM.YYYY HH:mm" />
      </GridItem>
      {/* Follow author */}
      <GridItem
        miscStyles={{
          flexGrow: 0,
          marginStart: 'auto',
          display: [ { from: 'm', value: 'none', }, ],
        }}
      >
        <AlertsMobileButton author={author} />
      </GridItem>
      <GridItem
        miscStyles={{
          flexGrow: 0,
          display: [ { until: 'm', value: 'none', }, ],
        }}
      >
        <AlertsDesktopButton author={author} />
      </GridItem>
    </Grid>
  );
}

const ArticleByLineMobileThemed = withTheme(ArticleByLineMobileComponent);
const ArticleByLineMobileStyled = createComponent(
  styleArticleByLineMobile,
  ArticleByLineMobileThemed,
  props => [ ...Object.keys(props), 'theme', ]
);

function ArticleByLineMobile(props) {
  return <ArticleByLineMobileStyled {...props} />;
}

export default ArticleByLineMobile;
