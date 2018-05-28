/* noOverWrite */

/* eslint-disable react/no-danger */
import React from 'react';
import { createComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';
import { attrsPropType, } from '../../../propTypes/attrsPropType';

const IconTmLoader = createComponent(iconStyle, UnstyledIconTmLoader, [
  'attrs',
  'onClick',
]);

IconTmLoader.propTypes = iconPropTypes;
IconTmLoader.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconTmLoader.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconTmLoader.defaultProps = {
  attrs: null,
};

function UnstyledIconTmLoader({ attrs, ...props }) {
  // TODO missing isomorphic ID solution is missing: https://github.com/reactjs/rfcs/pull/32
  const idPostfix = '';
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tm-loader-circle{
          -webkit-transform-origin:center center;
          transform-origin:center center;
          -webkit-animation:tm-loader-animation 1.5s infinite linear;
          animation:tm-loader-animation 1.5s infinite linear
        }
        @-webkit-keyframes tm-loader-animation{
          0%{
            -webkit-transform:rotate(0);
            transform:rotate(0)
          }
          100%{
            -webkit-transform:rotate(-360deg);
            transform:rotate(-360deg)
          }
        }
        @keyframes tm-loader-animation{
          0%{
            -webkit-transform:rotate(0);
            transform:rotate(0)
          }
          100%{
            -webkit-transform:rotate(-360deg);
            transform:rotate(-360deg)
          }
        }
      `,
        }}
      />
      <g className="tm-loader-circle">
        <linearGradient
          id={`tm-loader-gradiant${idPostfix}`}
          gradientUnits="userSpaceOnUse"
          x1="55.8"
          y1="32.1"
          x2="189"
          y2="208.9"
        >
          <stop offset="0.6" stopColor="currentColor" />
          <stop
            offset="0.9"
            style={{ stopColor: 'currentColor', stopOpacity: 0, }}
          />
        </linearGradient>
        <path
          fill={`url(#tm-loader-gradiant${idPostfix})`}
          d="M128 8C61.7 8 8 61.7 8 128c0 32.6 13.1 62.2 34.2 83.9l0 0c1.8 1.8 4.3 2.9 7.1 2.9 5.5 0 10-4.5 10-10 0-2.9-1.3-5.6-3.3-7.4C38.7 179.4 28 154.9 28 128 28 72.9 72.9 28 128 28c55.1 0 100 44.9 100 100 0 12.6-2.3 24.7-6.6 35.9l19.1 6.2c4.9-13.1 7.6-27.3 7.6-42.1C248 61.7 194.3 8 128 8z"
        />
      </g>
      <path
        fill="currentColor"
        d="M189 184h-26v-80l-28 80h-18l-28-80v80H63l0-108h45l18 59 18-59h45V184z"
      />
    </svg>
  );
}

export default IconTmLoader;
