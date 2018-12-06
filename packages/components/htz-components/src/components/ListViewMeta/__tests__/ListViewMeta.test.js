import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import ListViewMeta from '../ListViewMeta';

describe('<ListViewMeta>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<ListViewMeta />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title prop', () => {
      const { component, styles, } = felaSnapshotter(<ListViewMeta title="test title" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta miscStyles={{ backgroundColor: 'red', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title and  extra links prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
              linkText: 'קצרי רוח',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
              linkText: 'קצרי רוח',
            },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title and  commercialLinks prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta
          title="test title"
          commercialLinks={[
            {
              contentId: '123331412415235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
              toolTip: 'afafs',
            },
            {
              contentId: '123sdfg235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'sdgsdgsdgsdgאטרון אורנה פורת',
              toolTip: 'afafs',
            },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title, extraLinks and  commercialLink prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
              linkText: 'קצרי רוח',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
              linkText: 'קצרי רוח',
            },
          ]}
          commercialLinks={[
            {
              contentId: '123331412415235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
              toolTip: 'afafs',
            },
            {
              contentId: '123sdfg235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'sdgsdgsdgsdgאטרון אורנה פורת',
              toolTip: 'afafs',
            },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('renders correctly with title, extraLinks, commercialLinks and marketingTeaser prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
              linkText: 'קצרי רוח',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
              linkText: 'קצרי רוח',
            },
          ]}
          commercialLinks={[
            {
              contentId: '123331412415235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'הצגות ילדים בחסות תיאטרון אורנה פורת',
              toolTip: 'afafs',
            },
            {
              contentId: '123sdfg235235',
              contentName: 'dsgsdg',
              href: 'https://www.haaretz.co.il/1.1111111111',
              inputTemplate: 'dummy',
              linkText: 'sdgsdgsdgsdgאטרון אורנה פורת',
              toolTip: 'afafs',
            },
          ]}
          marketingTeaser={{
            title: 'כל התכנים בכל מכשיר',
            subtitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
            href: 'https://www.haaretz.co.il/1.2222222222',
            cta: 'לרכישה',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with title, extraLinks and marketingTeaser prop', () => {
      const { component, styles, } = felaSnapshotter(
        <ListViewMeta
          title="test title"
          extraLinks={[
            {
              href: '2.7666',
              toolTip: 'קצרי רוח',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2790808',
              contentName: 'קצרי רוח',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.2490',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2497760',
              contentName: 'טבלת המבקרים',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.470',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2487028',
              contentName: 'אופנה',
              linkText: 'קצרי רוח',
            },
            {
              href: '1.628',
              inputTemplate: 'com.tm.Link',
              contentId: '1.2489096',
              contentName: 'בן שלו',
              linkText: 'קצרי רוח',
            },
            {
              href: '2.8286',
              inputTemplate: 'com.tm.Link',
              contentId: '1.3857559',
              contentName: 'סודוקו',
              linkText: 'קצרי רוח',
            },
          ]}
          marketingTeaser={{
            title: 'כל התכנים בכל מכשיר',
            subtitle: 'הארץ בדיגיטל החל מ-4.90 ₪ בחודש הראשון',
            href: 'https://www.haaretz.co.il/1.2222222222',
            cta: 'לרכישה',
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
