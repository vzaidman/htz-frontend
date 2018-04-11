import React from 'react';
import { createComponent, } from 'react-fela';

import ArticleByLineMobile from './_ArticleByLineMobile';
import ArticleByLineDesktop from './_ArticleByLineDesktop';

const styleArticleHeaderMeta = ({ theme, }) => ({
  extend: [
    theme.mq({ until: 'm', }, { marginTop: '3rem', }),
    theme.mq({ from: 'm', until: 'l', }, { marginTop: '2rem', }),
    theme.mq(
      { from: 'l', },
      {
        position: 'absolute',
        top: 0,
        insetInlineStart: '-6rem',
        transform: 'logical translateX(-100%)',
        overflow: 'hidden',
      }
    ),
  ],
});

const ArticleHeaderMeta = createComponent(styleArticleHeaderMeta);

function ArticleHeaderMetaComponent(props) {
  return (
    <ArticleHeaderMeta>
      <ArticleByLineMobile
        {...props}
        miscStyles={{
          display: [ { from: 'l', value: 'none', }, ],
        }}
      />
      <ArticleByLineDesktop
        {...props}
        miscStyles={{
          textAlign: 'end',
          display: [ { until: 'l', value: 'none', }, ],
        }}
      />
    </ArticleHeaderMeta>
  );
}

export default ArticleHeaderMetaComponent;
