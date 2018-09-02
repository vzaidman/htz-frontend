import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import Credit, { creditPropTypes, creditDefaultProps, } from './Credit';
import { stylesPropType, } from '../../propTypes/stylesPropType';

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
};

const style = ({ miscStyles, theme, }) => ({
  color: theme.color('credit', 'creditArticleText'),
  fontWeight: 'bold',
  extend: [
    parseTypographyProp(theme.articleStyle.header.bylineFontSize, theme.type),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq) : []),
  ],
});

export default function CreditArticle({ contentName, url, miscStyles, onClick, }) {
  return (
    <FelaComponent
      miscStyles={miscStyles}
      rule={style}
      render={({ className, }) => (
        <Credit className={className} contentName={contentName} url={url} onClick={onClick} />
      )}
    />
  );
}
