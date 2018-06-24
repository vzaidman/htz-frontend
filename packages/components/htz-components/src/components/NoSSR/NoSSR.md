**Usage**

* Wrapper for `children` components that needs to **only** render on the client side with `SSR` enabled apps.
* Passing `onSSR` prop allows the user to render a `node`(e.g: a `loading component`) while `SSR`.

#### **example: ** client only component. Render only on client.

```jsx static
const ApolloConsumer = require('react-apollo').ApolloConsumer;

const Loading = () => <div>Loading....</div>;

const NoSsrExample = () => (
  <div>
    <NoSSR onSSR={<Loading />}>
      <ApolloConsumer>
        {client => (
          <Media query={{ until: 's' }} matchOnServer>
            {matches => {
              client.writeData({
                data: { platform: matches ? 'mobile' : 'web' },
              });

              return null;
            }}
          </Media>
        )}
      </ApolloConsumer>
    </NoSSR>
  </div>
);
```
