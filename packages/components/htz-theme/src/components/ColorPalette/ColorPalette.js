import React from 'react';
import PropTypes from 'prop-types';
import getColor, { colors, } from '../../colors';

ColorGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function ColorGroup({ groupName, children, }) {
  return (
    <section
      style={{
        border: `1px solid ${getColor('neutral', '-4')}`,
        borderBottomWidth: '6px',
        marginBottom: '48px',
        padding: '12px 12px 24px',
      }}
    >
      <h3
        style={{
          fontSize: '2em',
          margin: '0',
        }}
      >
        {groupName}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', }}>{children}</div>
    </section>
  );
}

ColorSwatch.propTypes = {
  groupName: PropTypes.string.isRequired,
  swatchName: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  colorValue: PropTypes.string.isRequired,
};

function ColorSwatch({ groupName, swatchName, colorName, colorValue, }) {
  const isBase = swatchName === 'base';
  const exampleCode = !groupName ? (
    <code>theme.color(&apos;{colorName}&apos;)</code>
  ) : swatchName === 'base' ? (
    <code>
      theme.color(&apos;{colorName}&apos;
      <span style={{ color: getColor('neutral', '-4'), }}>
        [, &apos;{swatchName}&apos;]
      </span>)
    </code>
  ) : (
    <code>
      theme.color(&apos;{colorName}&apos;, &apos;{swatchName}&apos;)
    </code>
  );

  return (
    <div
      style={{
        backgroundColor: '#fff',
        display: 'inline-block',
        flexBasis: isBase ? '70%' : '30%',
        flexGrow: '1',
        marginTop: '12px',
        marginRight: '12px',
        maxWidth: '100%',
        // width: isBase ? '100%' : 'calc(33.33333333333333% - 12px)',
      }}
    >
      <div
        style={{
          backgroundColor: colorValue,
          border: '1px solid #333',
          boxSizing: 'border-box',
          height: groupName && isBase ? '200px' : '100px',
          width: '100%',
        }}
      />
      <p
        style={{
          fontSize: groupName && isBase ? '32px' : '16px',
          lineHeight: 1.5,
          border:
            isBase && groupName
              ? `1px solid ${getColor('neutral', '-3')}`
              : 'none',
          margin: 0,
          padding: isBase && groupName ? '12px 6px' : '12px 0',
        }}
      >
        {groupName && <strong>{groupName}</strong>}
        {isBase ? (groupName ? ': ' : '') : ` ${swatchName}: `}

        <span style={{ color: colorValue === '#FFF' ? '#333' : colorValue, }}>
          {colorValue}
        </span>
        <span
          style={{ display: 'block', fontSize: '12px', lineHeight: '18px', }}
        >
          {exampleCode}
        </span>
      </p>
    </div>
  );
}

/**
 * The color palette for Haaretz.co.il digital assets
 *
 * Available in React applications as part of the `theme` context,
 * through its `color` method.
 *
 * The `color` method takes three argument:
 * * **[`color`]** _{string}:_ A named color from the palette
 * * **[`variant='base'`]** _{string} (optional): A variant of a named-color from the palette.
 *   Defaults to `base` if undefined,
 * * **[altColorPalette]`** _{Object}_ (optional): An object containing an alternative color
 *   palette, that overrides the default one, in the current execution context.
 */
export default function ColorPalette() {
  return (
    <div>
      {Object.keys(colors).map(name => (
        <ColorGroup key={Math.random()} groupName={name}>
          {getSwatch(name)}
        </ColorGroup>
      ))}
    </div>
  );
}

function getSwatch(colorName, variant) {
  const color = colors[colorName][variant] || colors[colorName];
  if (typeof color === 'string' || Array.isArray(color)) {
    return (
      <ColorSwatch
        key={Math.random()}
        colorName={colorName}
        groupName={variant ? colorName : ''}
        swatchName={variant || 'base'}
        colorValue={getColor(colorName, variant)}
      />
    );
  }
  if (typeof color === 'object') {
    const variants = Object.keys(color);
    return variants.map(variantName => getSwatch(colorName, variantName));
  }

  return undefined;
}
