import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import Image from './Image';

const mockData = {
  isAnimatedGif: false,
  imgArray: [
    {
      imgName: 'image/922278056.jpg',
      version: '1514197183',
    },
  ],
  credit: 'this is credit',
  alt: 'this alt from data',
  contentId: '1.4921360',
  aspects: {
    landscape: { width: '2220', height: '800', x: '10', y: '0', },
    full: { width: '500', height: '400', x: '0', y: '0', },
  },
};

describe('<Image />', () => {
  describe('DOM element', () => {
    it('Render correctly when essential props are passed ', () => {
      const { component, styles, } = felaSnapshotter(
        <Image
          data={mockData}
          imgOptions={{ transforms: { width: '1045', aspect: 'full', }, }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('Render img correctly when all props are passed, lazyLoad=false ', () => {
      const { component, styles, } = felaSnapshotter(
        <Image
          data={mockData}
          imgOptions={{
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
            transforms: [
              {
                width: '145',
                height: '100',
                aspect: 'landscape',
                quality: 'auto:best',
              },
              { width: '245', height: '159', aspect: 'landscape', },
              { width: '445', aspect: 'landscape', },
            ],
          }}
          lazyLoad={false}
          attrs={{ 'data-test': 'test', }}
          isPresentational
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('Render picture correctly when all props are passed, lazyLoad=false ', () => {
      const { component, styles, } = felaSnapshotter(
        <Image
          data={{
            isAnimatedGif: true,
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
          }}
          imgOptions={{
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 240px',
            transforms: [
              {
                width: '145',
                height: '100',
                aspect: 'landscape',
                quality: 'auto:best',
              },
              { width: '245', height: '159', aspect: 'landscape', },
              { width: '445', aspect: 'landscape', },
            ],
          }}
          isPresentational
          attrs={{ border: '15px solid', }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('Render picture tag when "isAnimatedGif" field is true value', () => {
      const wrapper = felaMount(
        <Image
          data={{
            isAnimatedGif: true,
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
          }}
          imgOptions={{
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
            transforms: [
              {
                width: '145',
                height: '100',
                aspect: 'landscape',
                quality: 'auto:best',
              },
              { width: '245', height: '159', aspect: 'landscape', },
              { width: '445', aspect: 'landscape', },
            ],
          }}
        />
      );
      expect(wrapper.find('picture').length).toBe(1);
      expect(wrapper.find('source').length).toBe(1);
      expect(wrapper.find('img').length).toBe(1);
    });
    it('Has attributes of role="presentation" and aria-hidden="true" when isPresentational prop is passed', () => {
      const wrapper = felaMount(
        <Image
          data={mockData}
          imgOptions={{
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
            transforms: [
              {
                width: '145',
                height: '100',
                aspect: 'landscape',
                quality: 'auto:best',
              },
              { width: '245', height: '159', aspect: 'landscape', },
              { width: '445', aspect: 'landscape', },
            ],
          }}
          isPresentational
        />
      );
      expect(
        wrapper.find('img').find({ role: 'presentation', 'aria-hidden': true, })
          .length
      ).toBe(1);
    });

    it('Prints warning on console when both "isPresentational" and "attr" has keys of "role" or "aria-hidden" ', () => {
      const wrapper = felaShallow(
        <Image
          data={mockData}
          imgOptions={{
            sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
            transforms: [
              {
                width: '145',
                height: '100',
                aspect: 'landscape',
                quality: 'auto:best',
              },
              { width: '245', height: '159', aspect: 'landscape', },
              { width: '445', aspect: 'landscape', },
            ],
          }}
          attrs={{ 'aria-hidden': true, role: 'group', }}
          isPresentational
        />
      );
      console.warn = jest.fn();
      global.console = { warn: jest.fn(), };
    });
  });
});
