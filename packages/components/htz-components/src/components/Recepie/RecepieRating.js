import React from 'react';
// import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, borderTop, } from '@haaretz/htz-css-tools';
import IconClock from '../Icon/icons/IconClock';
import IconLevels from '../Icon/icons/IconLevels';
import IconPortions from '../Icon/icons/IconPortions';
import Rating from './Rating';

const propTypes = {};
const defaultProps = {};

const rows = [
  { icon: 'levels', highLightedText: 'דרגת קושי', text: 'בינוני', },
  { icon: 'portions', highLightedText: 'מנות', text: '4 סועדים', },
  { icon: 'clock', highLightedText: 'זמן בישול', text: 'שעתיים', },
];
function RecipeRating() {
  return (
    <div>
      <FelaComponent
        style={theme => ({
          color: theme.color('neutral', '-2'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          extend: [
            borderBottom('1px', 2, 'solid', theme.color('neutral', '-5')),
          ],
        })}
      >
        <div>דירוג הגולשים</div>
        <div>
          <Rating
            newRating={rating => console.log(`got new rating: ${rating}`)}
            rating={2.5}
          />
        </div>
      </FelaComponent>
      {rows.map(row => {
        const icon = {
          clock: <IconClock />,
          portions: <IconPortions />,
          levels: <IconLevels />,
        };
        return (
          <FelaComponent
            style={theme => ({
              display: 'flex',
              alignItems: 'center',
              extend: [
                borderBottom('1px', 2, 'solid', theme.color('neutral', '-5')),
                borderTop('1px', 1, 'solid', 'transparent'),
              ],
            })}
          >
            <FelaComponent
              style={theme => ({
                color: theme.color('primary'),
                marginInlineEnd: '1rem',
                extend: [ theme.type(2), ],
              })}
              render="span"
            >
              {icon[row.icon]}
            </FelaComponent>
            <FelaComponent
              style={{ fontWeight: 'bold', marginInlineEnd: '1rem', }}
              render="span"
            >
              {row.highLightedText}:
            </FelaComponent>
            <span>{row.text}</span>
          </FelaComponent>
        );
      })}
    </div>
  );
}

RecipeRating.propTypes = propTypes;
RecipeRating.defaultProps = defaultProps;

export default RecipeRating;
