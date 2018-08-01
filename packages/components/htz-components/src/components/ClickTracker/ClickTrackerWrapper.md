The `<ClickTrackerWrapper />` is responsible for the selection and passing of banner data down to it's children.
Has a default render prop that renders a single `ClickTrackerElement` as a sole child.
Can be overriden with a custom render prop to display the banner differently.
The render prop will pass the selected banner as it's first parameter, and the viewMode
as the second parameter.

#### Method One: Default render prop that renders a ClickTrackerElement with the selected view

```jsx
const ClickTrackerElement = require('./ClickTrackerElement');
<div dir="rtl">
  <ClickTrackerWrapper
    viewModes={{
      viewModeHtz: 'resp282',
    }}
    banners={[
      {
        priority: 2,
        link:
          'http://rmkz.themarker.com/gampad/clk?id=4604476275&iu=/9401/Haaretz.co.il.ClickTracker/Haaretz.co.il.ClickTracker.AdBlocker ',
        linkTarget: '_blank',
        departments: ['all', 'haaretz', 'haaretz/', 'sport'],
        replaceDomainForAdBlocker: true,
        clicktrackerimage: {
          accessibility: 'מנטוס',
          credit: 'פרסומת',
          aspects: {
            full: {
              width: 970,
              height: 90,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/881450998.gif',
              version: '1520774010',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.5890588',
          contentName: 'מנטוס',
        },
        advertiserCamp: 'פרסומת',
        percentage: 100,
        minRange: 0,
        maxRange: 100,
        chance: 1,
        inputTemplate: 'com.polobase.ClickTrackerBannerElement',
        contentId: '7.3566',
        contentName: 'מנטוס',
      },
    ]}
  />
</div>;
```

#### Method Two: Overriding using a render prop on the ClickTrackerWrapper Element in order to generate a custom view

```jsx
const RespView282 = require('./views/RespView282').default;
<ClickTrackerWrapper
  render={(banner, viewMode) => <RespView282 {...banner} />}
  viewModes={{
    viewModeHtz: 'resp282',
  }}
  banners={[
    {
      priority: 2,
      link:
        'http://rmkz.themarker.com/gampad/clk?id=4604476275&iu=/9401/Haaretz.co.il.ClickTracker/Haaretz.co.il.ClickTracker.AdBlocker ',
      linkTarget: '_blank',
      departments: ['all', 'haaretz', 'haaretz/', 'sport'],
      replaceDomainForAdBlocker: true,
      clicktrackerimage: {
        accessibility: 'מנטוס',
        credit: 'פרסומת',
        aspects: {
          full: {
            width: 970,
            height: 90,
          },
        },
        isAnimated: false,
        imgArray: [
          {
            imgName: 'image/881450998.gif',
            version: '1520774010',
          },
        ],
        imageType: 'image',
        inputTemplate: 'com.tm.Image',
        contentId: '1.5890588',
        contentName: 'מנטוס',
      },
      advertiserCamp: 'פרסומת',
      percentage: 100,
      minRange: 0,
      maxRange: 100,
      chance: 1,
      inputTemplate: 'com.polobase.ClickTrackerBannerElement',
      contentId: '7.3566',
      contentName: 'מנטוס',
    },
  ]}
/>;
```
