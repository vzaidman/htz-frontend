import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import NavigationMenu from '../NavigationMenu';

it('Navigation Menu ', () => {
  const snapshot = felaSnapshotter(
    <NavigationMenu
      sections={[
        {
          name: 'חדשות',
          url: '/news',
          pages: [
            {
              name: 'בעולם',
              url: '/news/world',
            },
            {
              name: 'חינוך וחברה',
              url: '/news/world',
            },
            {
              name: 'מדיני ביטחוני',
              url: '/news/world',
            },
            {
              name: 'מדע וסביבה',
              url: '/news/world',
            },
            {
              name: 'מזר האוויר',
              url: '/news/world',
            },
            {
              name: 'בריאות',
              url: '/news/world',
            },
            {
              name: 'מקומי',
              url: '/news/world',
            },
            {
              name: 'משפט ופלילים',
              url: '/news/world',
            },
            {
              name: 'פוליטי',
              url: '/news/world',
            },
            {
              name: '50 ל-67',
              url: '/news/world',
            },
          ],
        },
        {
          name: 'דעות',
          url: '/opinions',
          pages: [
            {
              name: 'מאמר מערכת',
              url: '/news/world',
            },
            {
              name: 'מכתבים למערכת',
              url: '/news/world',
              pages: [
                {
                  name: 'בעולם',
                  url: '/news/world',
                },
                {
                  name: 'חינוך וחברה',
                  url: '/news/world',
                },
                {
                  name: 'מדיני ביטחוני',
                  url: '/news/world',
                },
                {
                  name: 'מדע וסביבה',
                  url: '/news/world',
                },
                {
                  name: 'מזר האוויר',
                  url: '/news/world',
                },
                {
                  name: 'בריאות',
                  url: '/news/world',
                },
                {
                  name: 'מקומי',
                  url: '/news/world',
                },
                {
                  name: 'משפט ופלילים',
                  url: '/news/world',
                },
                {
                  name: 'פוליטי',
                  url: '/news/world',
                },
                {
                  name: '50 ל-67',
                  url: '/news/world',
                },
              ],
            },
            {
              name: 'קריקטורה יומית',
              url: '/news/world',
            },
          ],
        },
        {
          name: 'ספרים',
          url: '/books',
          pages: [],
        },
        {
          name: 'סוף שבוע',
          url: '/weekend',
          pages: [
            {
              name: 'הקצה',
              url: '/news/world',
            },
            {
              name: 'סייד קשוע',
              url: '/news/world',
            },
            {
              name: 'ענייני פנים',
              url: '/news/world',
            },
            {
              name: '20 שאלות',
              url: '/news/world',
            },
            {
              name: 'טיסות נכנסות / טיסות יוצאות',
              url: '/news/world',
            },
            {
              name: 'המילה',
              url: '/news/world',
            },
          ],
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
