import React from 'react';
import felaSnapshotter from '../../../../../test-helpers/felaSnapshotter';
import Boxy from '../BoxyView.js';

describe('<Boxy>', () => {
  describe('DOM element', () => {
    it('renders image correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <Boxy
          list={{
            title: 'כותרת רשימה',
            items: [
              {
                title:
                  'תוצאות הבחירות המקומיות בחיפה | יונה יהב הודה בהפסד לקליש-רותם: "מכבד את רצון הבוחרים"',
                titleMobile: 'יונה יהב הודה בהפסד בבחירות לקליש-רותם: "מכבד את רצון הבוחרים"',
                path: 'http://pre.haaretz.co.il/news/local/1.6611159',
                media: {
                  photographer: 'none',
                  viewMode: 'FullColumnWithVerticalImage',
                  accessibility: 'יונה יהב, היום',
                  credit: 'רמי שלוש',
                  title: 'יונה יהב, היום',
                  aspects: {
                    vertical: {
                      x: 958,
                      y: 8,
                      width: 1242,
                      height: 1457,
                    },
                    regular: {
                      x: 657,
                      y: 0,
                      width: 1543,
                      height: 1160,
                    },
                    belgrade: {
                      x: 0,
                      y: 0,
                      width: 2200,
                      height: 693,
                    },
                    headline: {
                      x: 851,
                      y: 0,
                      width: 1349,
                      height: 784,
                    },
                    landscape: {
                      x: 0,
                      y: 12,
                      width: 2200,
                      height: 950,
                    },
                    square: {
                      x: 827,
                      y: 0,
                      width: 1373,
                      height: 1374,
                    },
                    full: {
                      width: 2200,
                      height: 1465,
                    },
                  },
                  imgArray: [
                    {
                      imgName: 'image/2254305445.jpg',
                      version: '1540944424',
                      aspects: {
                        vertical: {
                          x: 958,
                          y: 8,
                          width: 1242,
                          height: 1457,
                        },
                        regular: {
                          x: 657,
                          y: 0,
                          width: 1543,
                          height: 1160,
                        },
                        belgrade: {
                          x: 0,
                          y: 0,
                          width: 2200,
                          height: 693,
                        },
                        headline: {
                          x: 851,
                          y: 0,
                          width: 1349,
                          height: 784,
                        },
                        landscape: {
                          x: 0,
                          y: 12,
                          width: 2200,
                          height: 950,
                        },
                        square: {
                          x: 827,
                          y: 0,
                          width: 1373,
                          height: 1374,
                        },
                        full: {
                          width: 2200,
                          height: 1465,
                        },
                      },
                    },
                  ],
                  imageType: 'image',
                  inputTemplate: 'com.tm.Image',
                  contentId: '1.6611169',
                  contentName: 'יונה יהב, היום',
                  kind: 'image',
                },
              },
            ],
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders YouTube correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <Boxy
          list={{
            view: 'Boxy',
            loadPriority: 'ssr',
            isLazyloadImages: true,
            hasPagination: false,
            items: [
              {
                path: '/1.6437284',
                kind: 'teaser',
                representedContent: '1.6437284',
                contentId: '7.7829316',
                media: {
                  content: 'ZUKR62v1JpI',
                  embedType: 'video',
                  settings: {
                    controls: '1',
                    related: '1',
                    loop: '0',
                    videoImage: '//img.youtube.com/vi/ZUKR62v1JpI/0.jpg',
                    logo: '1',
                    autoplay: false,
                    startAt: 0,
                    asGif: '0',
                  },
                  inputTemplate: 'com.polobase.YouTubeEmbed',
                  contentId: '1.6653801',
                  contentName: 'תיעוד פגיעת הטיל באוטובוס',
                  kind: 'embed',
                },
                title: 'עמוד באדמה',
                titleMobile: 'עמוד באדמה',
                inputTemplate: 'com.tm.TeaserData',
                commentsCounts: 38,
              },
            ],
            inputTemplate: 'com.tm.element.List',
            contentId: '7.7829315',
            contentName: "קיקר ענק הומפייג' ריאקט",
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders facebook correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <Boxy
          list={{
            title: 'כותרת רשימה',
            items: [
              {
                title: 'test facebook embed',
                titleMobile: 'test facebook',
                path: 'http://pre.haaretz.co.il/news/local/1.6611159',
                media: {
                  content: 'https://www.facebook.com/haaretz/posts/10155626716202520',
                  caption: 'hkj',
                  credit: 'hjk',
                  embedType: 'post',
                  elementType: 'embedElement',
                  settings: {
                    showText: 'false',
                    width: '0',
                    height: '0',
                  },
                  inputTemplate: 'com.polobase.FacebookEmbed',
                  contentId: '7.4695',
                  contentName: 'Post',
                  kind: 'embed',
                },
              },
            ],
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
