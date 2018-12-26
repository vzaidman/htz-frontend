### List Selector

**Adding a New `Example` List**

how to add a list:

- create `ExampleView.js` and `Example.js` inside the views directory
- go to `DynamicListView` and add a dynamic import of example component and to switch case (see examples in the file)
- go to `ListSelector.js` and add a `<option>` to the `<select>` element, with the list view name (should match the name from getView map)
- got to `htz-components/styleguide/mocks/list.js` and add mock data for you list (see examples in the file)

The following steps are necessary because of a bug with nextjs dynamic import and yarn workspaces (see this issue https://github.com/zeit/next.js/issues/5511)

- export `Example.js` from htz-components index
- inside packages\apps\haaretz.co.il\components\HomePage\List\views create a new directory Example and a file Example.js where you import Example from htz components and then default export the same component
- update DynamicListView in haaretz.co.il (which should be an exact copy of the same component in htz-components)

`List.js` should also be exactly the same in both packages except for the import statements.

**List Selector**

select the list you want to preview:

```jsx
<div style={{ direction: 'rtl' }}>
  <ListSelector />
</div>
```
