<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [RadioGroup](#radiogroup)
- [Features](#features)
- [Conrolled Examples](#conrolled-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### RadioGroup

`<RadioGroup>` is a generic component that renders a list of radio buttons that are connected, easy to use and a11y compliant.

**RadioGroup**

.

### Features

- a11y compliant
- Compatibale with `<Form />` component
- Controllable, can be used both as controlled and uncontrolled input

**Minimum required props**

At minimum can be used with a radioButtons array and a name prop.

`radioButtons` is an Array of Objects to be spread as props on each `RadioButton`, at a minimum it has to have the value prop.

**`name` and `checked` are passed implicitly by RadioGroup and should not be passed through the radioButtons array**

```jsx static
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    name="testName"
    radioButtons={[{ value: '1', label: 'one' }, { value: '2', label: 'two' }]}
  />
</div>
```

```jsx
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    name="testName"
    radioButtons={[{ value: '1', label: 'one' }, { value: '2', label: 'two' }]}
  />
</div>
```

**radioButtons custom props**

```jsx
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    name="testName"
    radioButtons={[
      { value: '1', label: 'one', miscStyles: { color: 'red' } },
      { value: '2', label: 'two', miscStyles: { color: 'green' } },
    ]}
  />
</div>
```

**RadioGroup with Custom Attrs on the wrapping ul element**

```jsx static
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    attrs={{ customattr: 'customattr' }}
    name="testName"
    radioButtons={[{ value: '1', label: 'one' }, { value: '2', label: 'two' }]}
  />
</div>
```

**RadioGroup with defaultValue**

Setting the `defaultValue` prop on the `RadioGroup` element will cause the
the button with corresponding `value` to be selected by default.

```jsx static
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    defaultValue="2"
    name="testName"
    radioButtons={[
      { value: '1', label: 'one' },
      // This element will be selected by default
      { value: '2', label: 'two' },
    ]}
  />
</div>
```

**RadioGroup with a Note**

```jsx
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    name="testName"
    noteText="descritption"
    errorText="error"
    radioButtons={[{ value: '1', label: 'one' }, { value: '2', label: 'two' }]}
  />
</div>
```

**RadioGroup that has an error**

```jsx
<div style={{ padding: '5rem' }} dir="rtl">
  <RadioGroup
    isError
    name="testName"
    noteText="descritption"
    errorText="error"
    radioButtons={[{ value: '1', label: 'one' }, { value: '2', label: 'two' }]}
  />
</div>
```

### Conrolled Examples

**Basic controlled**

Simple example of changing state `onChange` of `<RadioGroup />`, and sending the checked value down creates a controlled RadioGroup.

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
        <RadioGroup
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[
            { value: '1', label: 'one' },
            { value: '2', label: 'two' },
          ]}
          value={this.state.value}
          onChange={evt => this.setState({ value: evt.target.value })}
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
      value: null,
    };
  }

  render() {
    return (
      <div>
        <div>the value from the state is: {this.state.value}</div>
        <RadioGroup
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[
            { value: '1', label: 'one' },
            { value: '2', label: 'two' },
          ]}
          value={this.state.value}
          onChange={evt => this.setState({ value: evt.target.value })}
        />
      </div>
    );
  }
}
<div dir="rtl" style={{ padding: '5rem' }}>
  <Example />
</div>;
```
