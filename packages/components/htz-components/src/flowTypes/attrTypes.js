// @flow

// boolean|function|number|string,
export type attrFlowType = {
  [attribute: string]:
    | boolean
    | number
    | string
    // This is an eslint bug.
    // See https://github.com/gajus/eslint-plugin-flowtype/issues/261
    // eslint-disable-next-line no-undef
    | ((evt: Event) => any),
};
