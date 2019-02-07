// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

const Football = `{
  lost
  won
  playedGames
  name
  difference
  position
  draw
  points
}`;

const NBA = `{
  loss
  name
  win
  winPctV2
}`;

export const nbaFragment = gql`
    fragment NBA on NBA {
       ${NBA}
    }
  `;


export const footballFragment = gql`
    fragment Football on Football {
       ${Football}
    }
  `;
