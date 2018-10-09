/* global mockConsole */
import React from 'react';
import ReadingHistoryProvider from './ReadingHistoryProvider';
import { felaMount, } from '../../test-helpers/felaEnzymeRenderers';


describe('ReadingHistoryProvider', () => {
  it('should provide null when the readingHistory is not in the localStorage', () => {
    global.localStorage = {
      getItem: () => null,
    };
    felaMount(
      <ReadingHistoryProvider>
        {
          readingHistory => {
            expect(readingHistory).toEqual(null);
            return null;
          }
        }
      </ReadingHistoryProvider>
    );
  });

  it('should provide null when the readingHistoty is not in json format', () => {
    mockConsole();
    global.localStorage = {
      getItem: () => 'this is not a json',
    };
    felaMount(
      <ReadingHistoryProvider>
        {
          readingHistory => {
            expect(readingHistory).toEqual(null);
            expect(console.warn).toHaveBeenCalledWith('unable to parse readingHistory from localStorage\n', expect.any(Error));
            return null;
          }
        }
      </ReadingHistoryProvider>
    );
  });

  it('should provide an empty list correctly', () => {
    global.localStorage = {
      getItem: () => '[]',
    };
    felaMount(
      <ReadingHistoryProvider>
        {
          readingHistory => {
            expect(readingHistory).toEqual([]);
            return null;
          }
        }
      </ReadingHistoryProvider>
    );
  });

  it('should provide a list with a single element correctly', () => {
    const articleId = 1.6530571;
    global.localStorage = {
      getItem: () => JSON.stringify([ articleId, ]),
    };
    felaMount(
      <ReadingHistoryProvider>
        {
          readingHistory => {
            expect(readingHistory).toHaveLength(1);
            expect(readingHistory).toContainEqual(articleId);
            return null;
          }
        }
      </ReadingHistoryProvider>
    );
  });

  it('should provide a list with a 10 elements correctly', () => {
    global.localStorage = {
      getItem: () => JSON.stringify([
        '1.6530500',
        '1.6530501',
        '1.6530502',
        '1.6530503',
        '1.6530504',
        '1.6530505',
        '1.6530506',
        '1.6530507',
        '1.6530508',
        '1.6530509',
      ]),
    };
    felaMount(
      <ReadingHistoryProvider>
        {
          readingHistory => {
            expect(readingHistory).toHaveLength(10);
            return null;
          }
        }
      </ReadingHistoryProvider>
    );
  });
});
