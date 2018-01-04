import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Link from '../Link/Link';

/** Components styles */
const mainWrapperStyle = ({ noMarginTop, }) => ({
  ...(noMarginTop ? [ { marginTop: '0', }, ] : []),
});

const MainWrapper = createComponent(mainWrapperStyle, 'div', props => Object.keys(props));

const inlineLinkStyle = ({ theme, }) => theme.articleStyle.paragraphLink;

const InlineLink = createComponent(inlineLinkStyle, Link, props => Object.keys(props));

const paragraphStyle = ({ theme, }) => {
  const { type, color, ...paragraphStyles } = theme.articleStyle.paragraphStyles || {};

  return {
    extend: [
      ...(
        theme.articleStyle.paragraphStyles
          ? [ {
            ...(paragraphStyles || []),
            ...(type ? theme.type(...type) : []),
            ...(color ? { color: theme.color(...color), } : []),
          }, ]
          : []
      ),
    ],
  };
};
const P = createComponent(paragraphStyle, 'p', props => Object.keys(props));

const strongStyle = () => ({
  fontWeight: '700',
});
const Strong = createComponent(strongStyle, 'strong', props => Object.keys(props));

const emphasisStyle = () => ({
  fontStyle: 'italic',
});
const Em = createComponent(emphasisStyle, 'em');

const underLineStyle = () => ({
  textDecoration: 'underline',
  textDecorationSkip: 'ink',
});
const UnderLine = createComponent(underLineStyle, 'span');

const spanStyle = ({ theme, }) => ({
  backgroundColor: theme.color('primary', '-3'),
});
const Mark = createComponent(spanStyle, 'mark', props => Object.keys(props));

/** Util functions */
const extractAttributes = attrArray => {
  const whiteList = [ 'class', 'href', 'target', 'id', 'name', ]; // List of all the acceptable attributes.
  const attributes = {};
  if (attrArray && attrArray.length > 0) {
    attrArray.map(attribute => {
      if (whiteList.includes(attribute.key)) {
        const key = attribute.key === 'class' ? 'hasClass' : attribute.key; // Switching 'class' to 'className'.
        attributes[key] = attribute.value;
      }
    });
  }
  return attributes;
};

const getTag = tag => {
  const tagsMap = new Map([
    [ 'p', P, ],
    [ 'a', InlineLink, ],
    [ 'strong', Strong, ],
    [ 'question', Strong, ],
    [ 'mark', Mark, ],
    [ 'u', UnderLine, ],
    [ 'em', Em, ],
    [ 'span', 'span', ],
    [ 'h4', 'h4', ],
  ]);
  return tagsMap.get(tag);
};

/**
 * This paragraph component receives an object with it's attributes and children
 * (which comes with their own children and so on), and it builds itself recursively.
 *
 * @param {Object} props
 */
export default class Paragraph extends React.Component {
  static callToParent = null;

  static setAsNoMargin(willThereBeMargin) {
    Paragraph.callToParent(willThereBeMargin);
  }

  componentWillMount() {
    Paragraph.callToParent = this.props.setNextComponentMarginTop;
  }

  render() {
    return (
      <MainWrapper noMarginTop={this.props.noMarginTop}>
        <Content content={this.props.content} />
      </MainWrapper>
    );
  }
}

/** Recursive functions */
function Content({ content, }) {
  const attributesObject = extractAttributes(content.attributes);

  return (
    <WrapperTag
      tag={content.tag}
      attributes={attributesObject}
      content={content.content}
    >
      {content.content.map((tag, index) => (
        <Content
          key={index}
          content={tag}
        />
      ))}
    </WrapperTag>
  );
}

function WrapperTag({ tag: tagName, content: tagElements, attributes, }) {
  /**
   * Check if the Tag has a class names 'bg-brand--d'.
   * If so, it means that the Tag is actually `<mark />` (That's how the FCKEditor translates it).
   */
  if (attributes.hasClass && attributes.hasClass === 'bg-brand--d') {
    tagName = 'mark';
  }
  /**
   * In case of an anchor inside the paragraph,
   * we don't need a new component but just a `<span />` with the anchors ID.
   */
  else if (attributes.id) {
    tagName = 'span';
  }
  const Tag = getTag(tagName);
  if (tagName === 'a') {
    /**
     * In case that the paragraph tree continues inside the Link component,
     * we send it this component (the `<Paragraph />`) recursive function as the content,
     * so the Link component will continue the building of the paragraph.
     */
    attributes.content = genChildren(tagElements);
  }
  /**
   * These type of paragraphs should ignore any MarginBottom received by the parents.
   */
  else if ([ 'question', 'h4', ].includes(tagName)) {
    Paragraph.setAsNoMargin(false);
  }

  return (
    <Tag {...attributes}>
      {genChildren(tagElements)}
    </Tag>
  );
}

function genChildren(tagElements) {
  return tagElements.map((tag, index) => (
    tag.content ?
      <Content key={index} content={tag} />
      : tag.attributes[0].value)
  );
}

/** Components props */
Paragraph.propTypes = {
  content: PropTypes.shape({
    /** The HTML tag name */
    tag: PropTypes.string.isRequired,
    /** The tag attributes (className, href, etc) */
    attributes: PropTypes.array.isRequired,
    /** The paragraphs content.<br/>
     * If the value of content contains children, they must have this exact prop structure
     * {tag, attributes, content}.
     */
    content: PropTypes.array,
  }).isRequired,
  /** This function should come from the body that holds this component.<br/>
   * If the paragraph should **NOT** have a gap between itself and the next component,
   * this function should return 'false'.
   */
  setNextComponentMarginTop: PropTypes.func.isRequired,
  /**
   * This prop determines if this paragraph should override the default 'margin-top'
   * set buy it's parent (set it to '0').
   */
  noMarginTop: PropTypes.bool,
};

Paragraph.defaultProps = {
  noMarginTop: false,
};

Content.propTypes = {
  content: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    attributes: PropTypes.array.isRequired,
    content: PropTypes.array,
  }).isRequired,
};

WrapperTag.propTypes = {
  tag: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired,
};
