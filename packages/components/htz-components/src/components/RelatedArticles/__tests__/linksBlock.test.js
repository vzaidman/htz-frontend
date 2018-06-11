import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
// import LinksBlock from '../LinksBlock';

it('series articles ', () => {
  const snapshot = felaSnapshotter(
    <div>update me</div>
    // <LinksBlock
    //   elementType="LinksBlock"
    //   seriesTitle="50 שנה לששת הימים"
    //   articlePositionInTheSeries="2"
    //   usePagination="true"
    //   itemsPerPage="3"
    //   articles={[
    //     {
    //       url: 'http://eran.haaretz.co.il/1.6614',
    //       positionInSeries: '1',
    //       inputTemplate: 'com.htz.StandardArticle',
    //       contentId: '1.6614',
    //       contentName: 'ukjhkj',
    //       authors: [
    //         {
    //           showInNewsLetterAlerts: false,
    //           displayAuthorPage: false,
    //           inputTemplate: 'com.tm.Author',
    //           contentId: '1.1925',
    //           contentName: 'אורנה פילץ ',
    //         },
    //         {
    //           email: 'kazmit@netvision.net.il',
    //           showInNewsLetterAlerts: false,
    //           displayAuthorPage: false,
    //           inputTemplate: 'com.tm.Author',
    //           contentId: '1.1967',
    //           contentName: 'שהם סמיט',
    //         },
    //       ],
    //     },
    //     {
    //       url: 'http://eran.haaretz.co.il/news/world/LIVE-1.2597',
    //       positionInSeries: '2',
    //       inputTemplate: 'com.htz.StandardArticle',
    //       contentId: '1.2597',
    //       contentName:
    //         'ראש ממשלת צרפת: נרקמות מזימות נוספות לפיגועים במדינה וברחבי אירופה',
    //       authors: [
    //         'אורנה פילץ',
    //         {
    //           email: 'kazmit@netvision.net.il',
    //           showInNewsLetterAlerts: false,
    //           displayAuthorPage: false,
    //           inputTemplate: 'com.tm.Author',
    //           contentId: '1.1967',
    //           contentName: 'שהם סמיט',
    //         },
    //       ],
    //     },
    //     {
    //       url: 'http://eran.haaretz.co.il/news/education/.premium-1.5662',
    //       positionInSeries: '3',
    //       inputTemplate: 'com.htz.StandardArticle',
    //       contentId: '1.5662',
    //       contentName: 'סופו של מקדש השמחה משנות התשעים - "אלנבי 58"',
    //       authors: [
    //         {
    //           email: 'kazmit@netvision.net.il',
    //           showInNewsLetterAlerts: false,
    //           displayAuthorPage: false,
    //           inputTemplate: 'com.tm.Author',
    //           contentId: '1.1967',
    //           contentName: 'שהם סמיט',
    //         },
    //       ],
    //     },
    //     {
    //       url: 'http://eran.themarker.com:8080/1.6636',
    //       positionInSeries: '4',
    //       inputTemplate: 'com.tm.StandardArticle',
    //       contentId: '1.6636',
    //       contentName: 'aaaa',
    //       authors: [ 'אורנה פילץ', 'שהם סמיט', ],
    //     },
    //     {
    //       url: 'http://eran.haaretz.co.il/1.6643',
    //       positionInSeries: '5',
    //       inputTemplate: 'com.htz.StandardArticle',
    //       contentId: '1.6643',
    //       contentName: 'embeds',
    //       authors: [ 'שהם סמיט', ],
    //     },
    //   ]}
    // />
  );
  expect(snapshot).toMatchSnapshot();
});
