/* global window */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { DomainUtils, } from '@haaretz/htz-user-utils';

const propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onload: PropTypes.func.isRequired,
};
const defaultProps = {
  images: [],
};

class ImageCookies extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps.images, this.props.images);
  }

  render() {
    if (this.props.images.length > 0) {
      const domain = DomainUtils.getSubdomain();
      return (
        <Fragment>
          {this.props.images.map((imageUrl, i) => {
            const src = `${imageUrl}&_ts=${Date.now()}`;
            const key = `login-cookie-${i}`;
            console.log(
              `imageCookies mapping | src:${src} | domain:${
                domain
              } | src.includes(domain):${src.includes(domain)}`
            );
            return (
              <img
                key={key}
                onLoad={
                  src.includes(domain)
                    ? () => {
                      this.props.onload();
                      console.log(
                        '%c Image runMeWhenYouOnload Event!! Image DOM onLoad done',
                        'background: #222; color: #bada55'
                      );
                    }
                    : null
                }
                src={src}
                alt=""
              />
            );
          })}
        </Fragment>
      );
    }
    return null;
  }
}

ImageCookies.propTypes = propTypes;
ImageCookies.defaultProps = defaultProps;

export default ImageCookies;
