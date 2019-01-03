import React from 'react';
import MainBlock from './MainBlock.js';
import List from '../List/List';

export default function MainBlockForStyleguide() {
  return (
    <MainBlock
      List={List}
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
          id: 'haaretz.co.il.headline.box',
          audianceTarget: 'all',
          hideOnSite: false,
          inputTemplate: 'com.polobase.DfpBannerElement',
          contentId: '7.7832113',
          contentName: 'Haaretz.co.il.Headline.Box',
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
  );
}
