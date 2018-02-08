import React, { Fragment, } from 'react';
import { createComponent, } from 'react-fela';

import ArticleByLineMobile from './_ArticleByLineMobile';
import ArticleByLineDesktop from './_ArticleByLineDesktop';

const styleArticleHeaderMeta = ({ theme, }) => {
  return {
    extend: [
      theme.mq(
        { until: 'm', },
        { marginTop: '3rem', },
      ),
      theme.mq(
        { from: 'm', until: 'l', },
        { marginTop: '2rem', },
      ),
      theme.mq(
        { from: 'l', },
        {
          position: 'absolute',
          top: 0,
          insetInlineStart: '-6rem',
          transform: 'logical translateX(-100%)',
          overflow: 'hidden',
        },
      ),
    ],
  };
};

function ArticleHeaderMetaComponent(props) {
  return (
    <Fragment>
      <ArticleByLineMobile
        {...props}
        miscStyles={{
          display: [
            { from: 'l', value: 'none', },
          ],
        }}
      />
      <ArticleByLineDesktop
        {...props}
        miscStyles={{
          textAlign: 'end',
          display: [
            { until: 'l', value: 'none', },
          ],
        }}
      />
    </Fragment>
  );
}

const ArticleHeaderMetaStyled = createComponent(styleArticleHeaderMeta, ArticleHeaderMetaComponent, props => Object.keys(props));

export default ArticleHeaderMetaStyled;
