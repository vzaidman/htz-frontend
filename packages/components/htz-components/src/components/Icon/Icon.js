/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `exampleTamplate.js` file is this directory.
 * *************************************************************** */
/* eslint-disable react/prop-types */
import React from 'react';
import { createComponent, } from 'react-fela';

import IconAlef from './icons/IconAlef';
import IconAlefLogo from './icons/IconAlefLogo';
import IconAvatar from './icons/IconAvatar';
import IconAlert from './icons/IconAlert';
import IconBack from './icons/IconBack';
import IconClose from './icons/IconClose';
import IconCamera from './icons/IconCamera';
import IconComment from './icons/IconComment';
import IconFacebookLogo from './icons/IconFacebookLogo';
import IconDislike from './icons/IconDislike';
import IconFacebook from './icons/IconFacebook';
import IconHalfStar from './icons/IconHalfStar';
import IconGPlus from './icons/IconGPlus';
import IconLike from './icons/IconLike';
import IconMailAlert from './icons/IconMailAlert';
import IconMail from './icons/IconMail';
import IconPlus from './icons/IconPlus';
import IconPrint from './icons/IconPrint';
import IconReading from './icons/IconReading';
import IconMenu from './icons/IconMenu';
import IconRss from './icons/IconRss';
import IconSearch from './icons/IconSearch';
import IconStar from './icons/IconStar';
import IconSettings from './icons/IconSettings';
import IconTheMarker from './icons/IconTheMarker';
import IconTwitter from './icons/IconTwitter';
import IconZen from './icons/IconZen';
import IconWhatsapp from './icons/IconWhatsapp';
import IconZoomOut from './icons/IconZoomOut';
import IconZoomIn from './icons/IconZoomIn';
import IconAccessibility from './icons/IconAccessibility';
import IconBold from './icons/IconBold';
import IconQuote from './icons/IconQuote';
import IconArrow from './icons/IconArrow';
import IconReply from './icons/IconReply';
import IconItalic from './icons/IconItalic';
import IconAndroid from './icons/IconAndroid';
import IconApple from './icons/IconApple';
import IconHtzLoader from './icons/IconHtzLoader';
import IconTmLoader from './icons/IconTmLoader';
import IconHaaretzLogo from './icons/IconHaaretzLogo';
import IconBundle from './icons/IconBundle';
import IconTablet from './icons/IconTablet';
import IconCredit from './icons/IconCredit';
import IconHaaretzFullLogo from './icons/IconHaaretzFullLogo';
import IconLock from './icons/IconLock';
import IconSafePayment from './icons/IconSafePayment';
import IconMarkerLogo from './icons/IconMarkerLogo';
import IconPaypal from './icons/IconPaypal';
import IconMarkerLogoTransparent from './icons/IconMarkerLogoTransparent';
import IconAlefLogoTransparent from './icons/IconAlefLogoTransparent';
import IconCheck from './icons/IconCheck';
import IconInfo from './icons/IconInfo';
import IconMessenger from './icons/IconMessenger';
import IconSave from './icons/IconSave';

const gutterWidth = '1rem';

const wrapperStyle = ({ theme, ...props }) => ({
  marginRight: `-${gutterWidth}`,
  marginLeft: `-${gutterWidth}`,
  display: 'flex',
  flexWrap: 'wrap',
});

const cellStyle = ({ theme, ...props }) => ({
  backgroundColor: theme.color('bg', 'base'),
  border: `${gutterWidth} solid #fff`,
  padding: '2rem 2rem 1rem',
  textAlign: 'center',
});

const iconWrapperStyle = ({ theme, ...props }) => ({
  backgroundColor: '#fff',
  padding: '2rem',
});

const iconNameStyle = ({ theme, ...props }) => ({
  fontFamily: 'monospace',
  marginTop: '1rem',
  extend: [ theme.type(-2), ],
});

// const UnstyledWrapper = ({ children, }) => <div>{children}</div>;

const UnstyledCell = ({ children, className, name, }) => (
  <div className={className}>
    <IconWrapper>{children}</IconWrapper>
    <IconName>{name}</IconName>
  </div>
);

const IconWrapper = createComponent(iconWrapperStyle, 'div');
const IconName = createComponent(iconNameStyle, 'p');
const Cell = createComponent(cellStyle, UnstyledCell, [ 'name', ]);

const Wrapper = createComponent(wrapperStyle, 'div');

// export default props => <IconAlef {...props} />;

export default class Icons extends React.Component {
  state = {
    size: 4,
  };

  handleSizeChange = event => {
    this.setState({ size: parseInt(event.target.value, 10), });
  };

  render() {
    return (
      <div>
        <p style={{ marginBottom: '2rem', }}>
          <strong>Edit icons size:</strong>{' '}
          <input
            style={{
              MozAppearance: 'slider-horizontal',
              WebkitAppearance: 'slider-horizontal',
              appearance: 'slider-horizontal',
              verticalAlign: 'middle',
            }}
            type="range"
            min={1}
            max={14}
            name="iconSize"
            value={this.state.size}
            onChange={this.handleSizeChange}
          />{' '}
          <span style={{ fontFamily: 'monospace', }}>
            ({this.state.size}rem)
          </span>
        </p>
        <Wrapper>
          <Cell name="IconAlef">{<IconAlef size={this.state.size} />}</Cell>
          <Cell name="IconAlefLogo">
            {<IconAlefLogo size={this.state.size} />}
          </Cell>
          <Cell name="IconAvatar">{<IconAvatar size={this.state.size} />}</Cell>
          <Cell name="IconAlert">{<IconAlert size={this.state.size} />}</Cell>
          <Cell name="IconBack">{<IconBack size={this.state.size} />}</Cell>
          <Cell name="IconClose">{<IconClose size={this.state.size} />}</Cell>
          <Cell name="IconCamera">{<IconCamera size={this.state.size} />}</Cell>
          <Cell name="IconComment">
            {<IconComment size={this.state.size} />}
          </Cell>
          <Cell name="IconFacebookLogo">
            {<IconFacebookLogo size={this.state.size} />}
          </Cell>
          <Cell name="IconDislike">
            {<IconDislike size={this.state.size} />}
          </Cell>
          <Cell name="IconFacebook">
            {<IconFacebook size={this.state.size} />}
          </Cell>
          <Cell name="IconHalfStar">
            {<IconHalfStar size={this.state.size} />}
          </Cell>
          <Cell name="IconGPlus">{<IconGPlus size={this.state.size} />}</Cell>
          <Cell name="IconLike">{<IconLike size={this.state.size} />}</Cell>
          <Cell name="IconMailAlert">
            {<IconMailAlert size={this.state.size} />}
          </Cell>
          <Cell name="IconMail">{<IconMail size={this.state.size} />}</Cell>
          <Cell name="IconPlus">{<IconPlus size={this.state.size} />}</Cell>
          <Cell name="IconPrint">{<IconPrint size={this.state.size} />}</Cell>
          <Cell name="IconReading">
            {<IconReading size={this.state.size} />}
          </Cell>
          <Cell name="IconMenu">{<IconMenu size={this.state.size} />}</Cell>
          <Cell name="IconRss">{<IconRss size={this.state.size} />}</Cell>
          <Cell name="IconSearch">{<IconSearch size={this.state.size} />}</Cell>
          <Cell name="IconStar">{<IconStar size={this.state.size} />}</Cell>
          <Cell name="IconSettings">
            {<IconSettings size={this.state.size} />}
          </Cell>
          <Cell name="IconTheMarker">
            {<IconTheMarker size={this.state.size} />}
          </Cell>
          <Cell name="IconTwitter">
            {<IconTwitter size={this.state.size} />}
          </Cell>
          <Cell name="IconZen">{<IconZen size={this.state.size} />}</Cell>
          <Cell name="IconWhatsapp">
            {<IconWhatsapp size={this.state.size} />}
          </Cell>
          <Cell name="IconZoomOut">
            {<IconZoomOut size={this.state.size} />}
          </Cell>
          <Cell name="IconZoomIn">{<IconZoomIn size={this.state.size} />}</Cell>
          <Cell name="IconAccessibility">
            {<IconAccessibility size={this.state.size} />}
          </Cell>
          <Cell name="IconBold">{<IconBold size={this.state.size} />}</Cell>
          <Cell name="IconQuote">{<IconQuote size={this.state.size} />}</Cell>
          <Cell name="IconArrow">{<IconArrow size={this.state.size} />}</Cell>
          <Cell name="IconReply">{<IconReply size={this.state.size} />}</Cell>
          <Cell name="IconItalic">{<IconItalic size={this.state.size} />}</Cell>
          <Cell name="IconAndroid">
            {<IconAndroid size={this.state.size} />}
          </Cell>
          <Cell name="IconApple">{<IconApple size={this.state.size} />}</Cell>
          <Cell name="IconHtzLoader">
            {<IconHtzLoader size={this.state.size} />}
          </Cell>
          <Cell name="IconTmLoader">
            {<IconTmLoader size={this.state.size} />}
          </Cell>
          <Cell name="IconHaaretzLogo">
            {<IconHaaretzLogo size={this.state.size} />}
          </Cell>
          <Cell name="IconBundle">{<IconBundle size={this.state.size} />}</Cell>
          <Cell name="IconTablet">{<IconTablet size={this.state.size} />}</Cell>
          <Cell name="IconCredit">{<IconCredit size={this.state.size} />}</Cell>
          <Cell name="IconHaaretzFullLogo">
            {<IconHaaretzFullLogo size={this.state.size} />}
          </Cell>
          <Cell name="IconLock">{<IconLock size={this.state.size} />}</Cell>
          <Cell name="IconSafePayment">
            {<IconSafePayment size={this.state.size} />}
          </Cell>
          <Cell name="IconMarkerLogo">
            {<IconMarkerLogo size={this.state.size} />}
          </Cell>
          <Cell name="IconPaypal">{<IconPaypal size={this.state.size} />}</Cell>
          <Cell name="IconMarkerLogoTransparent">
            {<IconMarkerLogoTransparent size={this.state.size} />}
          </Cell>
          <Cell name="IconAlefLogoTransparent">
            {<IconAlefLogoTransparent size={this.state.size} />}
          </Cell>
          <Cell name="IconCheck">{<IconCheck size={this.state.size} />}</Cell>
          <Cell name="IconInfo">{<IconInfo size={this.state.size} />}</Cell>
          <Cell name="IconMessenger">
            {<IconMessenger size={this.state.size} />}
          </Cell>
          <Cell name="IconSave">{<IconSave size={this.state.size} />}</Cell>
        </Wrapper>
      </div>
    );
  }
}

// This is a fake assignment of propTypes, so that react-styleguidist
// documents the propTypes an `<Icon />` can take
/* eslint-disable */
import PropTypes from 'prop-types';
import { responsivePropBaseType } from '../../propTypes/responsivePropBaseType';
import { stylesPropType } from '../../propTypes/stylesPropType';
import { attrsPropType } from '../../propTypes/attrsPropType';

const colorShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

const iconPropTypes = {
  attrs: attrsPropType,
  color: PropTypes.oneOfType([
    colorShape,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: colorShape,
      })
    ),
  ]),
  fill: PropTypes.oneOfType([
    colorShape,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: colorShape,
      })
    ),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number,
      })
    ),
  ]),
  stylesProp: stylesPropType,
};

const iconDefaultProps = {
  color: null,
  fill: null,
  size: null,
  stylesProp: null,
};

Icons.propTypes = iconPropTypes;
Icons.defaultProps = iconDefaultProps;
/* eslint-enable */
