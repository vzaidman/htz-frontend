<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### FlippingArrow

`<FlippingArrow>` can be used to animate an arrow from one direction to another.

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      direction: { value: 'rtl', display: 'rtl' },
    };
  }

  render() {
    return (
      <div dir="rtl" style={{ height: '100rem' }}>
        <div>
          <p>The `isOpen` state is: {this.state.isOpen ? 'true' : 'false'}</p>
          <p>The `direction` state is: {this.state.direction.value}</p>
        </div>
        <div>
          <Button
            onClick={() => {
              this.setState(prevState => ({ isOpen: !prevState.isOpen }));
            }}>
            <FlippingArrow
              isOpen={this.state.isOpen}
              direction={this.state.direction.value}
            />
          </Button>
        </div>
        <div>
          <Select
            items={[
              { value: 'rtl', display: 'rtl' },
              { value: 'rtu', display: 'rtu' },
              { value: 'rtd', display: 'rtd' },
              { value: 'dtu', display: 'dtu' },
              { value: 'dtr', display: 'dtr' },
              { value: 'dtl', display: 'dtl' },
              { value: 'ltr', display: 'ltr' },
              { value: 'ltd', display: 'ltd' },
              { value: 'ltu', display: 'ltu' },
              { value: 'utd', display: 'utd' },
              { value: 'utl', display: 'utl' },
              { value: 'utr', display: 'utr' },
            ]}
            controlledSelectedItem={this.state.direction}
            onChange={selectedItem => {
              this.setState({ direction: selectedItem });
            }}
          />
        </div>
      </div>
    );
  }
}
<Example />;
```
