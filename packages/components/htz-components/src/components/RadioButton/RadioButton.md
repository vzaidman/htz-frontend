<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [RadioButton](#radiobutton)
- [Features](#features)
- [Uncontrolled Examples](#uncontrolled-examples)
- [Conrolled Examples](#conrolled-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### RadioButton

`<RadioButton>` is a generically styled RadioButton, with a styleable label, easy to use and a11y compliant.

**React Controllable RadioButton**

**From the react docs:**  
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

### Features

- Controllable, can be used both as controlled and uncontrolled input
- a11y compliant
- RadioButton is generically styled according to theme

### Uncontrolled Examples

**Minimum required props**

At minimum can be used with the label prop

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton label="one" />
</div>
```

**Custom Attrs**

The custom attributes passed to attrs will be spread on the hidden input

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton attrs={{ example: 'exampleAttr' }} label="one" />
</div>
```

**Disabled RadioButton**

Simply pass isDisabled prop to disable the RadioButton

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton isDisabled label="one" />
</div>
```

**miscStyles**

miscStyles trump all styles applyed to the wrapping label of the input

```jsx static
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton
    miscStyles={{ color: 'red', alignItems: 'baseline' }}
    label="labelRed"
  />
</div>
```

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton
    miscStyles={{ color: 'red', alignItems: 'baseline' }}
    label="labelRed"
  />
</div>
```

**name**

native html name attribute, should connect all radioButtons with the same name, radio groups shoud use `<RadioGroup/>` component simply implementing the same name will not work properly.

```jsx static
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton name="group" label="1" value="1" />
</div>
```

**onFocus onBlur and onClick**

These functions should be passed directly, and not through attrs

```jsx static
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton
    label="one"
    onClick={() => console.log('clicked')}
    onFocus={() => console.log('focused')}
    onBlur={() => console.log('blured')}
  />
</div>
```

**radioButtonId**

A custom id can be passed to the input, if no id is passed, a random one will be genrated.

```jsx static
<div dir="rtl" style={{ padding: '5rem' }}>
  <RadioButton radioButtonId="1234" label="one" />
</div>
```

### Conrolled Examples

**Basic controlled**

Simple example of changing state `onChange` of `<RadioButton />`, and sending the checked value down creates a React controlled RadioButton.

`<RadioGroup/>` is a a11y compliant component that should usually be used to control RadioButtons

```jsx static
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <div>the value from the state is: {this.state.value}</div>
        <RadioButton
          label="1"
          value="1"
          onChange={evt => this.setState({ value: evt.target.value })}
          checked={this.state.value === '1'}
        />
        <RadioButton
          label="2"
          value="2"
          onChange={evt => this.setState({ value: evt.target.value })}
          checked={this.state.value === '2'}
        />
      </div>
    );
  }
}
<Example />;
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  render() {
    return (
      <div>
        <div>the value from the state is: {this.state.value}</div>
        <RadioButton
          label="1"
          value="1"
          onChange={evt => this.setState({ value: evt.target.value })}
          checked={this.state.value === '1'}
        />
        <RadioButton
          label="2"
          value="2"
          onChange={evt => this.setState({ value: evt.target.value })}
          checked={this.state.value === '2'}
        />
      </div>
    );
  }
}
<div dir="rtl" style={{ padding: '5rem' }}>
  <Example />
</div>;
```
