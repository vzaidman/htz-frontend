LayoutContainer defines the max width and background color of a row responsivly according to the break point

**Simple `<LayoutContainer>`**

```jsx
<LayoutContainer>Hello LayoutContainer</LayoutContainer>
```

**A `<LayoutContainer>` with custom attrs**

```jsx static
<LayoutContainer attrs={{ ariaLabel: "I am custom" }}>Customizing attrs</LayoutContainer>
```

```jsx
<LayoutContainer attrs={{ ariaLabel: "I am custom" }}>
  Customizing attrs
</LayoutContainer>
```

**A `<LayoutContainer>` with custom backgroundColor**

```jsx static
<LayoutContainer bgc="green">Customizing backgroundColor</LayoutContainer>
```

```jsx
<LayoutContainer bgc="green">Customizing backgroundColor</LayoutContainer>
```

**A `<LayoutContainer>` with custom miscStyles**

<!-- todo: check why miscStyles not working -->

```jsx static
<LayoutContainer miscStyles={{ paddingTop: "5rem" }}>Customizing miscStyles</LayoutContainer>
```

```jsx
<LayoutContainer miscStyles={{ paddingTop: "5rem" }}>
  Customizing miscStyles
</LayoutContainer>
```
