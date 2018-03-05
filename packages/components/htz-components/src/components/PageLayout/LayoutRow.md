LayoutRow defines is set to 100% of the width and sets a background color

**Simple `<LayoutRow>`**

```jsx
<LayoutRow>Hello LayoutRow</LayoutRow>
```

**A `<LayoutRow>` with custom attrs**

```jsx static
<LayoutRow attrs={{ "aria-label": "I am custom" }}>Customizing attrs</LayoutRow>
```

```jsx
<LayoutRow attrs={{ "aria-label": "I am custom" }}>Customizing attrs</LayoutRow>
```

**A `<LayoutRow>` with custom backgroundColor**

```jsx static
<LayoutRow bgc="green">Customizing backgroundColor</LayoutRow>
```

```jsx
<LayoutRow bgc="green">Customizing backgroundColor</LayoutRow>
```

**A `<LayoutRow>` with custom miscStyles**

<!-- todo: check why miscStyles not working -->

```jsx static
<LayoutRow miscStyles={{ paddingTop: "5rem" }}>Customizing miscStyles</LayoutRow>
```

```jsx
<LayoutRow miscStyles={{ paddingTop: "5rem" }}>
  Customizing miscStyles
</LayoutRow>
```
