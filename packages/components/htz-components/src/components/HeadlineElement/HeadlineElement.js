import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import Embed from '../Embed/Embed';
// import ImageGallery from '../ImageGallery/ImageGallery';
import Video from '../Video/Video';

const proptypes = {
  /**
   * The media object as it passed down from papi.
   */
  elementObj: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const wrapperStyle = () => ({
  marginBottom: '4rem',
});
const Wrapper = createComponent(wrapperStyle, 'figure');

/**
 * HeadlineElement component receive the JSON of an
 * [Image](./#image), [Gallery](./#gallery), [Embed](./#embed) or [Video](./#video) (legacy)
 * that is set as main element (position 0), and displays it <u>always</u> with aspect `headline`
 * (except for Embeds).
 * @param elementObj
 * @returns {XML}
 * @constructor
 */
function HeadlineElement({ elementObj, }) {
  const uniqueId = elementObj.elementType || elementObj.inputTemplate || null;

  const Element = () => {
    switch (uniqueId) {
      case 'com.tm.Image':
        return (
          <ArticleImage
            {...elementObj}
            showCaption={false}
            forceAspect="headline"
            isHeadline
          />
        );
      case 'com.tm.ImageGalleryElement':
        // return <ImageGallery {...elementObj} forceAspect="headline" />;
        return () => <p>ImageGallery</p>;
      case 'com.tm.Video':
        return <Video {...elementObj} />;
      case 'embedElement':
        return <Embed {...elementObj} />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Element />
      <Caption
        caption={elementObj.caption || elementObj.title}
        credit={elementObj.credit}
        miscStyles={{
          paddingStart: '4rem',
        }}
      />
    </Wrapper>
  );
}

HeadlineElement.propTypes = proptypes;

export default HeadlineElement;
