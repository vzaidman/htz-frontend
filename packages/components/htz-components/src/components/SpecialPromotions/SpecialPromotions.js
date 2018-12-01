import React from 'react';
import PropTypes, { oneOf, } from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, parseComponentProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import IconTheMarker from '../Icon/icons/IconTheMarker';
import H from '../AutoLevels/H';
import Section from '../AutoLevels/Section';
import BlockLink from '../BlockLink/BlockLink';
import AboveBlockLink from '../BlockLink/AboveBlockLink';

const selectVariants = oneOf([ 'primary', 'primaryInverse', ]);

const SpecialPromotionsStyle = ({ theme, miscStyles, variant, }) => ({
  // backgroundColor: theme.color('specialPromotions', `${variant}Bg`),
  // backgroundColor: theme.color('quaternary'),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  extend: [
    // Trump all other styles with those defined in `miscStyles`
    parseComponentProp(undefined, variant, theme.mq, setVariant, theme.color),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const titleStyle = ({ theme, }) => ({
  paddingTop: '1rem',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  paddingBottom: '1rem',
  extend: [ theme.type(-1), ],
});

function setVariant(prop, variant, getColor) {
  return {
    backgroundColor: getColor('specialPromotions', `${variant}Bg`),
  };
}

const textStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignSelf: 'center',
  padding: '1rem',
  fontWeight: 'bold',
};
const IconStyle = {
  alignSelf: 'center',
  flexShrink: '0',
};
SpecialPromotions.propTypes = {
  contentName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  toolTip: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /** The `<SpecialPromotions />`'s stylistic variant */
  variant: PropTypes.oneOfType([
    selectVariants,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: selectVariants.isRequired,
      })
    ),
  ]),
};
SpecialPromotions.defaultProps = {
  linkText: '',
  miscStyles: null,
  variant: 'primary',
};

function SpecialPromotions({
  contentName,
  href,
  toolTip,
  linkText,
  miscStyles,
  variant,
}) {
  return (
    <BlockLink href={href}>
      <FelaComponent
        miscStyles={miscStyles}
        variant={variant}
        rule={SpecialPromotionsStyle}
        render={({ className, theme, }) => (
          <div className={className}>
            <FelaComponent
              rule={textStyle}
              render={({ className, }) => {
                const LogoName = variant === 'primary' ? IconAlefLogo : IconTheMarker;
                return (
                  <Section tagName="div" className={className}>
                    <LogoName
                      fill={theme.specialPromotionStyle[variant].icon}
                      size={3}
                      miscStyles={IconStyle}
                    />
                    <FelaComponent
                      rule={titleStyle}
                      render={({ className, }) => (
                        <H className={className}>{contentName}</H>
                      )}
                    />
                  </Section>
                );
              }}
            />
            <AboveBlockLink>
              {({ className, }) => (
                <div className={className} style={{ display: 'flex', }}>
                  <Button
                    variant={theme.specialPromotionStyle[variant].button}
                    href={href}
                  >
                    {linkText}
                  </Button>
                </div>
              )}
            </AboveBlockLink>
          </div>
        )}
      />
    </BlockLink>
  );
}

export default SpecialPromotions;
