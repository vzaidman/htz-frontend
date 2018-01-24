### TextInput

`<TextInput>` is a styleable, easy to use and a11y compliant text input component.  
It can be used as a single/multi line simple text input or as a rich text editor that has Bold and Italic format buttons.

**React Controllable Input**

**From the react docs:**  
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

### Features

* Controllable, can be used both as controlled and uncontrolled input
* single and multiline support
* simple and rich text editing
* a11y compliant
* easly styled with variants

### Uncontrolled Examples

**Minimum required props**

At minimum can be used with just a label prop which is required for a11y

```jsx
<div dir="rtl">
  <TextInput label="label" />
</div>
```

**Hidden label**

`label` is a required prop for a11y compliance, if its not visually needed a `labelHidden` prop can be passed, this will add an `aria-label` attr to the relavent element with the label text, and hide the visual label.

```jsx
<div dir="rtl">
  <TextInput label="label" labelHidden />
</div>
```

**Required Input**

Used to Indicate the input is required.

When passed as a prop, the following component is rendered after the label:

See documantation of `requiredText` prop above to see how to manipulate the styling and presentation of the `<abbr/>`

```jsx static
<abbr className={className} title={requiredText.long}>{' '}
 {isSup ? <sup>{requiredText.short}</sup> : requiredText.short}
</abbr>
```

* Default color is dependant on the variant
* Custom styling can be passed with miscStyles

```jsx
<div dir="rtl">
  <TextInput
    label="label"
    requiredText={{
      long: "this field is required",
      short: "*"
    }}
  />
</div>
```

**Color Variants**

An application theme may define stylistic variants for inputs to be used in different UI situations.
Picking a variant changes multiple aspects of the `<TextInput />`'s styling at once.

The `primaryInverse` variant is intended for use when placed on dark backgrounds

```jsx static
  <TextInput variant="primaryInverse"... />
```

```jsx
<div dir="rtl" style={{ backgroundColor: "black", padding: "5rem" }}>
  <TextInput variant="primaryInverse" label="label" noteText="inverse note" />
</div>
```

**Dom Element Attributes**

The `attrs` prop take an object which is spread on the DOM element, and can be used to add additional attributes to the DOM element, e.g.:

```jsx static
  <TextInput
    attrs={{ "aria-label": "A input with custom attributes" }}...
  />
```

```jsx
<div dir="rtl">
  <TextInput
    label="label"
    attrs={{ "aria-label": "A input with custom attributes" }}
  />
</div>
```

**Default Value**

Used to specify the initial value only in uncontrolled `<TextInput />`'s

```jsx
<div dir="rtl">
  <TextInput label="label" defaultValue="Im the default value" />
</div>
```

**Error state**

When the `isError` prop is provided, the styling will be changed accordingly to affect settings in the theme.
Additionally, when `errorText` is provided it will replace the `noteText` prop

```jsx
<div dir="rtl">
  <TextInput isError label="דואל" errorText="אנא הזינו כתובת תקינה" />
</div>
```

**Example of Changing to Error state**

Notice that when adding isError prop the errorText will replace the noteText

The Input type can be controlled with the type prop

```jsx
<div dir="rtl">
  <TextInput
    label="דואל"
    noteText="נא להכניס דואל"
    errorText="נא להכניס כתובת דואל תקינה"
    placeHolder="example@you.com"
    type="email"
  />
  <TextInput
    label="דואל"
    noteText="נא להכניס דואל"
    isError
    errorText="נא להכניס כתובת דואל תקינה"
    placeHolder="example@you.com"
    type="email"
  />
</div>
```

**Disabled Input**

```jsx
<div dir="rtl">
  <TextInput label="label" isDisabled />
</div>
```

**Max and Min length**

Passing `maxLength` and `minLength` props will add native html max and min length attributes, limiting the number of characters.

Notice these wont work when isContentEditable is passed (rich text editing)

```jsx
<div dir="rtl">
  <TextInput label="דואל" maxLength={6} minLength={2} />
</div>
```

**Focus and Blur callbacks**

Triggered when the `<InputElement />` gets focused/blured

(check the console to see logs)

```jsx static
  <TextInput
    onFocus={() => console.log("input focused")}
    onBlur={() => console.log("input blured")}
    ...
  />
```

```jsx
<div dir="rtl">
  <TextInput
    label="דואל"
    noteText="נא להכניס דואל"
    errorText="נא להכניס כתובת דואל תקינה"
    placeHolder="example@you.com"
    type="email"
    onFocus={() => console.log("input focused")}
    onBlur={() => console.log("input blured")}
  />
</div>
```

**Multi-line simple text editing**

Pass the `isTextArea` prop

```jsx
<div dir="rtl">
  <TextInput
    noteText="אנא הזינו כתובת "
    errorText="אנא הזינו כתובת תקינה"
    label="דואל"
    placeholder="כתובת מייל"
    isTextArea
  />
</div>
```

**Multi-line custom height**

When using multiline, (textarea or contenteditable), a `height` prop can be passed.
`height` can be a simple number (e.g `height={5}`), or an array of responsive options objects.

The number value should be the number of rems the element height should equal.

```jsx
<div dir="rtl">
  <TextInput
    noteText="אנא הזינו כתובת "
    errorText="אנא הזינו כתובת תקינה"
    label="דואל"
    placeholder="כתובת מייל"
    isTextArea
    height={[{ until: "s", value: 10 }, { from: "l", value: 23 }]}
  />
</div>
```

**Rich Text Editing with ContentEditable**

Passing `isContentEditable` will enable rich text editing, with bold and Italic formating buttons.

```jsx
<div dir="rtl">
  <TextInput
    noteText="אנא הזינו כתובת "
    errorText="אנא הזינו כתובת תקינה"
    label="דואל"
    placeholder="כתובת מייל"
    isContentEditable
  />
</div>
```

Disabling a contenteditable requires custom logic, `<TextInput />` takes care of that logic and passing `isDisabled` prop works with a contenteditable just like input and textarea.

```jsx
<div dir="rtl">
  <TextInput
    noteText="אנא הזינו כתובת "
    errorText="אנא הזינו כתובת תקינה"
    label="דואל"
    placeholder="כתובת מייל"
    isContentEditable
    isDisabled
  />
</div>
```

### Conrolled Examples

**Basic usage with minimum required props**

Simple example of changing state `onChange` of `<TextInput />`, and sending the value down creates a React controlled Input.

```jsx static
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          onChange={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
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
      value: ""
    };
  }

  render() {
    return (
      <div dir="rtl">
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          onChange={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
        />;
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```

**onInput vs onChange**

When not using with `isContentEditable` prop, either `onChange` or `onInput` callbacks can be used according to the use case.

```jsx static
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          isTextArea
          height={15}
          onInput={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
        />;
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div dir="rtl">
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          isTextArea
          height={15}
          onInput={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
        />;
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```

**Rich Text controlled usage**

When using as a RichText editor `onContentEditableChange` callback prop should be used, this callback gets the value as the second parameter.  
The value is the innerHtml of the contenteditable div

```jsx static
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          isContentEditable
          height={10}
          onContentEditableChange={(evt, value) => this.setState({ value })}
          value={this.state.value}
        />;
      </div>
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div dir="rtl">
        <div>the value from the state is: {this.state.value}</div>
        <TextInput
          label="label"
          isContentEditable
          height={10}
          onContentEditableChange={(evt, value) => this.setState({ value })}
          value={this.state.value}
        />;
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```

**Getting a ref on the Input**

A `refFunc` callback prop can be passed in order to get a ref of the input/textarea/contenteditable.
An example use case is needing to call .focus() on the element  
Refs should be used carefully, as explained in the react docs: http://bit.ly/2BJh1KA

```jsx static
        <div>the value from the state is: {this.state.value}</div>
        <Button
          onClick={() => this.elem.focus()}
          miscStyles={{ marginTop: "3rem" }}
        >
          focus on element
        </Button>
        <TextInput
          label="label"
          refFunc={el => (this.elem = el)}
          onChange={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
          miscStyles={{ marginTop: "3rem" }}
        />;
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div dir="rtl">
        <div>the value from the state is: {this.state.value}</div>
        <Button
          onClick={() => this.elem.focus()}
          miscStyles={{ marginTop: "3rem" }}
        >
          focus on element
        </Button>
        <TextInput
          label="label"
          refFunc={el => (this.elem = el)}
          onChange={evt => this.setState({ value: evt.target.value })}
          value={this.state.value}
          miscStyles={{ marginTop: "3rem" }}
        />;
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```
