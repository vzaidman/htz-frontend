### RadioGroup

`<RadioGroup>` is a generic component that renders a list of radio buttons that are connected, easy to use and a11y compliant.

**RadioGroup**

.

### Features

* a11y compliant
* Compatibale with `<Form />` component
* Controllable, can be used both as controlled and uncontrolled input

**Minimum required props**

At minimum can be used with a radioButtons array and a name prop.

`radioButtons` is an Array of Objects to be spread as props on each `RadioButton`, at a minimum it has to have the value prop.

**`name` and `checked` are passed implicitly by RadioGroup and should not be passed through the radioButtons array**

```jsx static
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup name="testName" radioButtons={[{ value: "1" }, { value: "2" }]} />
</div>
```

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup name="testName" radioButtons={[{ value: "1" }, { value: "2" }]} />
</div>
```

**radioButtons custom props**

```jsx static
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup name="testName" radioButtons={[{ value: "1", label:"one",  }, { value: "2", label:"two" }]} />
</div>
```

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup
    name="testName"
    radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
  />
</div>
```

**RadioGroup with Custom Attrs**

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup
    attrs={{ customattr: "customattr" }}
    name="testName"
    radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
  />
</div>
```

**RadioGroup with defaultValue**

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup
    defaultValue="2"
    name="testName"
    radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
  />
</div>
```

**RadioGroup with a Note**

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup
    name="testName"
    noteText="descritption"
    errorText="error"
    radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
  />
</div>
```

**RadioGroup with that has an error**

```jsx
<div style={{ padding: "5rem" }} dir="rtl">
  <RadioGroup
    isError
    name="testName"
    noteText="descritption"
    errorText="error"
    radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
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
            radioButtons={[{ value: "1", label: "one" }, { value: "2", label: "two" }]}
            value={this.state.value}
            onChange={evt => this.setState({value: evt.target.value})}
          />
      </div>
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
      value: null
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
            { value: "1", label: "one" },
            { value: "2", label: "two" }
          ]}
          value={this.state.value}
          onChange={evt => this.setState({ value: evt.target.value })}
        />
      </div>
    );
  }
}
<div dir="rtl" style={{ padding: "5rem" }}>
  <Example />
</div>;
```
