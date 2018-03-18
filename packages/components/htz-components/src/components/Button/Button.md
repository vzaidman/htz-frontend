Buttons are essential element of any UI system and is meant to convey a
notion of actionability and interactivity to the user. They must therefore
be customizable enough to cover all use cases in the UI system, but still
provide a coherent style and experience throughout the design system.

### **Variants**

A button's visual appearance is one of the key tools used to convey meaning
to actionable elements. Button variants should be used consistently throughout
the UI in accordance with the context in which the user views them. Such
consistency is instrumental in lowering anxiety in users about to perform
an action, and help alleviate implicit trust in the underlying system.

Buttons' variant is set using the `variant` prop, which defaults to 'primary'.
Each button variant sets the text and border and background color of a button.

```jsx static
<Button variant='positive'>click me</Button>
```

It is possible to set different variants for different breakpoints:

```jsx static
<Button
  variant={[
    { until: 's', value: 'primary', },
    { from: 's', value: 'primaryOpaque', },
  ]}
>
  Will be "primary" until "s", and "primaryOpaque" from "s"
</Button>
```

By default, buttons are outlined, with variants setting their color and
border-color. Each variant has a complementary opaque varaint, which sets
the button's background-color as well for use cases where a more visually
prominent button is required, e.g., call-to-action buttons.

The `isFlat` prop is used to remove the border around buttons, not affecting
other properties set by the variant.

```jsx
<div>
  <Button variant="positive" isFlat>
    yes
  </Button>{' '}
  <Button variant="negative" isFlat>
    no
  </Button>
</div>
```

The default variant is `primary` and its opaque counterpart is `primaryOpaque`. Used
for actionable element with no specific semantic meaning.

```jsx
<div>
  <Button variant="primary">primary</Button>{' '}
  <Button variant="primaryOpaque">primaryOpaque</Button>{' '}
  <Button variant="primary" isFlat>
    flat primary
  </Button>
</div>
```

The `neutral` and `neutralOpaque` are stylistic variants similar to `primary`,
in that they carry no semantic meaning and are not meant to convey a specific
message to the user. They are to be used in situations where the using the
`primary` variant would create visual discord.

```jsx
<div>
  <Button variant="neutral">neutral</Button>{' '}
  <Button variant="neutralOpaque">neutralOpaque</Button>{' '}
  <Button variant="neutral" isFlat>
    flat neutral
  </Button>
</div>
```

The `positive` and `negative` (and their opaque counterparts) should be used
in situation where the intention is to convey an action may have a negative
or positive outcome, for instance, using the `negative` variant on a DELETE
button may help increase caution, and cause the user to think twice before
irrecoverably erasing some data.

Contrarily, using the `positive` variant may lower a user's anxiety before
taking an action by clearly indicating that its outcome will be positive.

```jsx
<div>
  <div>
    <Button variant="negative">negative</Button>{' '}
    <Button variant="negativeOpaque">negativeOpaque</Button>{' '}
    <Button variant="negative" isFlat>
      flat negative
    </Button>
  </div>
  <br />
  <div>
    <Button variant="positive">positive</Button>{' '}
    <Button variant="positiveOpaque">positiveOpaque</Button>{' '}
    <Button variant="positive" isFlat>
      flat positive
    </Button>
  </div>
</div>
```

The `sales` variant is used for sales-related buttons. Since these often
need to be prominent call-to-action buttons that are designed to catch the
user's eye and stand out from the other buttons in the page, it is encouraged
to use the opaque variant in almost all situations.

```jsx
<div>
  <Button variant="salesOpaque">salesOpaque</Button>{' '}
  <Button variant="sales">sales</Button>{' '}
  <Button variant="sales" isFlat>
    flat sales
  </Button>
</div>
```

Other button variant are meant to be used for specific use cases, such as
social media:

```jsx
<div>
  <Button variant="facebook">facebook</Button>{' '}
  <Button variant="facebookOpaque">facebookOpaque</Button>{' '}
  <Button variant="facebook" isFlat>
    flat facebook
  </Button>
  <br />
  <br />
  <Button variant="twitter">twitter</Button> <Button variant="twitterOpaque">
    twitterOpaque
  </Button> <Button variant="twitter" isFlat>
    flat twitter
  </Button>
  <br />
  <br />
  <Button variant="whatsapp">whatsapp</Button>{' '}
  <Button variant="whatsappOpaque">whatsappOpaque</Button>{' '}
  <Button variant="whatsapp" isFlat>
    flat whatsapp
  </Button>
</div>
```

### **Size**

A button's size is controlled by its font-size and padding.

By default, a button's font-size is contextual, and inherited from it wrapper.
Setting the font-size can be done using the `fontSize` prop which takes a
number representing a step in the pre-configured typographic scale.

```jsx
<Button fontSize={3}>Mega Button</Button>
```

Different font-sizes can be assigned in different breakpoints:

```jsx static
<Button fontSize={[
    { until: 's', value: 3, },
    { from: 's', value: 4, },
  ]}
>
  Gets even bigger after "s"
</Button>
```

Padding is controlled using the `boxModel` prop, which takes an object with
`hp` (horizontal padding) and `vp` (vertical padding) keys. The values of
`hp` and `vp` are numbers representing a single rhythm unit.

```jsx
<div>
  <Button boxModel={{ hp: 4, vp: 2 }}>SPACED BUTTON</Button>{' '}
  <Button boxModel={{ hp: 1, vp: 0.5 }}>TIGHT BUTTON</Button>
</div>
```

Different padding can be assigned in different breakpoints:

```jsx static
<Button boxModel={[
    { until: 's', value: {{ hp: 2, vp: 1, }}, },
    { from: 's', value: {{ hp: 4, vp: 2, }}, },
  ]}
>
  Gets spacier after "s"
</Button>
```

Additionally, buttons can be set to occupy the full width of their parents
using the `isFull` prop:

```jsx
<Button isFull>I'm full-width!</Button>
```

It is also possible to make a button full-width only on select breakpoints

```jsx static
<Button isFull={[{ from: 'xl', value: true, }]}>I'm full-width in xl breakpoints</Button>
```

### **Radius**

Buttons can be set to have round or hard edges, overriding the default
border-radius set in the theme using the `isRound` and `isHard` props.

```jsx
const IconAlef = require('../Icon/icons/IconAlef').default;

<div>
  <p>Hard button:</p>
  <Button isHard>Click me</Button> <p>Round button:</p>
  <Button isRound boxModel={{ hp: 2.5, vp: 2 }}>
    <IconAlef />
  </Button>
</div>;
```

### **State**

Buttons can be disabled using the `isDisabled` prop. Setting the prop will
alter styling to indicate the button's state to the user, as well as set
the `disabled` attribute to disable usability and indicate state to visually
impaired users.

```jsx
<Button isDisabled>I'm disabled</Button>
```

Button's `busy` state can be turned on and off using the `isBusy` prop.
This is useful when the result of clicking a button is not instantaneous,
and there is a need to indicate to the user that something is happening in
response to his action. Loading content or waiting for server responses
are some of the common use-cases.

```jsx
class ButtonState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBusy: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
    this.setState({ isBusy: true });
    setTimeout(() => this.setState({ isBusy: false }), 3000);
  }

  render() {
    return (
      <Button
        variant="primary"
        isBusy={this.state.isBusy}
        onClick={this.handleClick}>
        Load More
      </Button>
    );
  }
}

<ButtonState />;
```

### **Custom Styling**

Miscellaneous CSS can be applied to a button using the `miscStyles` prop.
One common use case is to add layout related styles to a buttons, such as
margins or floats.

```jsx
<Button miscStyles={{ float: 'right' }}>Floated right</Button>
```

Miscellaneous styles can be set differently for different breakpoints

```jsx
<Button
  miscStyles={{
    float: [{ from: 'xl', value: 'right' }],
  }}>
  floated right only on xl screens
</Button>
```

### **Click Handler**

A click handler can be attached using the `onClick` prop

```jsx static
<Button onClick={evt => alert(`${evt.target.tagName} was clicked`)}>Click!</Button>
```

### **Button Type**

By default, buttons will have a role of `button`. Passing an `isSubmit` prop
will turn a button into a `submit` button, while passing `isReset`, will result
in `reset` button.

```jsx static
<form>
  <Button isSubmit>Submit</Button>
  {' '}
  <Button isReset>reset</Button>
</form>
```

### **Miscellaneous DOM Attributes**

Additional attributes can be set on the DOM element using the `attrs` prop

```jsx static
<Button
  attrs={{
    'aria-label': 'A button with custom attributes',
    'aria-describedby': 'someDomElement',
  }}
>
  Click me!
</Button>
```

### **Underlying Element**

Passing an `href` prop will automatically render the button as an `<a>` tag
using Next Js's `Link` component. Optionally, a `prefetch` prop can be passed
as well, which will be forwarded to `Link`.

```jsx
<Button href="#!">I'm a link</Button>
```

Additionally, any other element can be explicitly set, using the `tagName`
prop.

```jsx
<Button tagName="div">I'm a div (don't do this!)</Button>
```
