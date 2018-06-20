import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, borderBottom, } from '@haaretz/htz-css-tools';
import List from './elements/list';
import Link from '../Link/Link';
import Media from '../Media/Media';
import IconBack from '../Icon/icons/IconBack';

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
};

const nextStyle = ({ theme, }) => ({
  ...theme.type(-2),
  color: theme.color('neutral'),
  fontWeight: '700',
  alignSelf: 'center',
  textAlign: 'center',
});
const Next = createComponent(nextStyle, Link, props => Object.keys(props));

function Osaka({ nextArticleUrl, sectionName, lists, }) {
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            backgroundColor: theme.color('neutral', '-10'),
            display: 'flex',
            flexWrap: 'nowrap',
            ...borderBottom('2px', 0, 'solid', theme.color('primary')),
          }}
        >
          <Media query={{ until: 'xl', }}>
            {matches => (
              <List
                articles={lists.local.slice(0, matches ? 1 : 2)}
                miscStyles={{
                  ...parseComponentProp(
                    'width',
                    [
                      { until: 'l', value: '50%', },
                      { from: 'l', until: 'xl', value: '33%', },
                      { from: 'xl', value: '50%', },
                    ],
                    theme.mq
                  ),
                }}
              />
            )}
          </Media>

          <Media
            query={{ from: 'l', }}
            render={() => (
              <List
                articles={lists.promoted}
                promoted
                miscStyles={{
                  backgroundColor: theme.color('neutral', '-6'),
                  ...parseComponentProp(
                    'width',
                    [
                      { from: 'l', until: 'xl', value: '33%', },
                      { from: 'xl', value: '25%', },
                    ],
                    theme.mq
                  ),
                }}
              />
            )}
          />

          <List
            articles={lists.outbrain}
            outbrain
            miscStyles={{
              backgroundColor: theme.color('neutral', '-6'),
              ...parseComponentProp(
                'width',
                [
                  { until: 'l', value: '50%', },
                  { from: 'l', until: 'xl', value: '33%', },
                  { from: 'xl', value: '25%', },
                ],
                theme.mq
              ),
            }}
          />

          <Media
            query={{ from: 'l', }}
            render={() => (
              <FelaComponent
                style={{
                  backgroundColor: theme.color('quaternary'),
                  display: 'flex',
                  flexShrink: '3',
                  paddingRight: '1rem',
                  paddingLeft: '1rem',
                }}
              >
                <Next
                  href={nextArticleUrl}
                  content={
                    <FelaComponent
                      style={{ display: 'flex', alignItems: 'center', }}
                      render="p"
                    >
                      <span>
                        {theme.osakaI18n.nextArticle} {sectionName}
                      </span>
                      <span>
                        <IconBack size={4} />
                      </span>
                    </FelaComponent>
                  }
                />
              </FelaComponent>
            )}
          />
        </FelaComponent>
      )}
    />
  );
}

Osaka.propTypes = propTypes;

export default Osaka;
