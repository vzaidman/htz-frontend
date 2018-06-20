<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [LoginExample Component](#loginexample-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### LoginExample Component

Login example

```jsx
<CheckEmailExists
  render={({ checkEmailExists }) => (
    <Form
      onSubmit={({ email }) => {
        checkEmailExists(email)
          .then(ans => {
            console.log('checkEmailExists ans Success!', ans);
          })
          .catch(err => {
            console.log('checkEmailExists Error!', err);
          });
      }}
      render={({ getInputProps, handleSubmit }) => (
        <div>
          <TextInput
            {...getInputProps({
              name: 'email',
              label: 'email',
              type: 'email',
            })}
          />

          <div>
            <Button onClick={handleSubmit}>submit</Button>
          </div>
        </div>
      )}
    />
  )}
/>
```
