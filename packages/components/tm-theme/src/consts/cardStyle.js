// @flow

export type CardStyle = {|
  cardBackgroundColor: ?string | [string, ] | [string, string, ],
  cardBoxShadow: ?string,
  cardElevatedBoxShadow: ?string,
  cardContentPadding:
    | ?number
    | [number, ]
    | [number, number, ]
    | [number, number, number, ]
    | [number, number, number, number, ],
  cardContentSeperatorColor: ?string | [string, ] | [string, string, ],
  cardContentSeperatorWidth: ?number,
  cardContentSeperatorStyle: ?string,
|};

const cardStyle: CardStyle = Object.freeze({
  cardBackgroundColor: 'white',
  cardBoxShadow: undefined,
  cardElevatedBoxShadow:
    '0px 1px 3px 0px rgba(0, 0, 0, 0.2),'
    + '0px 1px 1px 0px rgba(0, 0, 0, 0.14),'
    + '0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
  // default content padding
  cardContentPadding: 2,
  cardContentSeperatorColor: [ 'neutral', '-6', ],
  cardContentSeperatorWidth: 1,
  cardContentSeperatorStyle: 'solid',
});

export default cardStyle;
