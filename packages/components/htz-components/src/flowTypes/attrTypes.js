// @flow

// boolean|function|number|string,
export type attrFlowType = {
  [attribute: string]: | boolean
    | number
    | string
    | ((evt: SyntheticEvent<*>) => void)
};
