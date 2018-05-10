The `<BIAction />` takes a function as its `children`. The `children` function should
return valid jsx. It will be passed an `action` callback as its only argument, which can
then be used to trigger the BI action by the underlying component whenever needed.

The `action` callback is a function that takes an object containing a required `actionCode`
as key, with a numeric value. An optional param called `additionalInfo` can be passed,
which will be serialized and sent as a GET parameter.

```jsx static
<BIAction>
  {action => (<SomeJSX onClick={(action) => {
    action({
      actionCode: 1,
      additionalInfo: {
        info: 'some message',
      },
    })
  }}/>)}
</BIAction>
```
