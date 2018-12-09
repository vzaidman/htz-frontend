### List Selector

**Adding a New  `Example` List**

how to add a list:
- build `example.view.js` and `example.query.js` inside the views directory
- go to getView.js and add the example component to the map (see examples in the file)
- go to `ListSelector.js` and add a `<option>` to the `<select>` element, with the list view name (should match the name from getView map)
- got to `htz-components/styleguide/mocks/list.js` and add mock data for you list (see examples in the file)

**List Selector**

select the list you want to preview:

```jsx
<div style={{ direction: 'rtl' }}>
  <ListSelector />
</div>
```
