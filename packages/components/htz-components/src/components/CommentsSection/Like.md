<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

* [A Like Component](#a-Like-component)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

**Minimum required props**

At minimum can be used with just a `initVote` callback prop and `commentId` which are required

minimal props

```jsx
<div>
  <Like
    initVote={(commentId, likeSign) =>
      console.log(
        `initVote from Likes.md commentId: ${commentId} likeSign: ${likeSign}`
      )
    }
    commentId={"12345"}
  />
  <Like
    initVote={(commentId, rate) =>
      console.log(
        `initVote from Likes.md commentId: ${commentId} rate: ${rate}`
      )
    }
    commentId={"12345"}
    isDisLike
  />
</div>
```

**`plusRate` and `minusRate`**

Control the number of likes

```jsx static
<Like
  rate={100}
/>;
<Like
  rate={200}
  isDisLike
/>;
```

```jsx
<div>
  <Like
    initVote={(commentId, likeSign) =>
      console.log(
        `initVote from Likes.md commentId: ${commentId} likeSign: ${likeSign}`
      )
    }
    commentId="12345"
    rate={100}
  />
  <Like
    initVote={(commentId, likeSign) =>
      console.log(
        `initVote from Likes.md commentId: ${commentId} likeSign: ${likeSign}`
      )
    }
    commentId="12345"
    rate={200}
    isDisLike
  />
</div>
```

**`miscStyles` and `iconColor`**

control the styling of the `<Like />`

```jsx static
<Like
  miscStyles={{ backgroundColor: "lightBlue" }}
  iconColor="facebook"
/>;
```

```jsx
<Like
  initVote={(commentId, likeSign) =>
    console.log(
      `initVote from Likes.md commentId: ${commentId} likeSign: ${likeSign}`
    )
  }
  commentId="12345"
  rate={100}
  miscStyles={{ backgroundColor: "lightBlue" }}
  iconColor="facebook"
/>
```
