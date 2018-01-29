import React from 'react';
import { createComponent, } from 'react-fela';
import Grid from '../../Grid/Grid'; // eslint-disable-line import/no-named-as-default
import GridItem from '../../Grid/GridItem'; // eslint-disable-line import/no-named-as-default

const titleWrapperStyle = ({ theme, }) => ({
  ...theme.type(-2),
  fontWeight: '700',
  color: theme.color('neutral'),
  marginStart: '1rem',
});
const TitleWrapper = createComponent(titleWrapperStyle, GridItem, props =>
  Object.keys(props)
);

const exclusiveStyle = ({ theme, }) => ({
  color: theme.color('tertiary'),
  marginEnd: '1rem',
  ':after': {
    content: '"|"',
    marginStart: '1rem',
  },
});
const Exclusive = createComponent(exclusiveStyle, 'span');

// eslint-disable-next-line react/prop-types
function Article({ exclusive, title, imageUrl, sourceName, border, }) {
  return (
    <Grid gutter={0} miscStyles={{ flexWrap: false, padding: '1rem', }}>
      <GridItem
        width={12}
        rule={
          border && {
            color: [ 'neutral', '-4', ],
            width: 1,
            miscStyles: { marginStart: -1, },
            atStart: true,
          }
        }
      >
        <img // eslint-disable-line jsx-a11y/alt-text
          src={imageUrl}
          width="100%"
        />
      </GridItem>
      <TitleWrapper>
        {exclusive && <Exclusive>{exclusive}</Exclusive>}
        {title}
      </TitleWrapper>
    </Grid>
  );
}

export default Article;
