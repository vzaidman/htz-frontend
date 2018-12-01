const timingFunctions = {
  linear: 'linear',
  swiftIn: 'cubic-bezier(0, 0, .2, 0)',
  swiftOut: 'cubic-bezier(.55, 0, .1, 1)',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

/**
 * On object of transition-related css-properties.
 *
 * @typedef {Object} TransitionProperties
 *
 * @prop {string} [transitionDuration] - The duration of a transition
 * @prop {string} [transitionTimingFunction] - A transition's timing-function
 * @prop {string} [transitionDelay] - The delay before a transition is initiated
 */

/**
 * Set transition properties by preconfigured steps and named options
 *
 * @param {number} [duration] - The transition duration step.
 *   duration steps start at `0`, with `0.25s`, which is generally considered
 *   the minimal time a person needs for completing the eye-movement towards the element
 *   and preserving the animation itself. The next step up, `1` is a very subtle increment
 *   of `50ms` to `0.3s`, for when the user's eye is expected to travel larger distances,
 *   when the animation is somewhat more complex. These two steps will usually be the
 *   adequate choice for micro-interactions. Each step above is a multiple of `0.25s`,
 *   e.g., `0.5s`, `0.75s`, etc. These maybe useful for more complex animations.
 *
 *   A `-1` step is available for nearly instantaneous transitions that are 1 frame in
 *   a 60fps budget (~`0.166666s`).
 *
 * @param {'linear'|'swiftIn'|'swiftOut'|'easeIn'|'easeOut'|'easeInOut'} [easing]
 *   A named timing-function describing how the intermediate values of the CSS properties
 *   being affected by a transition effect are calculated.
 *
 * @param {number} [delay] - The transition delay step.
 *   Uses the same steps as `duration` to determine the amount of delay before a
 *   transition is initiated.
 *
 * @return {TransitionProperties} - An object of transition-related properties generated
 *   based on the arguments passed to the function.
 */
export function getTransition(duration, easing, delay) {
  return getProps('transition', duration, easing, delay);
}

/**
 * Get transition properties by preconfigured steps and named options as a single string.
 * Useful when needing to define different transitions for different properties.
 *
 * @param {string} prop
 *   The transitioned property, e.g., `all` or `transform`.
 *
 * @param {number} [duration]
 *   The transition duration step.
 *   duration steps start at `0`, with `0.25s`, which is generally considered
 *   the minimal time a person needs for completing the eye-movement towards the element
 *   and preserving the animation itself. The next step up, `1` is a very subtle increment
 *   of `50ms` to `0.3s`, for when the user's eye is expected to travel larger distances,
 *   when the animation is somewhat more complex. These two steps will usually be the
 *   adequate choice for micro-interactions. Each step above is a multiple of `0.25s`,
 *   e.g., `0.5s`, `0.75s`, etc. These maybe useful for more complex animations.
 *
 *   A `-1` step is available for nearly instantaneous transitions that are 1 frame in
 *   a 60fps budget (~`0.166666s`).
 *
 * @param {'linear'|'swiftIn'|'swiftOut'|'easeIn'|'easeOut'|'easeInOut'} [easing]
 *   A named timing-function describing how the intermediate values of the CSS properties
 *   being affected by a transition effect are calculated.
 *
 * @param {number} [delay] - The transition delay step.
 *   Uses the same steps as `duration` to determine the amount of delay before a
 *   transition is initiated.
 *
 * @return {TransitionProperties} - An object of transition-related properties generated
 *   based on the arguments passed to the function.
 */
export function getTransitionString(prop, duration, easing, delay) {
  const {
    transitionDuration,
    transitionDelay,
    transitionTimingFunction,
  } = getProps('transition', duration, easing, delay);

  return `${prop} ${transitionDuration || ''} ${transitionTimingFunction
    || ''} ${transitionDelay || ''}`;
}

export function getDuration(type, duration) {
  return getProps(type, duration, undefined, undefined);
}

export function getDelay(type, delay) {
  return getProps(type, undefined, undefined, delay);
}

/**
 * Set a timing-function for an animation or transition based on preconfigured options
 * @param {'animation', 'transition'} type - The effect to which timing function is applied to.
 * @param {'linear'|'swiftIn'|'swiftOut'|'easeIn'|'easeOut'|'easeInOut'} [easing]
 *   A named timing-function describing how the intermediate values of the CSS properties
 *   being affected by an animation or transition effect are calculated.
 * @return {Object} - An object with an `${type}TimingFunction` property.
 */
export function getTimingFunction(type, easing) {
  return getProps(type, undefined, easing, undefined);
}

function getProps(type, duration, easing, delay) {
  if (
    typeof duration === 'undefined'
    && typeof delay === 'undefined'
    && !easing
  ) {
    throw new Error('You must pass at least one of the arguments');
  }
  const timingFunction = Array.isArray(easing)
    ? easing.map(value => timingFunctions[value]).totring()
    : timingFunctions[easing];

  if ([ 'animation', 'transition', ].indexOf(type) < 0) {
    throw new Error('"type" must be either "animation" or "transition"');
  }
  if (easing && !timingFunction) {
    throw new Error(`"${easing}" is not a named timing function`);
  }
  return {
    ...(typeof duration !== 'undefined'
      ? { [`${type}Duration`]: getTime(duration), }
      : undefined),
    ...(timingFunction
      ? { [`${type}TimingFunction`]: timingFunction, }
      : undefined),
    ...(typeof delay !== 'undefined'
      ? { [`${type}Delay`]: getTime(delay), }
      : undefined),
  };
}

// 1. 60fps. Most often way too quick for an animation to be perceived
function getTime(step) {
  if (Array.isArray(step)) {
    return step.map(value => getTime(value)).toString();
  }

  if (step < -1) {
    throw new RangeError(
      `"step" may not be lower than "-1". You passed "${step}"`
    );
  }

  return step === -1
    ? `${10 / 60}s` // [1]
    : step === 0 ? '.25s' : step === 1 ? '.3s' : `${0.25 * step}s`;
}
