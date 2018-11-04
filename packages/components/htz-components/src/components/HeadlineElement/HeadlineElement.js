import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import ArticleImage from '../ArticleBodyImage/ArticleBodyImage';
import Caption from '../Caption/Caption';
import Embed from '../Embed/Embed';
// import ImageGallery from '../ImageGallery/ImageGallery';
import Video from '../Video/Video';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
  /**
   * Override the caption misc styles.
   */
  captionMiscStyles: PropTypes.shape({}),
  /**
   * The media object as it passed down from papi.
   */
  elementObj: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  miscStyles: null,
  captionMiscStyles: {},
};

/**
 * HeadlineElement component receive the JSON of an
 * [Image](./#image), [Gallery](./#gallery), [Embed](./#embed) or [Video](./#video) (legacy)
 * that is set as main element (position 0), and displays it <u>always</u> with aspect `headline`
 * (except for Embeds).
 * @param elementObj
 * @returns {XML}
 * @constructor
 */
function HeadlineElement({ captionMiscStyles, elementObj, miscStyles, }) {
  const uniqueId = elementObj.elementType || elementObj.inputTemplate || null;

  const Element = () => {
    switch (uniqueId) {
      case 'com.tm.Image':
      case 'com.tm.BlogImage':
        return (
          <ArticleImage {...elementObj} showCaption={false} forceAspect="headline" isHeadline />
        );
      case 'com.tm.ImageGalleryElement':
        // return <ImageGallery {...elementObj} forceAspect="headline" />;
        return () => <p>ImageGallery</p>;
      case 'com.tm.Video':
        return <Video {...elementObj} />;
      case 'embedElement':
        return <Embed showCaption={false} {...elementObj} />;
      default:
        return null;
    }
  };

  // if the Element is an image. credit prefix should set to 'צילום', issue: #1011
  const creditPrefix = elementObj.inputTemplate === 'com.tm.Image' ? 'צילום' : null;

  return (
    <FelaComponent
      style={theme => ({
        extend: [
          // Trump all other styles with those defined in `miscStyles`
          ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
        ],
      })}
    >
      <Element />
      <Caption
        caption={elementObj.caption || elementObj.title}
        credit={elementObj.credit}
        {...(creditPrefix ? { creditprefix: creditPrefix, } : {})}
        backgroundColor={[ { until: 's', value: 'neutral', }, ]}
        color={[ { until: 's', value: 'white', }, ]}
        miscStyles={{
          paddingStart: '2rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          ...captionMiscStyles,
        }}
      />
    </FelaComponent>
  );
}

HeadlineElement.propTypes = propTypes;

HeadlineElement.defaultProps = defaultProps;

export default HeadlineElement;
