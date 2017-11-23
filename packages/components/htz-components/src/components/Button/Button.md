<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Examples](#examples)
    - [Color Variants](#color-variants)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Examples

##### Color Variants
```jsx
<div>
  <style>
    {'.styleguide-btns>* { margin-top: 1rem; }'}
  </style>

  <h5>Outline Buttons</h5>
  <div className="styleguide-btns">
    <Button variant="primary">Primary</Button> <Button variant="positive">Positive</Button> <Button variant="negative">Negative</Button> <Button variant="sales">Sales</Button> <Button variant="facebook">Facebook</Button> <Button variant="twitter">Twitter</Button> <Button variant="whatsapp">Whatsapp</Button>
  </div>

  <h5 style={{ marginTop: '2rem', }}>Opaque  Buttons</h5>
  <div className="styleguide-btns">
    <Button variant="primaryOpaque">Primary (opaque)</Button> <Button variant="positiveOpaque">Positive (opaque)</Button> <Button variant="negativeOpaque">Negative (opaque)</Button> <Button variant="salesOpaque">Sales (opaque)</Button> <Button variant="facebookOpaque">Facebook (opaque)</Button> <Button variant="twitterOpaque">Twitter (opaque)</Button> <Button variant="whatsappOpaque">Whatsapp (opaque)</Button>
  </div>
</div>
```

padding
```jsx
<div>
  <Button 
    boxModel={{hp: 4, vp: 2,}}
  >
    More padding
  </Button> 
  <br />
  <br />
  <Button 
    boxModel={{hp: 1, vp: 0.5 ,}}
  >
    Less padding
  </Button>
</div>
```

Responsive padding
```jsx
<Button 
  boxModel={[ 
    { until: 'xl', value: {hp: 1, vp: 2,}, },
    { from: 'xl', value: {hp: 4, vp: 2,}, },
    ]}>Responsive padding</Button>
```

A full-width `<Button />`
```jsx
<div>
  <Button isFull>I'm full-width!</Button>
  <br />
  <Button isFull={[{ from: 'xl', value: true, }]}>I'm full-width in xl breakpoints</Button>
</div>
```

Radius
```jsx
<div>
  <Button isHard>Hard edged button</Button>
  <br /><br />
  <Button isRound>Rounded button</Button>
</div>
```

State
```jsx
<div>
  <Button isBusy>I'm in the middle of something</Button>
  <br />
  <br />
  <Button isDisabled>I'm disabled</Button>
</div>
```

A `<Button />` with custom css (typography, but can be anything really)
```jsx
<Button 
  miscStyles={{ 
    type: [
      { until: 'xl', value: 2, },
      { from: 'xl', value: 3, }
    ] 
  }}
>
  Larger than life
</Button>
```

Using an `<a>`
```jsx
<Button href="#!">I'm a link</Button>
```

Inline click handler
```jsx
<Button onClick={evt => alert(`${evt.target.tagName} was clicked`)}>Alarm!</Button>
```

A submit button
```jsx
<form>
  <Button isSubmit>Submit</Button>
</form>
```


A `<Button />` with custom attribute (`aria-label` and `aria-describedby`)
```jsx
<Button attrs={{ 'aria-label': 'A button with custom attributes', 'aria-describedby': 'someDomElement' }}>Click me!</Button>
```
