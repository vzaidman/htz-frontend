<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [A Component displaying message after submitting a new comment](#a-component-displaying-message-after-submitting-a-new-comment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### A Component displaying message after submitting a new comment

`<CommentSent />` display depends on the 'displayThankYou` prop

When false it will display a form allowing to sign up to email notifications

The form is handled by `<Form />` and `<TextInput />`, including email verification, errorText and errorNote

```jsx
<div dir="rtl">
  <CommentSent
    isReplyForm={false}
    closeDisplayThankYou={() => console.log('will close display thank you')}
    displayThankYou={false}
    signUpNotification={(bool, email) =>
      console.log('init sign up email ' + email)
    }
  />
</div>
```

When true it will display the ThankYou message

`<CommentForm />` uses `closeDisplayThankYou` callback to change its own state and
stop displaying the `<CommentSent />` when clicking the close button

```jsx
<div dir="rtl">
  <CommentSent
    isReplyForm={false}
    closeDisplayThankYou={() => console.log('will close display thank you')}
    displayThankYou={true}
    signUpNotification={bool => console.log('init sign up func ' + bool)}
  />
</div>
```
