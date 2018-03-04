import {
  border,
  parseStyleProps,
  parseComponentProp,
} from '@haaretz/htz-css-tools';

export default function selectStyle({ theme, miscStyles, variant, isOpen, }) {
  return {
    width: '100%',
    color: theme.color('select', `${variant}TextColor`),
    extend: [
      parseComponentProp(
        undefined,
        variant,
        theme.mq,
        setVariant,
        theme.color,
        theme
      ),
      {
        ...(isOpen ? { borderBottom: 'none', } : {}),
      },
      {
        ':before': {
          left: '0',
          right: '0',
          zIndex: '1',
        },
      },
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

function setVariant(prop, variant, getColor, theme) {
  return {
    ...border(
      `${theme.selectStyle.borderWidth}px`,
      theme.selectStyle.lines,
      theme.selectStyle.borderStyle,
      getColor('select', `${variant}Border`)
    ),
  };
}
