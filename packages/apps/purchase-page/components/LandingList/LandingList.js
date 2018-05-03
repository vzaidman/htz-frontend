import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, createComponent, } from 'react-fela';
import ScreenIcon from '../illustrations/Screen/Screen';
import CardIcon from '../illustrations/Card/Card';
import GlassesIcon from '../illustrations/Glasses/Glasses';

LandingList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const listStyle = ({ theme, }) => ({
  backgroundColor: theme.color('purchasePageLandingList', 'bg'),
  paddingTop: '4rem',
  paddingBottom: '5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  extend: [
    theme.mq({ until: 's', }, { flexDirection: 'column', alignItems: 'center', }),
  ],
});

const StyledList = createComponent(listStyle, 'ul');

const listItemStyle = ({ theme, }) => ({
  paddingInlineStart: '4.5rem',
  paddingInlineEnd: '4.5rem',
  display: 'flex',
  flexDirection: 'column',
});

const StyledListItem = createComponent(listItemStyle, 'li');

function LandingList({ items, }) {
  const iconSize = 15;

  return (
    <StyledList>
      <StyledListItem>
        <ScreenIcon size={iconSize} />
        <h4>{items[0].title}</h4>
        <p>{items[0].text}</p>
      </StyledListItem>
      <StyledListItem>
        <FelaComponent
          style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', }}
        >
          <GlassesIcon size={11} />
        </FelaComponent>
        <h4>{items[1].title}</h4>
        <p>{items[1].text}</p>
      </StyledListItem>
      <StyledListItem>
        <CardIcon size={iconSize} />
        <h4>{items[2].title}</h4>
        <p>{items[2].text}</p>
      </StyledListItem>
    </StyledList>
  );
}

export default LandingList;
