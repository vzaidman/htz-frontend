<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [ScrollListener](#scrolllistener)
- [Features](#features)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### ScrollListener

`<ScrollListener />` is intended to help easly write the scroll position and velocity to the Apollo store.  
Using the apollo store allows us to have only one scroll event listener on the window that writes to the Apollo store,
and any amount of `<Scroll/>` components that read from the store without adding expensive event listeners.

### Features

* Handles the logic of calculating the scroll velocity.
* Handles logic of throttling scroll event by using react-fns package (see differance between throttling and debouncing here: http://bit.ly/1QtbKI5 )
* Writes to Apollo store using Apollo-Link-State

Notice that ScrollListener needs to be client side rendered only (due to use of Apollo-Link-State and adding an event listener to the window)

```jsx
<ScrollListener />
```
