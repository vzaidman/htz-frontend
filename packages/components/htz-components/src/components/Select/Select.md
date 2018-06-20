<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [Select](#select)
- [Features](#features)
- [Uncontrolled Examples](#uncontrolled-examples)
- [Conrolled Examples](#conrolled-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Select

`<Select>` is intended to be an easy to use, easly styled and a11y compliant replacment for native html select element.

### Features

- Responsive
- Controllable, usage both as controlled and uncontrolled input
- a11y compliant
- Easly styled with variants
- Opening menu will not change page layout (has a position absolute property)

### Uncontrolled Examples

**Basic usage with minimum required props**

At minimum can be used with just a `items` prop

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select items={[{ value: 1 }, { value: 2 }, { value: 3 }]} />
  <div>The open menu wont move me</div>
</div>
```

**Dom Element Attributes**

The `attrs` prop take an object which is spread on the DOM element (applied to the wrapping div of this component), and can be used to add additional attributes to the DOM element .

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select
    onChange={selectedItem => {
      console.log(selectedItem);
    }}
    items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
    attrs={{ 'aria-hidden': true }}
  />
</div>
```

**`defaultSelectedItem`**

Used to specify the initial value only in uncontrolled `<Select />`'s

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select
    defaultSelectedItem={{ value: 2 }}
    items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
  />
</div>
```

**`items`**

The `items` prop takes an array of item objects which require a `value` key, and has optional `display` and `key` keys.  
`display` and `key` default to the `value` if not passed.  
If the `value` is not unique each item should get a unique `key`

```jsx static
<Select
  items={[
    { value: 1, display: 'one', key: 1 },
    { value: 2, display: 'two', key: 2 },
    { value: 1, display: 'I am one to but have a unique key', key: 3 },
  ]}
/>
```

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select
    onChange={selectedItem => {
      console.log(selectedItem);
    }}
    items={[
      { value: 1, display: 'one', key: 1 },
      { value: 2, display: 'two', key: 2 },
      { value: 1, display: 'I am one to but have a unique key', key: 3 },
    ]}
  />
</div>
```

**`miscStyles`**

Add custom styling to the component

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select
    items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
    miscStyles={{ color: 'green' }}
  />
</div>
```

**`placeholder`**

The placeholder to display before a item is selected

```jsx
<div dir="rtl" style={{ height: '25rem' }}>
  <Select
    placeholder="Custom Placeholder"
    items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
  />
</div>
```

### Conrolled Examples

Simple example of changing state `onChange` of `<Select />`, and sending the `controlledSelectedItem` creates a controlled `<Select />`.

```jsx static
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: { value: 3, display: 'שלוש' },
    };
  }

  render() {
    return (
      <div dir="rtl" style={{ height: '25rem' }}>
        <div>the value from the state is: {this.state.selectedItem.value}</div>
        <Select
          onChange={selectedItem => {
            this.setState({ selectedItem });
          }}
          controlledSelectedItem={this.state.selectedItem}
          items={[
            { value: 1, display: 'אחד' },
            { value: 2, display: 'שתיים' },
            { value: 3, display: 'שלוש' },
          ]}
        />
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: { value: 3, display: 'שלוש' },
    };
  }

  render() {
    return (
      <div dir="rtl" style={{ height: '25rem' }}>
        <div>the value from the state is: {this.state.selectedItem.value}</div>
        <Select
          onChange={selectedItem => {
            this.setState({ selectedItem });
          }}
          controlledSelectedItem={this.state.selectedItem}
          items={[
            { value: 1, display: 'אחד' },
            { value: 2, display: 'שתיים' },
            { value: 3, display: 'שלוש' },
          ]}
        />
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```

Example with description Note and refFunc

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: { value: 3, display: 'שלוש' },
    };
  }

  render() {
    return (
      <div dir="rtl" style={{ height: '25rem' }}>
        <div>the value from the state is: {this.state.selectedItem.value}</div>
        <Button onClick={() => this.selectEl.focus()}>Focus Select</Button>
        <br />
        <br />
        <Select
          noteText="description"
          errorText="error"
          refFunc={el => {
            this.selectEl = el;
          }}
          onChange={selectedItem => {
            this.setState({ selectedItem });
          }}
          controlledSelectedItem={this.state.selectedItem}
          items={[
            { value: 1, display: 'אחד' },
            { value: 2, display: 'שתיים' },
            { value: 3, display: 'שלוש' },
          ]}
        />
      </div>
    );
  }
}
<div dir="rtl" style={{ height: '45rem' }}>
  <Example />
</div>;
```
