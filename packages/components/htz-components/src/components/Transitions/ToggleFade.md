### Toggle Fade

ToggleFade is a wrapper that gives its children a fade-in/fade-out transition

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
        <ToggleFade show={this.state.toggleBoxShow} duration={0.3}>
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
        </ToggleFade>

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
