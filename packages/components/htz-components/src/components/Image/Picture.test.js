import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
// import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import Picture from './Picture';

describe('<Picture />', () => {
  it('Render picture element correctly', () => {
    const { component, styles, } = felaSnapshotter(
      <Picture
        defaultImg={{
          sourceOptions: {
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
            transforms: { width: '1045', aspect: 'full', },
          },
          data: {
            isAnimatedGif: false,
            imgArray: [
              { imgName: 'image/2092337187.jpg', version: '1516524320', },
            ],
            credit: 'this is title/credit',
            alt: 'this alt from data',
            contentId: '1.5748461',
            aspects: {
              full: { width: '1680', height: '1260', x: '0', y: '0', },
            },
          },
        }}
        sources={[
          {
            from: 's',
            until: 'l',
            misc: 'landscape',
            type: 'screen',
            sourceOptions: { transforms: { width: '1045', aspect: 'full', }, },
            data: {
              isAnimatedGif: false,
              imgArray: [
                { imgName: 'image/2092337187.jpg', version: '1516524320', },
              ],
              credit: 'this is title/credit',
              alt: 'this alt from data',
              contentId: '1.5748461',
              aspects: {
                full: { width: '1680', height: '1260', x: '0', y: '0', },
              },
            },
          },
          {
            from: 'l',
            until: 'xl',
            misc: 'landscape',
            type: 'screen',
            mimeType: 'image/webp',
            sourceOptions: {
              sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
              transforms: [
                {
                  width: '145',
                  height: '100',
                  aspect: 'landscape',
                  quality: 'auto:best',
                },
                { width: '645', height: '309', aspect: 'landscape', },
                { width: '945', aspect: 'landscape', },
              ],
            },
            data: {
              isAnimatedGif: false,
              imgArray: [
                { imgName: 'image/4030303706.gif', version: '1515097953', },
              ],
              credit: 'this is title/credit',
              caption: 'this caption from data',
              alt: 'this alt from data',
              aspects: {
                landscape: { width: '394', height: '200', x: '33', y: '0', },
                full: { width: '400', height: '400', x: '0', y: '0', },
              },
              contentId: '1.5599867',
            },
          },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
  it('Render picture with mixed aspects', () => {
    const { component, styles, } = felaSnapshotter(
      <Picture
        isPresentational
        bgcolor="black"
        defaultImg={{
          sourceOptions: {
            transforms: [
              {
                width: '745',
                aspect: 'headline',
                quality: 'auto:best',
              },
              { width: '945', aspect: 'headline', },
            ],
          },
          data: {
            isAnimatedGif: false,
            imgArray: [
              {
                imgName: 'image/2196292809.jpg',
                version: '1517913716',
              },
            ],
            alt: 'סיכות של קמפיים #METOO',
            credit: 'LUCY NICHOLSON/רויטרס',
            contentId: '1.5791650',
            aspects: {
              headline: {
                width: '2048',
                height: '1192',
                x: '0',
                y: '74',
              },
            },
          },
        }}
        sources={[
          {
            until: 'm',
            sourceOptions: {
              transforms: { width: '1045', aspect: 'landscape', },
            },
            data: {
              isAnimatedGif: false,
              imgArray: [
                {
                  imgName: 'image/2196292809.jpg',
                  version: '1517913716',
                },
              ],
              alt: 'סיכות של קמפיים #METOO',
              credit: 'LUCY NICHOLSON/רויטרס',
              contentId: '1.5791650',
              aspects: {
                landscape: {
                  width: '2048',
                  height: '883',
                  x: '0',
                  y: '70',
                },
              },
            },
          },
          {
            until: 'xl',
            mimeType: 'image/jpeg2000',
            sourceOptions: {
              transforms: [
                {
                  width: '745',
                  aspect: 'headline',
                  quality: 'auto:best',
                },
                { width: '945', aspect: 'headline', },
                { width: '1215', aspect: 'headline', },
              ],
            },
            data: {
              alt: "הכומר סת' קפר־דייל ורעייתו סטפני",
              credit: 'נתן דביר',
              title:
                "הכומר סת' קפר־דייל ורעייתו סטפני. העולם' צריך להיות מקום מקלט אחד גדול'",
              aspects: {
                regular: {
                  width: 1819,
                  height: 1365,
                  x: 96,
                  y: 0,
                },
                headline: {
                  width: 2033,
                  height: 1181,
                  x: 15,
                  y: 77,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/392731171.jpg',
                  version: '1518001678',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.5803155',
              contentName: 'Immigrants in Church',
            },
          },
          {
            from: 'xl',
            misc: 'landscape',
            mimeType: 'image/webp',
            sourceOptions: {
              transforms: [
                {
                  width: '345',
                  aspect: 'landscape',
                  quality: 'auto:best',
                },
                { width: '645', height: '309', aspect: 'landscape', },
                { width: '945', aspect: 'landscape', },
              ],
            },
            data: {
              alt: 'איור של נרי יושבת על שפת מזרקה ולצידה צפרדע',
              title: 'איתן אלוא',
              aspects: {
                landscape: {
                  width: 1325,
                  height: 569,
                  x: '0',
                  y: '90',
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/3063850623.gif',
                  version: '1518084212',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.5804697',
              contentName: 'איור נרי',
            },
          },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('Render picture sources with animated gifs correctly', () => {
    const { component, styles, } = felaSnapshotter(
      <Picture
        defaultImg={{
          sourceOptions: {
            transforms: [
              {
                width: '745',
                aspect: 'headline',
                quality: 'auto:best',
              },
              { width: '945', aspect: 'headline', },
            ],
          },
          data: {
            isAnimatedGif: false,
            imgArray: [
              {
                imgName: 'image/2196292809.jpg',
                version: '1517913716',
              },
            ],
            alt: 'סיכות של קמפיים #METOO',
            credit: 'LUCY NICHOLSON/רויטרס',
            contentId: '1.5791650',
            aspects: {
              headline: {
                width: '2048',
                height: '1192',
                x: '0',
                y: '74',
              },
            },
          },
        }}
        sources={[
          {
            until: 'm',
            sourceOptions: {
              transforms: { width: '1045', aspect: 'landscape', },
            },
            data: {
              isAnimatedGif: true,
              imgArray: [
                {
                  imgName: 'image/2196292809.gif',
                  version: '1517913716',
                },
              ],
              alt: 'סיכות של קמפיים #METOO',
              credit: 'LUCY NICHOLSON/רויטרס',
              contentId: '1.5791650',
              aspects: {
                landscape: {
                  width: '2048',
                  height: '883',
                  x: '0',
                  y: '70',
                },
              },
            },
          },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });
});
