import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import Link from '../Link/Link';

const propTypes = {
  /**
   * An array of tags.
   */
  tagsList: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Tag's url.
       */
      url: PropTypes.string.isRequired,
      /**
       * Tag's name to be displayed.
       */
      contentName: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** passed as a a prop by fela's withTheme func before default export */
  theme: PropTypes.shape({
    tagsElementI18n: PropTypes.object.isRequired,
  }).isRequired,
};

const titleStyle = ({ theme, }) => ({
  color: theme.color('secondary'),
  marginEnd: '1rem',
});
const TagsTitle = createComponent(titleStyle, 'h4');

const contentStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-2'),
  textDecoration: 'underline',
});
const TagContent = createComponent(contentStyle, 'span');

const tagStyle = ({ theme, isLast, }) => ({
  display: 'inline',
  ...(!isLast && { marginEnd: '1rem', }),
});
const Tag = createComponent(tagStyle, 'li');

const tagsWrapperStyle = ({ theme, }) => ({
  ...theme.type(-1),
  display: 'flex',
});
const TagsWrapper = createComponent(tagsWrapperStyle);

/*
 * Returns an inline list of the article's related tags.
 */
function Tags({ tagsList, theme, }) {
  return (
    <TagsWrapper>
      <TagsTitle>{theme.tagsElementI18n.prefix}</TagsTitle>
      <ul>
        {tagsList.map((tag, i) => (
          <Tag key={tag.contentName} isLast={tagsList.length === i + 1}>
            <Link
              href={tag.url}
              content={<TagContent>{tag.contentName}</TagContent>}
            />
          </Tag>
        ))}
      </ul>
    </TagsWrapper>
  );
}

Tags.propTypes = propTypes;

export default withTheme(Tags);
