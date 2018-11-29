import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import ListSideBar from '../ListSideBar';

describe('<ListSideBar>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<ListSideBar />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title prop', () => {
      const { component, styles, } = felaSnapshotter(<ListSideBar title="test title" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar miscStyles={{ backgroundColor: 'red', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title and  extra links prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
            },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title and  commercialLink prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar
          title="test title"
          commercialLink={{
            text: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
            href: 'https://www.haaretz.co.il/1.1111111111',
            contentId: '1.1111111111',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title, extraLinks and  commercialLink prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
            },
          ]}
          commercialLink={{
            text: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
            href: 'https://www.haaretz.co.il/1.1111111111',
            contentId: '1.1111111111',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('renders correctly with title, extraLinks, commercialLink and marketingTools prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
            },
          ]}
          commercialLink={{
            text: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
            href: 'https://www.haaretz.co.il/1.1111111111',
            contentId: '1.1111111111',
          }}
          marketingTool={{
            title: 'כל התכנים בכל מכשיר',
            subTitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
            href: 'https://www.haaretz.co.il/1.2222222222',
            buttonText: 'לרכישה',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title, extraLinks and marketingTools prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListSideBar
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
            },
          ]}
          marketingTool={{
            title: 'כל התכנים בכל מכשיר',
            subTitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
            href: 'https://www.haaretz.co.il/1.2222222222',
            buttonText: 'לרכישה',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
