import { number, oneOf, shape, } from 'prop-types';

export const buttonBoxModelType = shape({
  /** horizontal padding */
  hp: number,
  /** vertical padding */
  vp: number,
  /**
   * The `<Button>`'s placement within a `<ButtonGroup>`, when relevant
   * An object of `direction` and `placement` properties for buttons inside a
   */
  groupPlacement: oneOf([ 'start', 'middle', 'end', ]),
});
