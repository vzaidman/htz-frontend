The `<ClickArea />` component answers two separate needs:
1. Ensuring a minimal click area for touch interactions in otherwise 
   smaller elements (such as icons).
2. Creating clickable elements that dont have any distinctive visual UI
   other than their content, but still provide built in focus and action 
   feedback for better accessibility and UX.

### **Size**

The `<ClickArea>`'s size is controlled via the `size` attribute, which is a 
required prop. It will set the `<ClickArea`'s `min-height` and `min-width`.

```jsx
const IconAlef = require('../Icon/icons/IconAlefLogo').default;
initialState = { size: 8 };

<div>
  <p style={{ marginBottom: '2rem', }}>
    <strong>Set the <code>&lt;ClickArea /&gt;</code>'s size:</strong>{' '}
    <input
      style={{
        MozAppearance: 'slider-horizontal',
        WebkitAppearance: 'slider-horizontal',
        appearance: 'slider-horizontal',
        verticalAlign: 'middle',
      }}
      type="range"
      min={6}
      max={40}
      name="size"
      value={state.size}
      onChange={evt => setState({ size: parseInt(evt.target.value, 10), })}
    />{' '
    }<span style={{ fontFamily: 'monospace', }}>({state.size}rem)</span>
  </p>

  <div style={{ textAlign: 'center', padding: '10rem', backgroundColor: '#ccc', }}>
    <ClickArea size={state.size} miscStyles={{ backgroundColor: '#fff', }}>
      <IconAlef size={state.size / 2} />
    </ClickArea>
  </div>
</div>
```

Different sizes can be assigned in different breakpoints:

```jsx static
// Will be 6rems until 's', and 12 from 's'
<ClickArea size={[{ until: 's', value: 6 }, { from: 's', value: 12 }]} />
```

### RippleColor

When clicked or focused, a `<ClickArea />` will emmit a ripple animation. Its 
color can be controlled via the `RippleColor` prop, which can be:

  - A `string` representing a named color.
  - A `tuple` of two `string`s, the first representing a named color, and the 
    second representing a variant of that named color.

```jsx static
<ClickArea rippleColor={state.color} size={4} />
```

```jsx
const IconAlef = require('../Icon/icons/IconAlefLogo').default;
initialState = { color: 'primary', };
const buttonRef = React.createRef();

<div>
  <div style={{ marginBottom: '2rem', }}>
    <p>
      <strong>Set the <code>&lt;ClickArea /&gt;</code>'s ripple color:</strong>
    </p>
  </div>
  <Button onClick={
    e => {
      setState({color: 'primary'});
      buttonRef.current.focus();
    }
  }>
    SET COLOR
  </Button>
  <Button variant="negative" onClick={
    e => {
      setState((state, props) => ({ color: 'negative', }),);
      buttonRef.current.focus()
    }
  }>
    SET COLOR
  </Button>
  <Button variant="positive" onClick={
    e => {
      setState({color: 'positive'});
      buttonRef.current.focus();
    }
  }>
    SET COLOR
  </Button>

  <div
    style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#ccc', marginTop: '4rem', }}
    >
    <ClickArea rippleColor={state.color} size={16} miscStyles={{ backgroundColor: '#fff', }} ref={buttonRef}>
      <IconAlef size={8} />
    </ClickArea>
  </div>
</div>
```

The ripple's color can also be assigned different values in different breakpoints

```jsx static
<ClickArea
  rippleColor={
    [ 
      { until: 'xl', value: [ 'secondary', '+1' ] }
      { from: 'xl', value: 'primary' }
    ],
  }
/>
```

### **Custom Styling**

Miscellaneous CSS can be applied to using the `miscStyles` prop.
One common use case is to add layout related styles, such as margins or floats.

```jsx static
<ClickArea 
  size={4}
  miscStyles={{ float: 'right' }}
/>
```

Miscellaneous styles can be set differently for different breakpoints

```jsx static
<ClickArea
  miscStyles={{
    float: [{ from: 'xl', value: 'right' }],
  }}>
  floated right only on xl screens
</ClickArea>
```

### **State**

A `<ClickArea />` can be disabled using the `isDisabled` prop. Setting the prop will
alter styling to indicate the button's state to the user, as well as set
the `disabled` attribute to disable usability and indicate state to visually
impaired users.

```jsx
<div>
  This isDisabled:{' '}
  <ClickArea 
    size={8}
    isDisabled 
  >
    {'🅧'}
  </ClickArea>
</div>
```

### **Click Handler**

A click handler can be attached using the `onClick` prop

```jsx static
<ClickArea onClick={evt => alert(`${evt.target.tagName} was clicked`)} />
```

### **Underlying Element**

By default, a `<ClickArea />` will be rendered as a 'button'. Passing an `href` 
prop will automatically render the button as an `<a>` tag using Next Js's `Link` 
component. Optionally, `prefetch` and `asPath` props can be passed as well, 
which will be forwarded to `Link`.

```jsx static
// Will be rendered as a link
<ClickArea href="#!" size={4} />
```
Rarely, you may want to render the `<ClickArea />` as a different element, which
can be done using the `tagName` prop. However, please use this option very 
cautiously and conservatively, as it has implications on both the accessibility 
and semantics of the element.

```jsx static
// Will be rendered as a span
<ClickArea tagName="span" size={4} />
```
### **Button Type**

By default, the rendered button will have a role of `button`. Passing an `isSubmit` prop
will turn a button into a `submit` button, while passing `isReset`, will result
in a `reset` button.

```jsx static
<form>
  {/* Will render as a submit button */}
  <ClickArea 
    size={4}
    isSubmit
  >
  </ClickArea>

  {/* Will render as a reset button */}
  <ClickArea 
    size={4}
    isReset
  >
  </ClickArea>
</form>
```

### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<ClickArea
  attrs={{
    'aria-label': 'A button with custom attributes',
    'aria-describedby': 'someDomElement',
  }}
  size={4}
 />
```
