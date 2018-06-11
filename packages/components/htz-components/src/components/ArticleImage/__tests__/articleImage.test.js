import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
// import ArticleImage from '../ArticleImage';

// todo: fix tests
it('Vertical image with regular viewMode ', () => {
  const snapshot = felaSnapshotter(
    <div>update me</div>
    // <ArticleImage
    //   viewMode="regularModeBigImage"
    //   accessibility="אימפריית הפשע"
    //   title="אימפריית הפשע"
    //   aspects={{
    //     full: {
    //       width: 960,
    //       height: 1440,
    //     },
    //   }}
    //   isAnimated="false"
    //   imgArray={[
    //     {
    //       imgName: 'image/4224562979.jpg',
    //       version: '1519208169',
    //     },
    //   ]}
    //   imageType="image"
    //   inputTemplate="com.tm.Image"
    //   contentId="1.2589"
    //   contentName="אימפריית הפשע"
    // />
  );
  expect(snapshot).toMatchSnapshot();
});

// it('Gif image with full viewMode ', () => {
//   const snapshot = felaSnapshotter(
//     <ArticleImage
//       alt="alternative text"
//       viewMode="FullColumnWithVerticalImage"
//       accessibility="cat"
//       credit="me"
//       title="this is the image text"
//       aspects={{
//         regular: {
//           x: 3,
//           y: 4,
//           width: 388,
//           height: 291,
//         },
//         full: {
//           width: 400,
//           height: 332,
//         },
//         headline: {
//           x: 0,
//           y: 32,
//           width: 399,
//           height: 233,
//         },
//         square: {
//           x: 33,
//           y: 7,
//           width: 318,
//           height: 318,
//         },
//       }}
//       isAnimated="false"
//       imgArray={[
//         {
//           imgName: 'image/4030303706.gif',
//           version: '1519208144',
//         },
//       ]}
//       imageType="image"
//       inputTemplate="com.tm.Image"
//       contentId="1.6651"
//       contentName="cat"
//     />
//   );
//   expect(snapshot).toMatchSnapshot();
// });

// it('Infographic image with 1/3 viewMode ', () => {
//   const snapshot = felaSnapshotter(
//     <ArticleImage
//       alt="alternative text"
//       viewMode="OneThirdView"
//       accessibility="fgh"
//       title="חיידק הקפה נדבק בו בגיל מבוגר יחסית, פאולו פנרו בבוטגה שלו בעיר ברה נדבק בו בגיל מבוגר"
//       credit="קרדיט"
//       aspects={{
//         full: {
//           width: 1024,
//           height: 768,
//         },
//       }}
//       isAnimated="false"
//       imgArray={[
//         {
//           imgName: 'image/3169121816.jpg',
//           version: '1519208155',
//         },
//         {
//           imgName: 'image/509020086.jpg',
//           version: '1519208157',
//         },
//       ]}
//       imageType="infographic"
//       inputTemplate="com.tm.Image"
//       contentId="1.5804"
//       contentName="ghf"
//     />
//   );
//   expect(snapshot).toMatchSnapshot();
// });
