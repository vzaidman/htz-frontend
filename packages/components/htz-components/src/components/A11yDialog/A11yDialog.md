<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [Dialog with Render Props](#dialog-with-render-props)
* [**Overlay and Content**](#overlay-and-content)
* [**1. Simple usage with stateful component: (Dialog)**](#1-simple-usage-with-stateful-component-dialog)
  * [**used props**](#used-props)
* [**2. Usage with toggle refs: (Modal)**](#2-usage-with-toggle-refs-modal)
  * [**used props**](#used-props-1)
* [**2. Usage with toggle refs: (Dialog)**](#2-usage-with-toggle-refs-dialog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Dialog with Render Props

`<A11yDialog />` is a render props component used to handle a11y modal/dialog .
Dialog is essential element of any UI system and is meant to convey a
notion of interactivity to the user. Dialog component must therefore
be customizable enough to cover all use cases in the UI system, like : a11y, focus, focus lock, open and close with refs, callback functions like onOpen(post open dialog) and onClose(post close dialog). And more!.

### **Overlay and Content**

`<A11yDialog />` component include overlay and Content components. Each modal/dialog should have an overlay and Content components. User can passes props like `overlayBgColor`|`overlayMiscStyles`| `overlayAttrs` to set his custom overlay styles and attributes.

### **1. Simple usage with stateful component: (Dialog)**

#### **used props**

* `appendTo` - Set portal `<div>` id to `dialog-example-1`. | **required**
* `elementToHide` - Set `aria-hidden=true` where user's `<div>` has an id of `hide-dialog-1`. | **required**
* `isVisible` - Determine dialog mode(opend/closed), accept `true` or `false` usually passing the state of user's custom component.
* `closeOnOutsideClick` - Close dialog when clicked outside dialog inner content.
* `overlayBgColor` - Set overlay background color `"rgba(0, 0, 0, 0.5)"`

```jsx
const FelaComponent = require('react-fela').FelaComponent;

class DialogWithStateExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    return (
      <div>
        <div
          style={{
            height: '400px',
            width: '600px',
            backgroundColor: 'lightblue',
            position: 'relative',
          }}>
          <div id="hide-dialog-1" style={{ textAlign: 'center' }}>
            <Button
              onClick={() => this.setState({ isOpen: true })}
              variant="primary">
              open
            </Button>
            <A11yDialog
              appendTo="dialog-example-1"
              elementToHide="hide-dialog-1"
              isVisible={true}
              closeOnOutsideClick
              overlayBgColor="rgba(0, 0, 0, 0.5)"
              render={({ isVisible, handleClose, isModal }) => (
                <FelaComponent
                  style={{
                    backgroundColor: 'lightgreen',
                    padding: 10,
                    textAlign: 'center',
                  }}
                  render={({ className }) => (
                    <div className={className}>
                      <div>Dialog content</div>
                      <Button onClick={handleClose}> Close Content </Button>
                      <div>
                        <Button
                          onClick={handleClose}
                          variant="secondaryOpaque"
                          miscStyles={{ margin: '10px 0px' }}>
                          Button
                        </Button>
                        <h3> No Focus trap</h3>
                      </div>
                    </div>
                  )}
                />
              )}
            />
          </div>
          <div id="dialog-example-1" /> {/* mandatory to set this div dialog will be shown in a parent div */}
        </div>
      </div>
    );
  }
}
<div dir="rtl">
  <DialogWithStateExample />
</div>;
```

### **2. Usage with toggle refs: (Modal)**

#### **used props**

* `appendTo` - Set portal `div` id to `modal-example-1`. | **required**
* `elementToHide` - Set `aria-hidden=true` where user's `<div>` has an id of `hide-modal-1`. | **required**
* `toggleRefs` - Set open and close buttons as id string refs.
* `onOpen` - Trigger `console.warn` function (or any user callback function) when modal is opened.
* `onClose` - Trigger `console.warn` function (or any user callback function) when modal is closed.
* `overlayBgColor` - Set overlay background color to `lightyellow`.
* `closeOnOutsideClick` - Close modal when clicked outside modal inner content.
* `isModal`- To determine `modal` mode.

```jsx
const FelaComponent = require('react-fela').FelaComponent;

function ModalExampleWithToggleRefs() {
  return (
    <div>
      <div
        style={{
          height: '400px',
          width: '600px',
          backgroundColor: 'lightgreen',
          textAlign: 'center',
        }}
        id="hide-modal-1">
        <Button id="openRef" variant="primary">
          open
        </Button>
        <div style={{ top: '50%', position: 'relative' }}>
          <Button id="additionalOpenRef" variant="secondaryOpaque">
            additionalOpenRef
          </Button>
        </div>
      </div>

      <A11yDialog
        appendTo="modal-example-1"
        elementToHide="hide-modal-1"
        toggleRefs={['openRef', 'additionalOpenRef']}
        overlayBgColor="lightyellow"
        closeOnOutsideClick
        onOpen={() => console.warn('The Dialog has been opened!')}
        onClose={() => console.warn('The Dialog has been closed!')}
        isModal
        render={({ isVisible, handleClose, isModal }) => (
          <FelaComponent
            style={{
              backgroundColor: 'lightgreen',
              height: '300px',
              width: '700px',
              textAlign: 'center',
            }}
            render={({ className }) => (
              <div className={className}>
                <div style={{ paddingTop: '2rem' }}>Modal content</div>
                <Button
                  miscStyles={{ marginTop: '1rem', marginBottom: '1rem' }}
                  onClick={handleClose}>
                  Close Modal
                </Button>
                <div>
                  <h3> Focus trapped!</h3>
                </div>
              </div>
            )}
          />
        )}
      />
    </div>
  );
}
<div dir="rtl">
  <ModalExampleWithToggleRefs />
</div>;
```

### **2. Usage with toggle refs: (Dialog)**

* `appendTo` - Set portal `div` id to `dialog-example-2`. | **required**
* `elementToHide` - Set `aria-hidden=true` where user's `<div>` has an id of `hide-dialog-2`. | **required**
* `toggleRefs` - Set toggle buttons (as id string refs) to close/open dialog.

```jsx
const FelaComponent = require('react-fela').FelaComponent;

function DialogExampleWithToggleRefs() {
  return (
    <div>
      <Button id="Dialog-1-ToggleRef" variant="primary">
        Toggle
      </Button>
      <div
        style={{
          height: '400px',
          width: '600px',
          backgroundColor: 'lightgreen',
          textAlign: 'center',
          position: 'relative',
        }}
        id="hide-dialog-2">
        <div style={{ top: '42%', position: 'relative' }}>
          <Button id="Dialog-2-ToggleRef" variant="secondaryOpaque">
            Open/Toggle
          </Button>
        </div>
        <A11yDialog
          appendTo="dialog-example-2"
          elementToHide="hide-dialog-2"
          toggleRefs={[
            'Dialog-1-ToggleRef',
            'Dialog-2-ToggleRef',
            'Dialog-3-ToggleRef',
          ]}
          render={({ isVisible, handleClose, isModal }) => (
            <FelaComponent
              style={{
                backgroundColor: 'lightgray',
                height: '400px',
                width: '600px',
                textAlign: 'center',
              }}
              render={({ className }) => (
                <div className={className}>
                  <div style={{ paddingTop: '2rem' }}>Dialog content</div>
                  <Button
                    miscStyles={{ marginTop: '7rem', marginBottom: '1rem' }}
                    onClick={handleClose}>
                    Close Dialog
                  </Button>
                  <div>
                    <h3> No Focus trap </h3>
                  </div>
                </div>
              )}
            />
          )}
        />
        <div id="dialog-example-2" />
      </div>
      <Button variant="secondaryOpaque" id="Dialog-3-ToggleRef">
        Toggle
      </Button>
    </div>
  );
}
<div dir="rtl">
  <DialogExampleWithToggleRefs />
</div>;
```
