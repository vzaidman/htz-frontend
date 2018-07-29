## ServiceByMailRegistration component

Can be used to create a ServiceByMailRegistration to subscribe with existing or non existing users

```jsx
<div style={{ direction: 'rtl' }}>
  <ServiceByMailRegistration
    serviceUrl="https://alerts.haaretz.co.il/alerts/register?newsletterId=1.4401159&type=writers"
    title="שלח לי התראה"
    onRegistrationSuccess={data => alert(JSON.stringify(data))}
    onRegistrationError={data => alert('failure')}
    onCancel={() => alert('cancel pressed')}
  />
</div>
```
