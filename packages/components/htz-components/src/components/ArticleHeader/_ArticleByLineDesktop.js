import React from 'react';
import { createComponent, withTheme, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, borderVertical, } from '@haaretz/htz-css-tools';
import ArticleCredit from '../Credit/CreditArticle';
import AlertsDesktopButton from '../AlertsButton/AlertsDesktopButton';
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

function ArticleByLineDesktopComponent({ author, publishDateTime, className, theme, }) {
  return (
    <div className={className}>
      <img
        style={{
          borderRadius: '50%',
          overflow: 'hidden',
          width: '11.666rem',
          backgroundColor: (author.image ? 'transparent' : theme.color('bg', '+1')),
        }}
        alt={author.name}
        src={author.image || 'https://images.haarets.co.il/image/fetch/w_70,h_70,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/https://www.haaretz.co.il/polopoly_fs/1.1479631.1316696805!/image/936552297.png' }
      />

      <ArticleCredit {...author} miscStyles={{ marginTop: '1rem', }} />

      <AlertsDesktopButton author={author} />

      {
        publishDateTime ?
          <TimeStyled
            time={publishDateTime}
            format="DD.MM.YYYY HH:mm"
          /> :
          ''
      }
    </div>

  );
}

const ArticleByLineDesktopThemed = withTheme(ArticleByLineDesktopComponent);

const ArticleByLineStyled = createComponent(styleArticleByLineDesktop, ArticleByLineDesktopThemed, props => Object.keys(props));

function ArticleByLineDesktop(props) {
  return (
    <ArticleByLineStyled {...props} />
  );
}
export default ArticleByLineDesktop;
