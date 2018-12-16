import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import Caption from '../../../Caption/Caption';
import Picture from '../../../Image/Picture';
// import FullScreenMedia from '../../../FullScreenMedia/FullScreenMedia';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import getMediaComponent from '../../../../utils/getMediaComponent';

const propTypes = {
  isVariationB: PropTypes.bool,
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
  isVariationB: false,
  miscStyles: null,
};

const getSourceOptions = ({ isVariationB, isSquare, }) => {
  const aspect = isSquare || isVariationB ? 'square' : 'landscape';
  return {
    sizes: isVariationB
      ? '(min-width:1024px) 60vw, 100vw'
      : '(min-width:1280px) 910px, (min-width:1024px) 912px, (min-width:768px) 768px,(min-width:600px) 600px, 100vw',
    transforms: [
      {
        width: '375',
        aspect,
        quality: 'auto',
      },
      {
        width: '425',
        aspect,
        quality: 'auto',
      },
      {
        width: '600',
        aspect,
        quality: 'auto',
      },
      {
        width: '768',
        aspect,
        quality: 'auto',
      },
      {
        width: '1028',
        aspect,
        quality: 'auto',
      },
      {
        width: '1280',
        aspect,
        quality: 'auto',
      },
      {
        width: '1920',
        aspect,
        quality: 'auto',
      },
    ],
  };
};

const ImageElement = props => <Picture {...props} />;

function MagazineHeadlineElement({ elementObj, isVariationB, miscStyles, }) {
  const Element = getMediaComponent(elementObj.kind, ImageElement);
  const isImage = elementObj.kind === 'image';

  // if the Element is an image. credit prefix should set to 'צילום', issue: #1011
  const creditPrefix = elementObj.inputTemplate === 'com.tm.Image' ? 'צילום' : null;

  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            extend: [
              // Trump all other styles with those defined in `miscStyles`
              ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
            ],
          }}
        >
          <Element
            {...elementObj}
            {...(isImage
              ? {
                defaultImg: {
                  sourceOptions: getSourceOptions({ isVariationB, isSquare: true, }),
                  data: elementObj,
                },
                sources: [
                  {
                    until: 's',
                    sourceOptions: getSourceOptions({ isVariationB, isSquare: true, }),
                    data: elementObj,
                  },
                  {
                    from: 's',
                    sourceOptions: getSourceOptions({ isVariationB, isSquare: false, }),
                    data: elementObj,
                  },
                ],
              }
              : {
                showCaption: false,
              })}
          />
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

              position: [ { from: 'l', value: 'absolute', }, ],
              insetInlineEnd: [ { from: 'l', value: '0', }, ],
              textAlign: [ { from: 'l', value: 'end', }, { until: 'l', value: 'start', }, ],
              marginInlineStart: [ { from: 'l', value: 'auto', }, ],
              maxWidth: [ { from: 'l', value: '29rem', }, ],
              paddingInlineEnd: [ { from: 'l', value: '3rem', }, { until: 'l', value: '2rem', }, ],
              paddingInlineStart: [ { until: 'l', value: '2rem', }, ],
              marginTop: [ { from: 'l', value: '1rem', }, ],
              type: [ { value: -3, fromBp: 'xl', }, ],
              backgroundColor: [ { until: 's', value: 'white', }, ],
              color: [ { until: 's', value: theme.color('bodyText'), }, ],
            }}
          />
        </FelaComponent>
      )}
    />
  );
}

MagazineHeadlineElement.propTypes = propTypes;

MagazineHeadlineElement.defaultProps = defaultProps;

export default MagazineHeadlineElement;
