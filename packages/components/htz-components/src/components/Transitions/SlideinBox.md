**Table of Contents**

### Conditioned time formatting.

_Time in example is set to 6 hours ago._

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleBoxShow: false,
    };
  }

  render() {
    return (
      <div>
        <SlideinBox
          show={this.state.toggleBoxShow}
          direction="btt"
          duration={2}
          focus={true}
          maxHeight={[{ value: 20 }, { from: 's', value: 40 }]}>
          <div
            style={{
              backgroundColor: 'yellow',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Hello
          </div>
        </SlideinBox>

        <button
          onClick={() =>
            this.setState(prevState => ({
              toggleBoxShow: !prevState.toggleBoxShow,
            }))
          }
          type="button"
          style={{
            marginTop: '20px',
          }}>
          Click here
        </button>
      </div>
    );
  }
}
<div dir="rtl">
  <Example />
</div>;
```
