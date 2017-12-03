const fs = require('fs');
const path = require('path');

const propTypes = fs
  .readFileSync(path.join(__dirname, 'IconPropTypes.js'), {
    encoding: 'utf8',
  })
  .replace(/^((export)).+/gm, '')
  .trim();

module.exports = componentNames => `/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the \`exampleTamplate.js\` file is this directory.
 * *************************************************************** */
/* eslint-disable react/prop-types */
import React from 'react';
import { createComponent, } from 'react-fela';
${componentNames.reduce(
    (imports, componentName) => `${imports}
import ${componentName} from './icons/${componentName}';`,
    ''
  )}


const gutterWidth = '1rem';

const wrapperStyle = ({ theme, ...props }) => ({
  marginRight: \`-$\{gutterWidth}\`,
  marginLeft: \`-$\{gutterWidth}\`,
  display: 'flex',
  flexWrap: 'wrap',
});

const cellStyle = ({ theme, ...props }) => ({
  backgroundColor: theme.color('bg', 'base'),
  border: \`$\{gutterWidth} solid #fff\`,
  padding: '2rem 2rem 1rem',
  textAlign: 'center',
});

const iconWrapperStyle = ({ theme, ...props }) => ({
  backgroundColor: '#fff',
  padding: '2rem',
});

const iconNameStyle = ({ theme, ...props }) => ({
  fontFamily: 'monospace',
  marginTop: '1rem',
  extend: [ theme.type(-2), ],
});

// const UnstyledWrapper = ({ children, }) => <div>{children}</div>;

const UnstyledCell = ({ children, className, name, }) => (
  <div className={className}>
    <IconWrapper>{children}</IconWrapper>
    <IconName>{name}</IconName>
  </div>
);

const IconWrapper = createComponent(iconWrapperStyle, 'div');
const IconName = createComponent(iconNameStyle, 'p');
const Cell = createComponent(cellStyle, UnstyledCell, [ 'name', ]);

const Wrapper = createComponent(wrapperStyle, 'div');

// export default props => <IconAlef {...props} />;

export default class Icons extends React.Component {
  state = {
    size: 4,
  };

  handleSizeChange = event => {
    this.setState({ size: parseInt(event.target.value, 10), });
  };

  render() {
    return (
      <div>
        <p style={{ marginBottom: '2rem', }}>
          <strong>Edit icons size:</strong>{' '}
          <input
            style={{
              MozAppearance: 'slider-horizontal',
              WebkitAppearance: 'slider-horizontal',
              appearance: 'slider-horizontal',
              verticalAlign: 'middle',
            }}
            type="range"
            min={1}
            max={14}
            name="iconSize"
            value={this.state.size}
            onChange={this.handleSizeChange}
          />{' '
          }<span style={{ fontFamily: 'monospace', }}>({this.state.size}rem)</span>
        </p>
        <Wrapper>${componentNames.reduce(
    (cells, componentName) => `${cells}
          <Cell name="${componentName}">{<${
  componentName
} size={this.state.size} />}</Cell>`,
    ''
  )}
        </Wrapper>
      </div>
    );
  }
}

// This is a fake assignment of propTypes, so that react-styleguidist
// documents the propTypes an \`<Icon />\` can take
/* eslint-disable */
${propTypes}

Icons.propTypes = iconPropTypes;
Icons.defaultProps = iconDefaultProps;
/* eslint-enable */
`;
