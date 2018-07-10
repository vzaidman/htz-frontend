<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Hamburger

`<Hamburger>` animates between a hamburger icon and an X

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div dir="rtl" style={{ height: '10rem' }}>
        <div>
          <p>The `isOpen` state is: {this.state.isOpen ? 'true' : 'false'}</p>
        </div>
        <div>
          <Button
            onClick={() => {
              this.setState(prevState => ({ isOpen: !prevState.isOpen }));
            }}
            boxModel={{ vp: 3, hp: 3 }}>
            <Hamburger isOpen={this.state.isOpen} />
          </Button>
        </div>
      </div>
    );
  }
}
<Example />;
```
