### Form

`<Form />` is intended to help easly manage forms.  
Quoting from Formik package https://npm.im/formik (which this Component uses Ideas from):

`Let's face it, forms are really verbose in React. To make matters worse,most form helpers do wayyyy too much magic and often have a significant performance cost associated with them.`

For these reasons we built a generic `<Form />` that works well with our custom `<TextInput />` and has the following features:

### Features

* Get values in and out of form state easily
* Handle Validation and error messages (including focusing on the correct error)
* Handle form submission
* Designed to work with Our custom `<TextInput />` including error messages
* Handle working with our custom `<TextInput />` when in contenteditable mode without requiring consumer to take care of differences
* Fully customizable design using the render props pattern

**Basic Usage with minimum required props**

The `<Form />` component has 2 required props, `render` function and `onSubmit` function.

**`onSubmit(values)`**

A function that gets called by `<Form />`'s `handleSubmit` function.

`onSubmit` gets a the values Object from the `<Form />` state.

The values object holds a key value set for each input that the `<Form />` controls, the key will be the name of the input, and the value will be the value of the controlled `<TextInput />`.

Each input should get a unique name through `getInputProps` method(see below)

**The `<Form />` render function passes an Object with the following methods for the consumer to use.**

**`getInputProps`**

A function that is used to spread all the props on a element that is controlled by the `<Form />`.  
The element must be a custom React component that accepts the following props:  
`refFunc` (a calback that sets a ref to the actual element), `isError` and `errorText`.

`@param {Object} userProps`
An Object holding all the props the user wants to spread on the element.

The consumer **must** pass an Object with at least a `name` key that has a unique value, the rest of the properties are optional.

All props passed to a element controlled by the `<Form />` should be passed through the `getInputProps` func, e.g.,

`<TextInput {...getInputProps(myOwnProps)} />`

rather than

`<TextInput {...getInputProps} {...myOwnProps} />`

`@returns {Object} props`

An Object holding all the user props + all the generically generated props needed by
`<Form />` to control the element

**`handleSubmit`**
A function that handles submitting data from the `<Form />`

`@param {SyntheticEvent} evt` - The event object
`@param {Boolean} disablePreventDefault` -
If true the submit will not prevent `form` submit default behaviour.

By default submit event is prevented with evt.preventDefault() in the handle submit func.

If the consumer wants default form submit functionallity he can simply pass `disablePreventDefault` prop to `<Form />`

The function first checks if the values pass the validation function.
If there are errors it will focus on the error with the lowest error.order value

If there are no errors or no validation function it will call the `onSubmit` function provided to the `<Form />` with the values from the state, and then call the `<Form />`'s `clearForm` function.

**`clearForm`**
A function that clears all errors, values, and resets the touched fields in the `<Form />` state

```jsx
<div dir="rtl">
  <Form
    onSubmit={({ email }) => alert(`email submitted: ${email}`)}
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <label>
          email:
          <TextInput
            {...getInputProps({
              name: "email",
              label: "email",
              type: "email"
            })}
          />
        </label>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```

**Validating**

Form accepts a `validate` function prop

**`validate`**

A function that handles elements controlled by the `<Form />`

`@param {Object} values` -

The `values` object from the `<Form />` state automatically gets passed to the `validate` function each time it is used.

Each element that the `<Form />` controls has a key in the values Object corresponding to the name given to it through `getInputProps`.

The `values[name]` holds the value of the input with the given name.

The function should return and Array of `error` objects that have the following keys:

`name`: required, and needs to corespond with the input name

`order`: required, in case of an error after trying to submit the `<Form />` will focus on the input that is in error state and has the lowest `error.order` value

`errorText`: optional, will render the given `errorNote` in case of error.

```jsx static
  <Form
    validate={({ email, text }) => {
      let errors = [];
      if (!email) {
        errors.push({
          name: "email",
          order: 1,
          errorText: "must provide email",
        });
      }
      if (!text) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "must provide text",
        });
      }
      if (text && text.length < 5) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "text must be at least 5 chars",
        });
      }
      return errors;
    }}
...
  />
```

```jsx
<div dir="rtl">
  <Form
    onSubmit={({ email, text }) => alert(`email: ${email} text: ${text}`)}
    validate={({ email, text }) => {
      let errors = [];
      if (!email) {
        errors.push({
          name: "email",
          order: 1,
          errorText: "must provide email"
        });
      }
      if (!text) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "must provide text"
        });
      }
      if (text && text.length < 5) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "text must be at least 5 chars"
        });
      }
      return errors;
    }}
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <TextInput
          {...getInputProps({
            name: "email",
            label: "email"
          })}
        />
        <br />
        <TextInput
          {...getInputProps({
            name: "text",
            label: "text"
          })}
        />

        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```

**`isValidateOnBlur`**

By default the `<Form />` will validate elements that the user touched when bluring that element, cancel this behaviour by simply passing `isValidateOnBlur=false`

```jsx
<div dir="rtl">
  <Form
    onSubmit={({ email, text }) => alert(`email: ${email} text: ${text}`)}
    isValidateOnBlur={false}
    validate={({ email, text }) => {
      let errors = [];
      if (!email) {
        errors.push({
          name: "email",
          order: 1,
          errorText: "must provide email"
        });
      }
      if (!text) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "must provide text"
        });
      }
      return errors;
    }}
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <TextInput
          {...getInputProps({
            name: "email",
            label: "email"
          })}
        />
        <br />
        <TextInput
          {...getInputProps({
            name: "text",
            label: "text"
          })}
        />

        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```

**`isValidateOnChange`**

By default the `<Form />` will recheck validation of input when the user enters new data (to touched elements, i.e elements that were blured at least once), cancel this behaviour by simply passing `isValidateOnChange=false`

```jsx
<div dir="rtl">
  <Form
    onSubmit={({ email, text }) => alert(`email: ${email} text: ${text}`)}
    isValidateOnChange={false}
    validate={({ email, text }) => {
      let errors = [];
      if (!email) {
        errors.push({
          name: "email",
          order: 1,
          errorText: "must provide email"
        });
      }
      if (!text) {
        errors.push({
          name: "text",
          order: 2,
          errorText: "must provide text"
        });
      }
      return errors;
    }}
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <TextInput
          {...getInputProps({
            name: "email",
            label: "email"
          })}
        />
        <br />
        <TextInput
          {...getInputProps({
            name: "text",
            label: "text"
          })}
        />

        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```

**`initialValues`**

In order to set the initial values of an input controlled by `<Form />` simply pass a values object to initialValues prop

```jsx
<div dir="rtl">
  <Form
    initialValues={{ email: "example@initialemail.com" }}
    onSubmit={({ email }) => alert(`email submitted: ${email}`)}
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <TextInput
          {...getInputProps({
            name: "email",
            label: "email",
            type: "email"
          })}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```

**Working with RichText**

`<Form />` takes care of our TextInput weather its a contenteditable, textarea or regular input generically.

```jsx
<div dir="rtl">
  <Form
    onSubmit={({ email, richText, multiline }) =>
      alert(
        `email submitted: ${email} richText: ${richText} multiline: ${multiline}`
      )
    }
    render={({ getInputProps, handleSubmit, clearForm }) => (
      <div>
        <TextInput
          {...getInputProps({
            name: "email",
            label: "email",
            type: "email"
          })}
        />
        <br />
        <TextInput
          {...getInputProps({
            name: "richText",
            label: "richText",
            isContentEditable: true
          })}
        />
        <br />
        <TextInput
          {...getInputProps({
            name: "multiline",
            label: "multiline",
            isTextArea: true
          })}
        />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit}>submit</Button>
          <Button onClick={clearForm}>clear</Button>
        </div>
      </div>
    )}
  />
</div>
```
