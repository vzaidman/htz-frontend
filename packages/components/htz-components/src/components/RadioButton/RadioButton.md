### RadioButton

`<RadioButton>` is a generically styled RadioButton, with a styleable label, easy to use and a11y compliant.

**React Controllable InRadioButton**

**From the react docs:**  
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

### Features

* Controllable, can be used both as controlled and uncontrolled input
* a11y compliant
* RadioButton is generically styled according to theme

### Uncontrolled Examples

**Minimum required props**

At minimum can be used without any props

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton label="test" value={1} name="test" />
</div>
```

**Custom Attrs**

The custom attributes passed to attrs will be spread on the hidden input

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton attrs={{ name: "customName" }} value={1} name="test" />
</div>
```

**onFocus onBlur and onClick**

These functions should be passed directly, and not through attrs

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton
    value={1}
    name="test"
    onClick={() => console.log("clicked")}
    onFocus={() => console.log("focused")}
    onBlue={() => console.log("blured")}
  />
</div>
```

**defaultValue**

A custom `defaultValue` can be passed to an uncontrolled RadioButton

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton
    label="I start as checked"
    defaultValue={true}
    value={1}
    name="test"
  />
</div>
```

**Disabled RadioButton**

Simply pass isDisabled prop to disable the RadioButton

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton isDisabled label="label" value={1} name="test" />
</div>
```

**label**

The label associated with the RadioButton, can be simple text or a node

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton label="לייבל" value={1} name="test" />
</div>
```

**miscStyles**

```jsx
<div dir="rtl" style={{ padding: "5rem" }}>
  <RadioButton
    value={1}
    name="test"
    miscStyles={{ color: "red", alignItems: "center" }}
    label="labelRed"
  />
</div>
```

### Conrolled Examples

<!-- **Basic controlled**

Simple example of changing state `onChange` of `<RadioButton />`, and sending the checked value down creates a React controlled RadioButton.

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
        <RadioButton
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
      checked: true
    };
  }

  render() {
    return (
      <div>
        <div>
          the value from the state is: {this.state.checked ? "true" : "false"}
        </div>
        <RadioButton
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
<div dir="rtl" style={{ padding: "5rem" }}>
  <Example />
</div>;
``` -->
