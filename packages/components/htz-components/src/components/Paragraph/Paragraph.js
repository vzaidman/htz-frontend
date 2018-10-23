import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import TextLink from '../TextLink/TextLink';
import H from '../AutoLevels/H';
import FirstImpressionPlaceholder from './FirstImpressionPlaceholder';
import Zen from '../Zen/Zen';

const Crosshead = props => (
  <FelaComponent
    style={theme => ({ extend: [ theme.type(2), ], })}
    render={({ className, }) => <H className={className} {...props} />}
  />
);

const paragraphStyle = theme => ({
  marginBottom: '3rem',
  extend: [
    theme.type(1, { untilBp: 'xl', lines: 5, }),
    theme.type(0, { fromBp: 'xl', lines: 5, }),
  ],
});

// eslint-disable-next-line react/prop-types
const P = ({ children, renderFirstImpression, ...props }) => (
  <FelaComponent
    style={paragraphStyle}
    render={({ className, }) => (
      <Fragment>
        <p className={className} {...props}>
          {children}
        </p>
        {renderFirstImpression ? (
          <Zen>
            <FirstImpressionPlaceholder />
          </Zen>
        ) : null}
      </Fragment>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Question = ({ children, ...props }) => (
  <FelaComponent
    style={theme => ({
      fontWeight: '700',
      extend: [
        theme.type(1, { untilBp: 'xl', lines: 5, }),
        theme.type(0, { fromBp: 'xl', lines: 5, }),
      ],
    })}
    render={({ className, }) => (
      <p className={className} {...props}>
        {children}
      </p>
    )}
  />
);
// eslint-disable-next-line react/prop-types
const Ul = ({ children, ...props }) => (
  <FelaComponent
    style={theme => ({
      marginBottom: '3rem',
      listStylePosition: 'inside',
      listStyleType: 'disc',
      paddingTop: '0',
      paddingBottom: '0',
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
      extend: [
        theme.type(1, { untilBp: 'xl', lines: 5, }),
        theme.type(0, { fromBp: 'xl', lines: 5, }),
      ],
    })}
    render={({ className, }) => (
      <ul className={className} {...props}>
        {children}
      </ul>
    )}
  />
);
// eslint-disable-next-line react/prop-types
const Ol = ({ children, ...props }) => (
  <FelaComponent
    style={theme => ({
      marginBottom: '3rem',
      listStylePosition: 'inside',
      listStyleType: 'decimal-leading-zero',
      paddingTop: '0',
      paddingBottom: '0',
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
      extend: [
        theme.type(1, { untilBp: 'xl', lines: 5, }),
        theme.type(0, { fromBp: 'xl', lines: 5, }),
      ],
    })}
    render={({ className, }) => (
      <ul className={className} {...props}>
        {children}
      </ul>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Strong = ({ children, ...props }) => (
  <FelaComponent
    style={{
      fontWeight: '700',
    }}
    render={({ className, }) => (
      <strong className={className} {...props}>
        {children}
      </strong>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Em = ({ children, ...props }) => (
  <FelaComponent
    style={{
      fontStyle: 'italic',
    }}
    render={({ className, }) => (
      <em className={className} {...props}>
        {children}
      </em>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const UnderLine = ({ children, ...props }) => (
  <FelaComponent
    style={{
      textDecoration: 'underline',
      textDecorationSkip: 'ink',
    }}
    render={({ className, }) => (
      <span className={className} {...props}>
        {children}
      </span>
    )}
  />
);

// eslint-disable-next-line react/prop-types
const Mark = ({ children, ...props }) => (
  <FelaComponent
    style={theme => ({
      backgroundColor: theme.color('primary', '-4'),
    })}
    render={({ className, }) => (
      <mark className={className} {...props}>
        {children}
      </mark>
    )}
  />
);

/* Util functions */
const extractAttributes = attrArray => {
  const whiteList = [ 'class', 'href', 'target', 'id', 'name', ]; // List of all the acceptable attributes.
  const attributes = {};
  if (attrArray && attrArray.length > 0) {
    // eslint-disable-line array-callback-return
    attrArray.forEach(attribute => {
      if (whiteList.includes(attribute.key)) {
        const key = attribute.key === 'class' ? 'hasClass' : attribute.key; // Switching 'class' to 'className'.
        attributes[key] = attribute.value;
      }
    });
  }
  return attributes;
};

/**
 * These type of paragraphs should ignore any MarginBottom received by the parents.
 */
const whoShouldNotMargin = [ 'question', 'h3', ];

const shouldMargin = content => {
  if (whoShouldNotMargin.includes(content.tag)) {
    return false;
  }
  else if (content.content) {
    for (const element of content.content) {
      if (!shouldMargin(element)) {
        return false;
      }
    }
  }
  return true;
};
// new tags: li ol ul
const getTag = tag => {
  const tagsMap = new Map([
    [ 'p', P, ],
    [ 'a', TextLink, ],
    [ 'strong', Strong, ],
    [ 'question', Question, ],
    [ 'mark', Mark, ],
    [ 'u', UnderLine, ],
    [ 'ul', Ul, ],
    [ 'ol', Ol, ],
    [ 'li', 'li', ],
    [ 'u', UnderLine, ],
    [ 'em', Em, ],
    [ 'span', 'span', ],
    [ 'stk', 'span', ],
    [ 'h3', Crosshead, ],
    [ 'br', () => <br />, ],
  ]);
  return tagsMap.get(tag);
};

/**
 * This paragraph component receives an object with it's attributes and children
 * (which comes with their own children and so on), and it builds itself recursively.
 *
 * @param {Object} props
 */
export default function Paragraph({ renderFirstImpression, ...props }) {
  /* Recursive functions */
  const Content = ({ content, }) => {
    const attributesObject = extractAttributes(content.attributes);
    return (
      <WrapperTag
        tag={content.tag}
        attributes={attributesObject}
        content={content.content}
      >
        {content.content.map((tag, index) => (
          <Content
            key={index} // eslint-disable-line react/no-array-index-key
            content={tag}
          />
        ))}
      </WrapperTag>
    );
  };

  const genChildren = tagElements =>
    tagElements.map(
      (tag, index) =>
        (tag.tag === 'br' ? (
          <br />
        ) : tag.content ? (
          <Content key={index} content={tag} /> // eslint-disable-line react/no-array-index-key
        ) : (
          tag.attributes[0].value
        ))
    );

  const WrapperTag = ({ tag: tagName, content: tagElements, attributes, }) => {
    /**
     * Check if the Tag has a class names 'bg-brand--d'.
     * If so, it means that the Tag is actually `<mark />` (That's how the FCKEditor translates it).
     */
    if (attributes.hasClass && attributes.hasClass === 'bg-brand--d') {
      tagName = 'mark'; // eslint-disable-line no-param-reassign
    }
    else if (attributes.id) {
      /**
       * In case of an anchor inside the paragraph,
       * we don't need a new component but just a `<span />` with the anchors ID.
       */
      tagName = 'span'; // eslint-disable-line no-param-reassign
    }
    const Tag = getTag(tagName);
    if (tagName === 'a') {
      /**
       * In case that the paragraph tree continues inside the Link component,
       * we send it this component (the `<Paragraph />`) recursive function as the content,
       * so the Link component will continue the building of the paragraph.
       */
      attributes.content = genChildren(tagElements); // eslint-disable-line no-param-reassign
    }
    if (tagName === 'br') return Tag;
    return Tag ? (
      <Tag
        {...attributes}
        {...(tagName === 'p' ? { renderFirstImpression, } : {})}
      >
        {genChildren(tagElements)}
      </Tag>
    ) : null;
  };
  return <Content content={props} />;
}

/** Components props */
Paragraph.propTypes = {
  /** The HTML tag name */
  // eslint-disable-next-line react/no-unused-prop-types
  tag: PropTypes.string.isRequired,
  /** The tag attributes (className, href, etc) */
  // eslint-disable-next-line react/forbid-prop-types
  attributes: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
  /** The paragraphs content.<br/>
   * If the value of content contains children, they must have this exact prop structure
   * {tag, attributes, content}.
   */
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
  /** Should the Paragraph render a firstImpression placeholder after every p tag */
  renderFirstImpression: PropTypes.bool,
};

Paragraph.defaultProps = {
  renderFirstImpression: false,
};
