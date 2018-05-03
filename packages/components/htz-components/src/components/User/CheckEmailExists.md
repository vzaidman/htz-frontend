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
