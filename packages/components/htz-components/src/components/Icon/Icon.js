/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the `exampleTamplate.js` file is this directory.
 * *************************************************************** */
/* eslint-disable react/prop-types */
import React from 'react';
import { createComponent, } from 'react-fela';

import IconAccessibility from './icons/IconAccessibility';
import IconAlefLogoTransparent from './icons/IconAlefLogoTransparent';
import IconAlefLogo from './icons/IconAlefLogo';
import IconAlert from './icons/IconAlert';
import IconApple from './icons/IconApple';
import IconAlef from './icons/IconAlef';
import IconAndroid from './icons/IconAndroid';
import IconArrow from './icons/IconArrow';
import IconAvatar from './icons/IconAvatar';
import IconBack from './icons/IconBack';
import IconBeerSheva from './icons/IconBeerSheva';
import IconBold from './icons/IconBold';
import IconBundle from './icons/IconBundle';
import IconCamera from './icons/IconCamera';
import IconCheck from './icons/IconCheck';
import IconClock from './icons/IconClock';
import IconClose from './icons/IconClose';
import IconComment from './icons/IconComment';
import IconCredit from './icons/IconCredit';
import IconDislike from './icons/IconDislike';
import IconDrive from './icons/IconDrive';
import IconFacebook from './icons/IconFacebook';
import IconFacebookLogo from './icons/IconFacebookLogo';
import IconGPlus from './icons/IconGPlus';
import IconGaniYoshua from './icons/IconGaniYoshua';
import IconHaaretzLogo from './icons/IconHaaretzLogo';
import IconItalic from './icons/IconItalic';
import IconInfo from './icons/IconInfo';
import IconLevels from './icons/IconLevels';
import IconJerusalem from './icons/IconJerusalem';
import IconLike from './icons/IconLike';
import IconLogoAlef from './icons/IconLogoAlef';
import IconLock from './icons/IconLock';
import IconMailAlert from './icons/IconMailAlert';
import IconMarkerLogoTransparent from './icons/IconMarkerLogoTransparent';
import IconMarker from './icons/IconMarker';
import IconMenu from './icons/IconMenu';
import IconPdf from './icons/IconPdf';
import IconPlus from './icons/IconPlus';
import IconPortions from './icons/IconPortions';
import IconPetachTikva from './icons/IconPetachTikva';
import IconPrint from './icons/IconPrint';
import IconReading from './icons/IconReading';
import IconQuote from './icons/IconQuote';
import IconReply from './icons/IconReply';
import IconRss from './icons/IconRss';
import IconRamatGan from './icons/IconRamatGan';
import IconMessenger from './icons/IconMessenger';
import IconSave from './icons/IconSave';
import IconSearch from './icons/IconSearch';
import IconSettings from './icons/IconSettings';
import IconTablet from './icons/IconTablet';
import IconStar from './icons/IconStar';
import IconTheMarker from './icons/IconTheMarker';
import IconWhatsapp from './icons/IconWhatsapp';
import IconZen from './icons/IconZen';
import IconTwitter from './icons/IconTwitter';
import IconZoomOut from './icons/IconZoomOut';
import IconZoomIn from './icons/IconZoomIn';
import IconMarkerLogo from './icons/IconMarkerLogo';
import IconSadSmiley from './icons/IconSadSmiley';
import IconMail from './icons/IconMail';
import IconArrowDiagonal from './icons/IconArrowDiagonal';
import IconHaaretzHomepageMasthead from './icons/IconHaaretzHomepageMasthead';
import IconHourglassRunningOut from './icons/IconHourglassRunningOut';
import IconHourglass from './icons/IconHourglass';


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
          />{' '
          }<span style={{ fontFamily: 'monospace', }}>({this.state.size}rem)</span>
        </p>
        <Wrapper>
          <Cell name="IconAccessibility">{<IconAccessibility size={this.state.size} />}</Cell>
          <Cell name="IconAlefLogoTransparent">{<IconAlefLogoTransparent size={this.state.size} />}</Cell>
          <Cell name="IconAlefLogo">{<IconAlefLogo size={this.state.size} />}</Cell>
          <Cell name="IconAlert">{<IconAlert size={this.state.size} />}</Cell>
          <Cell name="IconApple">{<IconApple size={this.state.size} />}</Cell>
          <Cell name="IconAlef">{<IconAlef size={this.state.size} />}</Cell><Cell name="IconAndroid">{<IconAndroid size={this.state.size} />}</Cell>
          <Cell name="IconArrow">{<IconArrow size={this.state.size} />}</Cell>
          <Cell name="IconAvatar">{<IconAvatar size={this.state.size} />}</Cell>
          <Cell name="IconBack">{<IconBack size={this.state.size} />}</Cell>
          <Cell name="IconBeerSheva">{<IconBeerSheva size={this.state.size} />}</Cell>
          <Cell name="IconBold">{<IconBold size={this.state.size} />}</Cell>
          <Cell name="IconBeerSheva">{<IconBeerSheva size={this.state.size} />}</Cell>
          <Cell name="IconBundle">{<IconBundle size={this.state.size} />}</Cell>
          <Cell name="IconCamera">{<IconCamera size={this.state.size} />}</Cell>
          <Cell name="IconCheck">{<IconCheck size={this.state.size} />}</Cell>
          <Cell name="IconClock">{<IconClock size={this.state.size} />}</Cell>
          <Cell name="IconClose">{<IconClose size={this.state.size} />}</Cell><Cell name="IconComment">{<IconComment size={this.state.size} />}</Cell>
          <Cell name="IconCredit">{<IconCredit size={this.state.size} />}</Cell>
          <Cell name="IconDislike">{<IconDislike size={this.state.size} />}</Cell>
          <Cell name="IconDrive">{<IconDrive size={this.state.size} />}</Cell>
          <Cell name="IconFacebook">{<IconFacebook size={this.state.size} />}</Cell><Cell name="IconFacebookLogo">{<IconFacebookLogo size={this.state.size} />}</Cell>
          <Cell name="IconGPlus">{<IconGPlus size={this.state.size} />}</Cell>
          <Cell name="IconGaniYoshua">{<IconGaniYoshua size={this.state.size} />}</Cell>
          <Cell name="IconHaaretzLogo">{<IconHaaretzLogo size={this.state.size} />}</Cell>
          <Cell name="IconItalic">{<IconItalic size={this.state.size} />}</Cell>
          <Cell name="IconHaaretzLogo">{<IconHaaretzLogo size={this.state.size} />}</Cell>
          <Cell name="IconInfo">{<IconInfo size={this.state.size} />}</Cell>
          <Cell name="IconJerusalem">{<IconJerusalem size={this.state.size} />}</Cell>
          <Cell name="IconLevels">{<IconLevels size={this.state.size} />}</Cell>
          <Cell name="IconJerusalem">{<IconJerusalem size={this.state.size} />}</Cell>
          <Cell name="IconLike">{<IconLike size={this.state.size} />}</Cell>
          <Cell name="IconLogoAlef">{<IconLogoAlef size={this.state.size} />}</Cell>
          <Cell name="IconLock">{<IconLock size={this.state.size} />}</Cell>
          <Cell name="IconMailAlert">{<IconMailAlert size={this.state.size} />}</Cell>
          <Cell name="IconMarkerLogoTransparent">{<IconMarkerLogoTransparent size={this.state.size} />}</Cell>
          <Cell name="IconMarker">{<IconMarker size={this.state.size} />}</Cell>
          <Cell name="IconMenu">{<IconMenu size={this.state.size} />}</Cell>
          <Cell name="IconMessenger">{<IconMessenger size={this.state.size} />}</Cell>
          <Cell name="IconMarkerLogoTransparent">{<IconMarkerLogoTransparent size={this.state.size} />}</Cell>
          <Cell name="IconPdf">{<IconPdf size={this.state.size} />}</Cell>
          <Cell name="IconPlus">{<IconPlus size={this.state.size} />}</Cell><Cell name="IconPortions">{<IconPortions size={this.state.size} />}</Cell>
          <Cell name="IconPetachTikva">{<IconPetachTikva size={this.state.size} />}</Cell>
          <Cell name="IconPrint">{<IconPrint size={this.state.size} />}</Cell>
          <Cell name="IconReading">{<IconReading size={this.state.size} />}</Cell>
          <Cell name="IconQuote">{<IconQuote size={this.state.size} />}</Cell>
          <Cell name="IconReading">{<IconReading size={this.state.size} />}</Cell>
          <Cell name="IconReply">{<IconReply size={this.state.size} />}</Cell>
          <Cell name="IconRamatGan">{<IconRamatGan size={this.state.size} />}</Cell>
          <Cell name="IconRss">{<IconRss size={this.state.size} />}</Cell>
          <Cell name="IconRamatGan">{<IconRamatGan size={this.state.size} />}</Cell>
          <Cell name="IconMessenger">{<IconMessenger size={this.state.size} />}</Cell>
          <Cell name="IconSave">{<IconSave size={this.state.size} />}</Cell>
          <Cell name="IconSearch">{<IconSearch size={this.state.size} />}</Cell>
          <Cell name="IconSettings">{<IconSettings size={this.state.size} />}</Cell>
          <Cell name="IconTablet">{<IconTablet size={this.state.size} />}</Cell>
          <Cell name="IconStar">{<IconStar size={this.state.size} />}</Cell>
          <Cell name="IconTheMarker">{<IconTheMarker size={this.state.size} />}</Cell>
          <Cell name="IconWhatsapp">{<IconWhatsapp size={this.state.size} />}</Cell>
          <Cell name="IconZen">{<IconZen size={this.state.size} />}</Cell><Cell name="IconTwitter">{<IconTwitter size={this.state.size} />}</Cell>
          <Cell name="IconZoomOut">{<IconZoomOut size={this.state.size} />}</Cell>
          <Cell name="IconZoomIn">{<IconZoomIn size={this.state.size} />}</Cell>
          <Cell name="IconMarkerLogo">{<IconMarkerLogo size={this.state.size} />}</Cell>
          <Cell name="IconMail">{<IconMail size={this.state.size} />}</Cell>
          <Cell name="IconArrowDiagonal">{<IconArrowDiagonal size={this.state.size} />}</Cell>
          <Cell name="IconHaaretzHomepageMasthead">{<IconHaaretzHomepageMasthead size={this.state.size} />}</Cell>
          <Cell name="IconHourglassRunningOut">{<IconHourglassRunningOut size={this.state.size} />}</Cell>
          <Cell name="IconHourglass">{<IconHourglass size={this.state.size} />}</Cell>
          <Cell name="IconZen">{<IconZen size={this.state.size} />}</Cell>
          <Cell name="IconTwitter">{<IconTwitter size={this.state.size} />}</Cell>
          <Cell name="IconZoomOut">{<IconZoomOut size={this.state.size} />}</Cell>
          <Cell name="IconMarkerLogo">{<IconMarkerLogo size={this.state.size} />}</Cell>
          <Cell name="IconSadSmiley">{<IconSadSmiley size={this.state.size} />}</Cell>
        </Wrapper>
      </div>
    );
  }
}

// This is a fake assignment of propTypes, so that react-styleguidist
// documents the propTypes an `<Icon />` can take
/* eslint-disable */
import PropTypes from 'prop-types';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';

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
  miscStyles: stylesPropType,
};

const iconDefaultProps = {
  color: null,
  fill: null,
  size: null,
  miscStyles: null,
};

Icons.propTypes = iconPropTypes;
Icons.defaultProps = iconDefaultProps;
/* eslint-enable */
