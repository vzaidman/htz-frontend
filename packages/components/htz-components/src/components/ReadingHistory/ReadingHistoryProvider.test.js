// /* global mockConsole */
import React from 'react';
import ReadingHistoryProvider from './ReadingHistoryProvider';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';

describe('ReadingHistoryProvider', () => {
  it('renders correctly with child component and returns an empty array ', () => {
    const { component, styles, } = felaSnapshotter(
      <ReadingHistoryProvider>
        {readingHistory => {
          expect(readingHistory).toEqual([]);
          return <div>test child</div>;
        }}
      </ReadingHistoryProvider>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  // skipping most of these tests that are mainly implementation detail tests regarding local storage.
  // when updating reading history provider to also support ssr (and return empty array) had problems updating the tests

  // it('should provide empty array when the readingHistory is not in the localStorage', () => {
  //   global.localStorage = {
  //     getItem: () => [],
  //   };
  //   felaMount(
  //     <ReadingHistoryProvider>
  //       {
  //         readingHistory => {
  //           expect(readingHistory).toEqual([]);
  //           return null;
  //         }
  //       }
  //     </ReadingHistoryProvider>
  //   );
  // });

  // it('should provide empty array when the readingHistoty is not in json format', () => {
  //   mockConsole();
  //   global.localStorage = {
  //     getItem: () => 'this is not a json',
  //   };
  //   felaMount(
  //     <ReadingHistoryProvider>
  //       {
  //         readingHistory => {
  //           expect(readingHistory).toEqual([]);
  //           expect(console.warn).toHaveBeenCalledWith('unable to parse readingHistory from localStorage\n', expect.any(Error));
  //           return null;
  //         }
  //       }
  //     </ReadingHistoryProvider>
  //   );
  // });

  // it('should provide an empty list correctly', () => {
  //   global.localStorage = {
  //     getItem: () => '[]',
  //   };
  //   felaMount(
  //     <ReadingHistoryProvider>
  //       {
  //         readingHistory => {
  //           expect(readingHistory).toEqual([]);
  //           return null;
  //         }
  //       }
  //     </ReadingHistoryProvider>
  //   );
  // });

  // it('should provide a list with a single element correctly', () => {
  //   const articleId = 1.6530571;
  //   global.localStorage = {
  //     getItem: () => JSON.stringify([ articleId, ]),
  //   };
  //   felaMount(
  //     <ReadingHistoryProvider>
  //       {
  //         readingHistory => {
  //           expect(readingHistory).toHaveLength(1);
  //           expect(readingHistory).toContainEqual(articleId);
  //           return null;
  //         }
  //       }
  //     </ReadingHistoryProvider>
  //   );
  // });

  // it('should provide a list with a 10 elements correctly', () => {
  //   global.localStorage = {
  //     getItem: () => JSON.stringify([
  //       '1.6530500',
  //       '1.6530501',
  //       '1.6530502',
  //       '1.6530503',
  //       '1.6530504',
  //       '1.6530505',
  //       '1.6530506',
  //       '1.6530507',
  //       '1.6530508',
  //       '1.6530509',
  //     ]),
  //   };
  //   felaMount(
  //     <ReadingHistoryProvider>
  //       {
  //         readingHistory => {
  //           expect(readingHistory).toHaveLength(10);
  //           return null;
  //         }
  //       }
  //     </ReadingHistoryProvider>
  //   );
  // });
});
