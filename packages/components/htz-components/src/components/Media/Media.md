The `<Media />` component tests if a CSS media query matches, and allows
rendering content conditionally based on the result of the test.

The media query to test against is built based on the value passed to the 
`query` prop, which takes an object with `from` and `until` keys, whose values
should either be numbers in pixels, or (preferably), named breakpoints from
the theme. `query` can also contain a `misc` key, whose value is either a 
named miscellaneous breakpoint from the theme, or a random query. The media
type to match (i.e., `print` etc.) can be set using the `type` key.

The `children` prop should be a function whose only argument will be a boolean
flag that indicates whether the media query matches or not, allowing conditional
rendering based on the result.

```jsx static
<Media 
  query={{from: 'l'}}
>
  {matches =>
    matches
      ? (<p>The viewport is larger than the "l" breakpoint</p>)
      : (<p>The viewport is smaller than the "l" breakpoint</p>)
  }
</Media>
```

The `render` prop should be an argumentless function, which is only called if
the query matches, can be used for the common use case of only needing to 
render something when the media matches. 

The `render` prop takes precedence over `children`, so if both the `render` 
and `children` props are passed, `children` will be disregarded.

```jsx static
<Media 
  query={{from: 'l'}}
  render= {() => (
    <p>
      The viewport is larger than the "l" breakpoint.
      Nothing is rendered bellow it.
    </p>
  )}
/>
```
On the server, a media query cannot match, as there is no viewport. 
For a query to consider matching on the server, the `matchOnServer` prop
should be passed.

```jsx static
<Media 
  query={{from: 'l'}}
  matchOnServer
  render= {() => (
    <p>
      Rendered when the viewport is larger than the "l" 
      breakpoint and on the server.
    </p>
  )}
/>
```
The `targetWindow` prop can be specified if you want the query to be evaluated
against a different window object than the one the code is running in. This 
can be useful for example if you are rendering part of your component tree to
an iframe or a [popup window](https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202).

Note: `<Media />` uses [react-media](https://github.com/reacttraining/react-media)
by [Michael Jackson](https://twitter.com/mjackson) to do all the heavy lifting
behind the scenes.
