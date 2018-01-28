import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import IconQuote from '../Icon/icons/IconQuote'

const propTypes = {
  /**
   * The Quote's Main content.
   */
  text: PropTypes.string.isRequired,
  /**
   * The Quote's source (the quotee).
   */
  credit: PropTypes.string,
  /**
   * List of images (usually of the quotee).
   */
  imagesList: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

const defaultProps = {
  credit: null,
  imagesList: null,
};

const quoteWrapperStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  fontWeight: '700',
});
const QuoteWrapper = createComponent(quoteWrapperStyle, 'blockquote');

const quoteStyle = ({ theme, quoteType }) => ({
  ...(theme.type(2)),
  ':after': {
    content: "'\"'",
  },
  ...(getStyleObj(theme, quoteType)),
});
const QuoteElement = createComponent(quoteStyle, 'p');

const citeStyle = ({ theme, }) => ({
  ...(theme.type(-1)),
});
const Cite = createComponent(citeStyle, 'span');

const topBorderStyle = ({ theme, }) => ({
  borderTopWidth: '1rem',
  borderTopColor: theme.color('primary'),
  borderTopStyle: 'solid',
  width: '16.5rem',
  height: '1rem',
  display: 'inline-block',
  marginBottom: '1rem',
});
const TopBorder = createComponent(topBorderStyle, 'span');

const getStyleObj = (theme, quoteType) => {
  switch (quoteType) {
    case 'image' :
      return {
        ':before': {
          content: "'\"'",
        },
      };
    case 'border' :
      return {
        ':after': {
          content: "''",
        },
      };
    default :
      return {}
  }
};

/**
 * The quote component may result with three different decorations, depends on the props its given.
 *  * [Image](#imageQuote) - When `imagesList` contains an image properties, it will be rendered before the quote.
 *  - [Quote](#iconQuote) - When there isn't any valid image, but `credit` contains a string, a quote [`<Icon/>`](#Icon) will be rendered before the quote.
 *  * [Border-Top](#borderQuote) - Default. when both `imagesList` and `credit` are empty or contains invalid content, there will be a simple border on top of the quote.
 */
function Quote({ text, credit, imagesList, }) {
  const quoteType =
    (imagesList && imagesList.length > 0) ?
      'image' :
    (credit && credit.trim().length > 0) ?
      'quote' : 'border';

  return (
    <QuoteWrapper>
      {
        quoteType === 'image' ?
          <span>Image Here</span> :
        quoteType === 'quote' ?
          <IconQuote size={6.5} color='primary' miscStyles={{ marginBottom: '2rem', }}/> :
          <TopBorder />
      }
      <QuoteElement quoteType={quoteType}>
        {text}
      </QuoteElement>
      {
        credit &&
        <Cite>
          {credit}
        </Cite>
      }
    </QuoteWrapper>
  )
}

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default Quote;
