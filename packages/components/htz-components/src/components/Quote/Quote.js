import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Image from '../Image/Image';
import IconQuote from '../Icon/icons/IconQuote';

Quote.propTypes = {
  /** The Quote's Main content. */
  text: PropTypes.string.isRequired,
  /** The Quote's source (the quotee). */
  credit: PropTypes.string,
  /** List of images (usually of the quotee). */
  imagesList: PropTypes.arrayOf(PropTypes.object),
};

Quote.defaultProps = {
  credit: null,
  imagesList: null,
};

const quoteWrapperStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  fontWeight: '700',
});

const QuoteWrapper = createComponent(quoteWrapperStyle, 'blockquote');

const quoteStyle = ({ theme, quoteType, }) => ({
  ':after': {
    content: "'\"'",
  },
  ...theme.mq({ until: 'm', }, { ...theme.type(1), }),
  ...theme.mq({ from: 'm', until: 'xl', }, { ...theme.type(0), }),
  ...theme.mq({ from: 'xl', }, { ...theme.type(2), }),
  ...getStyleObj(quoteType),
});
const QuoteElement = createComponent(quoteStyle, 'p');

const citeStyle = ({ theme, }) => ({
  ...theme.mq({ until: 'm', }, { ...theme.type(-1), }),
  ...theme.mq({ from: 'm', until: 'xl', }, { ...theme.type(-2), }),
  ...theme.mq({ from: 'xl', }, { ...theme.type(-1), }),
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

function getStyleObj(quoteType) {
  switch (quoteType) {
    case 'image':
      return {
        ':before': {
          content: "'\"'",
        },
      };
    case 'border':
      return {
        ':after': {
          content: "''",
        },
      };
    default:
      return {};
  }
}

const imgOptions = {
  transforms: {
    width: '100',
    aspect: 'square',
    quality: 'auto',
  },
};

/*
 * The quote component may result with three different decorations,
 * depends on the props its given.
 *  * [Image](#imageQuote)
 *    When `imagesList` contains an image properties, it will be rendered before the quote.
 *  * [Quote](#iconQuote)
 *    When there isn't any valid image, but `credit` contains a string,
 *    a quote [`<Icon/>`](#Icon) will be rendered before the quote.
 *  * [Border-Top](#borderQuote)
 *    Default. when both `imagesList` and `credit` are empty or contains invalid content,
 *    there will be a simple border on top of the quote.
 *
 */
function Quote({ text, credit, imagesList, }) {
  const quoteType =
    imagesList && imagesList.length > 0
      ? 'image'
      : credit && credit.trim().length > 0 ? 'quote' : 'border';

  return (
    <QuoteWrapper>
      {quoteType === 'image' ? (
        <Image
          imgOptions={imgOptions}
          data={imagesList[0]}
          miscStyles={{
            width: '10rem',
            paddingBottom: '10rem',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'inline-block',
          }}
        />
      ) : quoteType === 'quote' ? (
        <IconQuote size={6.5} color="primary" miscStyles={{ marginBottom: '2rem', }} />
      ) : (
        <TopBorder />
      )}
      <QuoteElement quoteType={quoteType}>{text}</QuoteElement>
      {credit && <Cite>{credit}</Cite>}
    </QuoteWrapper>
  );
}

export default Quote;
