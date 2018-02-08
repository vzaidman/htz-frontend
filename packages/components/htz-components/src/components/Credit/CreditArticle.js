import React from 'react';
import { createComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import Credit, { creditPropTypes, creditDefaultProps, } from './Credit';
import { stylesPropType, } from '../../propTypes/stylesPropType';


const CreditArticleStyled = createComponent(
  ({ miscStyles, theme, }) => ({
    color: theme.articleStyle.header.bylineCreditColor,
    fontWeight: 700,
    ...parseTypographyProp(theme.articleStyle.header.bylineFontSize, theme.type),
    extend: [
      ...parseStyleProps(
        {
          marginEnd: [ { until: 'l', value: '1rem', }, ],
        },
        theme.mq
      ),
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq) : []),
    ],
  }),
  Credit,
  [ 'name', 'url', ]
);

export default function CreditArticle({
  name,
  url,
  miscStyles,
}) {
  return <CreditArticleStyled name={name} url={url} miscStyles={miscStyles} />;
}

CreditArticle.propTypes = {
  ...creditPropTypes,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

CreditArticle.defaultProps = {
  ...creditDefaultProps,
  miscStyles: null,
}
