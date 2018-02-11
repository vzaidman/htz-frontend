<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Scroll](#scroll)
- [Features](#features)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Scroll

`<Scroll />` is intended to help easly get the scroll position, direction and velocity from the Apollo store.  
Using the apollo store allows us to have only one scroll event listener on the window that writes to the Apollo store (see: `<ScrollListener/>` component), and any amount of `<Scroll/>` components that read from the store without adding expensive event listeners.

### Features

* Get scroll window.ScrollX/Y coordinates and velocity from the Apollo store
* Get direction by checking if the velocity is positive (scrolling up) or negative (scrolling down)
* Fully customizable design using the render props pattern

Notice that `<Scroll />` needs to be client side rendered only due to use of Apollo-Link-State

**The `<Scroll />` render function passes an Object with the following methods for the consumer to use.**

**x** the x scroll coordinate
**y** the y scroll coordinate
**velocity** The scroll velocity

**Usage with all of the above**

```jsx static
<Scroll
  render={({ x, y, velocity }) => (
    <div>
      x: {x} y: {y} velocity: {velocity}
    </div>
  )}
/>
```

```jsx
<Scroll
  render={({ x, y, velocity }) => (
    <div>
      x: {x} y: {y} velocity: {velocity}
    </div>
  )}
/>
```

**Usage only with velocity to get scroll direction**

```jsx static
<Scroll
  render={({velocity }) => (
    <div>
      Scroll direction is: {velocity > 0 ? 'up' : 'down'}
    </div>
  )}
/>
```

```jsx
<Scroll
  render={({ velocity }) => (
    <div>Scroll direction is: {velocity > 0 ? "up" : "down"}</div>
  )}
/>
```
