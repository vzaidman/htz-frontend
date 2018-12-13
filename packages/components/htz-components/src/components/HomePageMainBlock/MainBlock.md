## HomePage Main Block

```jsx
<div dir="rtl">
  <MainBlock
    data={{
      slotA: {
        view: 'Conrad',
        hasPagination: false,
        inputTemplate: 'com.tm.element.List',
        //   mocks need the view name as contentId
        contentId: 'Conrad',
        contentName: 'כותרת ראשית',
      },
      // slotA: {
      //   view: 'Wong',
      //   hasPagination: false,
      //   inputTemplate: 'com.tm.element.List',
      //   //   mocks need the view name as contentId
      //   contentId: 'Wong',
      //   contentName: 'כותרת ראשית',
      // },

      slotB: {
        contentLists: [
          {
            viewModes: {
              viewModeHtzMobile: 'tadmitMobile',
              viewModeTmMobile: 'tadmitMobile',
              viewModeHtz: 'resp282',
              viewModeJson: 'narrowCommercial',
            },
            banners: [
              {
                link:
                  'http://rmkz.themarker.com/gampad/clk?id=4835324538&iu=/9401/TheMarker.com.ClickTracker/TheMarker.com.ClickTracker.AdBlocker',
                linkTarget: '_blank',
                replaceDomainForAdBlocker: true,
                priority: 2,
                departments: ['all'],
                clicktrackerimage: {
                  photographer: 'none',
                  accessibility: 'האפ ',
                  credit: 'פרסומת',
                  aspects: {
                    full: {
                      width: 300,
                      height: 250,
                    },
                  },
                  imgArray: [
                    {
                      imgName: 'image/3495351595.jpg',
                      version: '1540112541',
                      aspects: {
                        full: {
                          width: 300,
                          height: 250,
                        },
                      },
                    },
                  ],
                  imageType: 'image',
                  elementType: 'image',
                  inputTemplate: 'com.tm.Image',
                  contentId: '1.6575457',
                  contentName: 'האפ',
                },
                advertiserCamp: 'האפ',
                percentage: 100,
                minRange: 0,
                maxRange: 100,
                chance: 1,
                inputTemplate: 'com.polobase.ClickTrackerBannerElement',
                contentId: '7.7789410',
                contentName: 'האפ',
              },
            ],
            totalPercentage: 100,
            inputTemplate: 'com.polobase.ClickTrackerBannersWrapper',
            contentId: '7.3700160',
            contentName: '300.250 קליק טראקר הארץ עבור אד בלוקר',
          },
        ],
        hideOnSite: false,
        inputTemplate: 'com.tm.ElementGroup',
        contentId: '7.3700154',
        contentName: '300.250 קליק טראקר הארץ עבור אד בלוקר',
      },

      slotC: {
        view: 'Pazuzu',
        hasPagination: false,
        inputTemplate: 'com.tm.element.List',
        //   mocks need the view name as contentId
        contentId: 'Pazuzu',
        contentName: '2 כתבות מתחת לראשית',
      },

      inputTemplate: 'com.htz.PageMainBlockElement',
      contentId: '7.3593839',
      contentName: 'ראשית + באנר + כתבות',
    }}
  />
</div>
```
