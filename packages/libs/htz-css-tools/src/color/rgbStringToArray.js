// @flow

export default function rgbStringToArray(rgbString: string): ?(number[]) {
  return rgbString
    .slice(4, -1)
    .split(',')
    .map(channel => parseInt(channel, 10));
}
