/* global window */
import React from 'react';
import { FelaComponent, } from 'react-fela';
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
          this.props.images.map((imageUrl, i) => {
            const src = `${imageUrl}&_ts=${Date.now()}`;
            const key = `login-cookie-${i}`;
            return (
              <img
                key={key}
                onLoad={
                  src.includes(domain)
                    ? () => {
                        this.props.onload();
                        if (
                          typeof window !== 'undefined' &&
                          window.location.search.includes('debug')
                        ) {
                          console.log(
                            '%c Cookie Image DOM onload done',
                            'background: #232; color: #bada55'
                          );
                        }
                      }
                    : null
                }
                src={src}
                alt=""
              />
            );
          })
      );
    }
    return null;
  }
}

ImageCookies.propTypes = propTypes;
ImageCookies.defaultProps = defaultProps;

export default ImageCookies;
