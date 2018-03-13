import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import List from './elements/list';
import Link from '../Link/Link';
import StyledGrid from '../Grid/Grid';
import StyledGridItem from '../Grid/GridItem';

const singleArticlePropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    url: PropTypes.string.isRequired,
    sourceName: PropTypes.string,
  })
);

const propTypes = {
  /**
   * The path for the next article in the list.
   */
  nextArticleUrl: PropTypes.string.isRequired,
  /**
   * The name of the current article's section.
   */
  sectionName: PropTypes.string.isRequired,
  /**
   * An object of Arrays, which each contains article objects:<br/>
   * `{exclusive: 'string', title: 'string', imageUrl: 'string', url: 'string'}`.
   */
  lists: PropTypes.shape({
    local: singleArticlePropTypes,
    promoted: singleArticlePropTypes,
    outbrain: singleArticlePropTypes,
  }).isRequired,
  /**
   * The current break point (`'s'`, `'m'`, `'l'` or `'xl'`).
   */
  bp: PropTypes.string.isRequired,
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const wrapperStyle = ({ theme, }) => ({
  ...borderBottom('2px', 0, 'solid', theme.color('primary')),
  marginStart: '0.5rem',
});
const OsakaWrapper = createComponent(wrapperStyle, StyledGrid);

const listWrapperStyle = ({ theme, }) => ({
  paddingTop: '1rem',
  paddingBottom: '1rem',
});
const ListWrapper = createComponent(listWrapperStyle, StyledGridItem, props =>
  Object.keys(props)
);

const nextWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('quaternary'),
  display: 'flex',
});
const NextWrapper = createComponent(nextWrapperStyle, StyledGridItem, props =>
  Object.keys(props)
);

const nextStyle = ({ theme, }) => ({
  ...theme.type(-2),
  color: theme.color('neutral'),
  fontWeight: '700',
  alignSelf: 'center',
  textAlign: 'center',
});
const Next = createComponent(nextStyle, Link, props => Object.keys(props));

const getWidth = bp => {
  switch (bp) {
    case 's':
      return {};
    case 'm':
      return {
        local: 1 / 2,
        outbrain: 1,
      };
    case 'l':
      return {
        local: 1 / 3,
        promoted: 1 / 2,
        outbrain: 1 / 2,
      };
    default:
      return {
        local: 2 / 4,
        promoted: 1 / 2,
        outbrain: 1 / 2,
      };
  }
};

function Osaka({ nextArticleUrl, sectionName, lists, bp, theme, }) {
  const itemsWidth = getWidth(bp);
  const numOfLocalArticles = bp === 'xl' ? 2 : 1;
  return (
    <OsakaWrapper gutter={0} miscStyles={{ flexWrap: false, }}>
      <StyledGridItem>
        <StyledGrid gutter={0}>
          <ListWrapper
            width={itemsWidth.local}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
            }}
          >
            <List articles={lists.local.slice(0, numOfLocalArticles)} />
          </ListWrapper>
          <ListWrapper
            width={1 - itemsWidth.local}
            miscStyles={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
              backgroundColor: theme.color('neutral', '-6'),
            }}
          >
            <StyledGrid>
              {bp !== 'm' && (
                <StyledGridItem width={itemsWidth.promoted} rule>
                  <List articles={lists.promoted} promoted />
                </StyledGridItem>
              )}
              <StyledGridItem width={itemsWidth.outbrain}>
                <List articles={lists.outbrain} border outbrain />
              </StyledGridItem>
            </StyledGrid>
          </ListWrapper>
        </StyledGrid>
      </StyledGridItem>
      {bp !== 'm' && (
        <NextWrapper
          width={18}
          miscStyles={{
            paddingRight: '1rem',
            paddingLeft: '1rem',
          }}
        >
          <Next
            href={nextArticleUrl}
            content={
              <p>
                {theme.osakaI18n.nextArticle} {sectionName}
              </p>
            }
          />
        </NextWrapper>
      )}
    </OsakaWrapper>
  );
}

Osaka.propTypes = propTypes;

export default withTheme(Osaka);
