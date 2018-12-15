import fontStacks from './fontStacks';

const captionStyles = Object.freeze({
  fontFamily: fontStacks.default,
  fontWeight: '700',
  captionColor: [ 'neutral', '-2', ],
  backgroundColor: [ 'neutral', '-10', ],
  captionTypeSettings: -2,
  creditStyles: Object.freeze({
    fontWeight: '300',
    creditTypeSettings: -2,
  }),
});

export default captionStyles;
