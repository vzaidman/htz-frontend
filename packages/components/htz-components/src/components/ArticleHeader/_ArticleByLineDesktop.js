import React, { Fragment, } from 'react';
import { createComponent, withTheme, } from 'react-fela';
import {
  parseStyleProps,
  parseTypographyProp,
  borderVertical,
} from '@haaretz/htz-css-tools';
import ArticleCredit from '../Credit/CreditArticle';
import AlertsDesktopButton from '../AlertsButton/AlertsDesktopButton';
import Image from '../Image/Image';
import Time from '../Time/Time';

const styleArticleByLineDesktop = ({ theme, miscStyles, }) => ({
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
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq) : []),
  ],
});

const TimeStyled = createComponent(
  ({ theme, }) => ({
    display: 'block',
    marginTop: '0.5rem',
    extend: [
      parseTypographyProp(theme.articleStyle.header.bylineFontSize, theme.type),
    ],
  }),
  Time,
  [ 'time', 'format', ]
);

function ArticleByLineDesktopComponent({
  /* eslint-disable react/prop-types */
  authors,
  publishDateTime,
  className,
  theme,
  /* eslint-enable react/prop-types */
}) {
  return (
    <div className={className}>
      {authors.map((author, key) => (
        <Fragment key={author.contentId}>
          {key === 0 &&
            author.image && (
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
            )}
          {author.name ? (
            <ArticleCredit
              contentName={author.name}
              miscStyles={{ marginTop: '1rem', }}
            />
          ) : (
            <ArticleCredit {...author} miscStyles={{ marginTop: '1rem', }} />
          )}
          {authors.length === 1 &&
            !author.name && <AlertsDesktopButton author={author} />}
        </Fragment>
      ))}
      {publishDateTime ? (
        <TimeStyled time={publishDateTime} format="DD.MM.YYYY HH:mm" />
      ) : (
        ''
      )}
    </div>
  );
}

const ArticleByLineDesktopThemed = withTheme(ArticleByLineDesktopComponent);

const ArticleByLineStyled = createComponent(
  styleArticleByLineDesktop,
  ArticleByLineDesktopThemed,
  props => Object.keys(props)
);

function ArticleByLineDesktop(props) {
  return <ArticleByLineStyled {...props} />;
}
export default ArticleByLineDesktop;
