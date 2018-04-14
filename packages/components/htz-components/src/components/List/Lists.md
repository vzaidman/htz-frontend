<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [A List component](#a-list-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The List component is just a controller that calls the actual listView selected by
the editors.<br/>
It receives the view's name and contentId as props
`e.g. <List view="Bender" contentId="7.123456" />`, and returns the selected view's component
wrapped in Apollo client with its query.

To add a new view to the list component, you need to create a new view component in the Views
folder (`/htz-components/src/components/List/views/`),
it's graphQL query in the queries folder (`/htz-components/src/components/List/queries/`)
and run `npm run lists` from `/htz-components/` to update the list components
for both the apps and the styleguide.

### **Lists Preview**

```jsx
<div style={{ direction: 'rtl', }}>
  <List contentId="" view="" />
</div>
```
