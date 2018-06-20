<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [CheckBox](#checkbox)
- [Features](#features)
- [Uncontrolled Examples](#uncontrolled-examples)
- [Conrolled Examples](#conrolled-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### CheckBox

`<CheckBox>` is a generically styled checkBox, with a styleable label, easy to use and a11y compliant.

**React Controllable InCheckBox**

**From the react docs:**  
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

### Features

- Controllable, can be used both as controlled and uncontrolled input
- a11y compliant
- CheckBox is generically styled according to theme

### Uncontrolled Examples

**Minimum required props**

At minimum can be used without any props

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox />
</div>
```

**Custom Attrs**

The custom attributes passed to attrs will be spread on the hidden input

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox attrs={{ name: 'customName' }} />
</div>
```

**onFocus onBlur and onClick**

These functions should be passed directly, and not through attrs

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox
    onClick={() => console.log('clicked')}
    onFocus={() => console.log('focused')}
    onBlue={() => console.log('blured')}
  />
</div>
```

**defaultValue**

A custom `defaultValue` can be passed to an uncontrolled checkbox

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox label="I start as checked" defaultValue={true} />
</div>
```

**Disabled CheckBox**

Simply pass isDisabled prop to disable the checkbox

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox isDisabled label="label" />
</div>
```

**label**

The label associated with the checkBox, can be simple text or a node

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox label="לייבל" />
</div>
```

**miscStyles**

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox
    miscStyles={{ color: 'red', alignItems: 'center' }}
    label="labelRed"
  />
</div>
```

**Note**

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox label="label" noteText="decription" errorText="error" />
</div>
```

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox label="label" noteText="decription" errorText="error" isError />
</div>
```

```jsx
<div dir="rtl" style={{ padding: '5rem' }}>
  <CheckBox
    label="label"
    noteText="decription"
    errorText="error"
    isError
    noteId="customNoteId"
  />
</div>
```

### Conrolled Examples

**Basic controlled**

Simple example of changing state `onChange` of `<CheckBox />`, and sending the checked value down creates a React controlled CheckBox.

```jsx static
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
        <div>the value from the state is: {this.state.checked ? "true" : "false"}</div>
        <CheckBox
          label="label"
          onChange={evt => this.setState({ checked: evt.checked })}
          checked={this.state.checked}
        />;
    );
  }
}
  <Example />
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  render() {
    return (
      <div>
        <div>
          the value from the state is: {this.state.checked ? 'true' : 'false'}
        </div>
        <CheckBox
          label="label"
          onChange={evt => {
            console.log(evt.target.checked);
            this.setState({ checked: evt.target.checked });
          }}
          checked={this.state.checked}
        />;
      </div>
    );
  }
}
<div dir="rtl" style={{ padding: '5rem' }}>
  <Example />
</div>;
```

**Basic controlled with ref**

Simple example of focusing on a CheckBox with the `refFunc`

```jsx static
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
        <div>the value from the state is: {this.state.checked ? "true" : "false"}</div>
        <Button onClick={()=> this.checkBoxEl.focus()}> focus CheckBox</Button>
        <CheckBox
          label="label"
          onChange={evt => this.setState({ checked: evt.checked })}
          checked={this.state.checked}
          refFunc={el => {this.checkBoxEl = el}}
        />
    );
  }
}
  <Example />
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  render() {
    return (
      <div>
        <div>
          the value from the state is: {this.state.checked ? 'true' : 'false'}
        </div>
        <Button onClick={() => this.checkBoxEl.focus()}> focus CheckBox</Button>
        <CheckBox
          label="label"
          onChange={evt => this.setState({ checked: evt.checked })}
          checked={this.state.checked}
          refFunc={el => {
            this.checkBoxEl = el;
          }}
        />
      </div>
    );
  }
}
<div dir="rtl" style={{ padding: '5rem' }}>
  <Example />
</div>;
```
