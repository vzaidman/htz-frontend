<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [A single button](#single)
* [A few buttons](#few)
* [Two groups of buttons](#groups)
* [Vertical](#vertical)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### A single button<a name="single"></a>

```jsx
<div style={{ direction: "rtl" }}>
  <ActionButtons buttons={"mail"} />
</div>
```

### A few buttons<a name="few"></a>

```jsx
<div style={{ direction: "rtl" }}>
  <ActionButtons
    buttons={[
      {
        name: "facebookLogo",
        buttonText: 78,
        iconStyles: {
          color: "red"
        }
      },
      {
        name: "whatsapp",
        buttonStyles: {
          backgroundColor: "pink"
        }
      },
      "mail"
    ]}
    globalIconsStyles={{
      color: "green"
    }}
    borderStyles={{
      width: "1px",
      lines: 0.01,
      style: "solid",
      color: "#acd2ed"
    }}
  />
</div>
```

### Two groups of buttons<a name="groups"></a>

```jsx
<div style={{ direction: "rtl" }}>
  <ActionButtons
    buttons={{
      start: [
        {
          name: "facebookLogo",
          buttonText: 78,
          iconStyles: {
            color: "#3b5998"
          }
        },
        {
          name: "whatsapp",
          iconStyles: {
            color: "#25D366"
          }
        },
        "mailAlert"
      ],
      end: [
        {
          name: "comments",
          buttonText: 78
        },
        "print",
        {
          name: "zen",
          buttonText: "קריאת זן"
        }
      ]
    }}
    globalButtonsStyles={{
      fontSize: "14px",
      lineHeight: "1.29",
      fontWeight: "300",
      color: "#2d2d2d"
    }}
    globalIconsStyles={{
      color: "#0B7EB5"
    }}
    borderStyles={{
      width: "1px",
      lines: 0.01,
      style: "solid",
      color: "#acd2ed"
    }}
  />
</div>
```

### Vertical<a name="vertical"></a>

```jsx
<div style={{ height: "300px", direction: "rtl" }}>
  <ActionButtons
    buttons={{
      start: ["facebook", "whatsapp", "mailAlert"],
      end: ["comments", "print", "zen"]
    }}
    vertical={true}
    borderStyles={{
      width: "1px",
      lines: 0.01,
      style: "solid",
      color: "#acd2ed"
    }}
  />
</div>
```
