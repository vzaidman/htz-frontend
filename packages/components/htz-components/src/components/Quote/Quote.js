import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import Image from '../Image/Image';
import IconQuote from '../Icon/icons/IconQuote';
import FadeinViewport from './helper/FadeinViewport';

Quote.propTypes = {
  /** The Quote's Main content. */
  text: PropTypes.string.isRequired,
  /** The Quote's source (the quotee). */
  credit: PropTypes.string,
  /** List of images (usually of the cited person). */
  imagesList: PropTypes.arrayOf(PropTypes.object),
};

Quote.defaultProps = {
  credit: null,
  imagesList: null,
};

const imgOptions = {
  transforms: {
    width: '100',
    aspect: 'square',
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
 */
export default function Quote({ text, credit, imagesList, }) {
  const hasImage = imagesList && imagesList.length > 0;
  const hasCredit = credit && credit.trim().length > 0;

  const quoteType = hasImage ? 'image' : hasCredit ? 'quote' : 'border';

  return (
    <FadeinViewport threshold={1} mediaQuery={{ until: 'l', }}>
      <FelaTheme
        render={theme => (
          <FelaComponent
            render="blockquote"
            style={{
              fontWeight: '700',
              color: theme.color('primary', 'base'),
              '&:before': {
                content: quoteType === 'border' ? '""' : '',
                backgroundColor: theme.color('primary'),
                width: '16rem',
                height: '1.5rem',
                display: quoteType === 'border' ? 'inline-block' : 'none',
                marginBottom: '1.5rem',
              },
            }}
          >
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
              <IconQuote size={6} color="primary" />
            ) : null}
            <QuoteText>{text}</QuoteText>
            <Cite>{credit}</Cite>
          </FelaComponent>
        )}
      />
    </FadeinViewport>
  );
}

// /////////////////////////////////////////////////////////////////////
//                          Inner Components                          //
// /////////////////////////////////////////////////////////////////////

QuoteText.propTypes = { children: PropTypes.node.isRequired, };
function QuoteText({ children, }) {
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          theme.mq({ until: 'l', }, { ...theme.type(4, { lines: 7, }), }),
          theme.mq({ from: 'l', until: 'xl', }, { ...theme.type(1), }),
          theme.mq({ from: 'xl', }, { ...theme.type(2), }),
        ],
      })}
      render="p"
    >
      {children}
    </FelaComponent>
  );
}

Cite.propTypes = { children: PropTypes.node, };
Cite.defaultProps = { children: null, };
function Cite({ children, }) {
  return (
    children && (
      <FelaComponent
        style={theme => ({
          backgroundColor: theme.color('quaternary', 'base'),
          paddingBottom: '.5rem',
          paddingInlineEnd: '1rem',
          paddingInlineStart: '1rem',
          paddingTop: '.5rem',
          extend: [
            theme.mq({ until: 'l', }, { ...theme.type(-1), }),
            theme.mq({ from: 'l', until: 'xl', }, { ...theme.type(0), }),
            theme.mq({ from: 'xl', }, { ...theme.type(-1), }),
          ],
        })}
        render="span"
      >
        {children}
      </FelaComponent>
    )
  );
}
