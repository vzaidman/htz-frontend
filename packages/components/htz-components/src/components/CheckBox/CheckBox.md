### CheckBox

`<CheckBox>` is a generically styled checkBox, with a styleable label, easy to use and a11y compliant.

**React Controllable InCheckBox**

**From the react docs:**  
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

### Features

* Controllable, can be used both as controlled and uncontrolled input
* a11y compliant
* CheckBox is generically styled according to theme

### Uncontrolled Examples

**Minimum required props**

At minimum can be used without any props

```jsx
<div dir="rtl">
  <CheckBox
    attrs={{
      onClick: () => console.log("click working"),
      onFocus: () => console.log("focus working"),
      onBlur: () => console.log("blur working")
    }}
  />
</div>
```

**Custom Attrs**

The custom attributes passed to attrs will be spread on the hidden input

```jsx
<div dir="rtl">
  <CheckBox attrs={{ name: "customName" }} />
</div>
```

**label**

The label associated with the checkBox, can be simple text or a node

```jsx
<div dir="rtl">
  <CheckBox label="לייבל" />
</div>
```

**isDisabled**

Simply pass isDisabled prop to disable the checkbox

```jsx
<div dir="rtl">
  <CheckBox isDisabled label="label" />
</div>
```

**isDisabled**

Simply pass isDisabled prop to disable the checkbox

```jsx
<div dir="rtl">
  <CheckBox isDisabled label="label" />
</div>
```
