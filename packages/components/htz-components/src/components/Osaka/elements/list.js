import React from 'react';
import { createComponent, withTheme, } from 'react-fela';
import Article from './article';
import Link from '../../Link/Link';
import Grid from '../../Grid/Grid'; // eslint-disable-line import/no-named-as-default
import GridItem from '../../Grid/GridItem'; // eslint-disable-line import/no-named-as-default

const promotedStyle = ({ theme, }) => ({
  ...theme.type(-3),
  color: theme.color('neutral', '-3'),
  marginStart: '1rem',
});
const Promoted = createComponent(promotedStyle, 'p');

// eslint-disable-next-line react/prop-types
function List({ articles, promoted, theme, }) {
  return (
    <Grid gutter={0}>
      {articles.map((article, i) => (
        <GridItem key={article.title} width={1 / articles.length}>
          <Link href={article.url} content={<Article {...article} />} />
        </GridItem>
      ))}
      {promoted && <Promoted>{theme.osakaI18n.promotedContent}</Promoted>}
    </Grid>
  );
}

export default withTheme(List);
