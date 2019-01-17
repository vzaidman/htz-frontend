// @flow
/* global localStorage */
import { setCookie, } from '../util/cookie-utils';

type RaData = {
  month: number,
  uniqueArticles: Array<string>,
};


function getThisMonthData(raValue: ?string, thisMonth: number): ?RaData {
  if (raValue == null) {
    return null;
  }
  const raData = JSON.parse(raValue);
  if (raData.month !== thisMonth) {
    return null;
  }
  return raData;
}

function createRaData(thisMonth: number): RaData {
  return {
    month: thisMonth,
    uniqueArticles: [],
  };
}

function uniq<T>(arr: Array<T>): Array<T> {
  return [ ...new Set(arr), ];
}

const localStorageKey = 'raData';


function update(articleId: string): null {
  const thisMonth = (new Date().getMonth()) + 1; // (0 - 11) =>  (1 - 12)
  try {
    const raValue = localStorage.getItem(localStorageKey);
    const raData = getThisMonthData(raValue, thisMonth) || createRaData(thisMonth);
    raData.uniqueArticles = uniq([ ...raData.uniqueArticles, articleId, ]);
    localStorage.setItem(localStorageKey, JSON.stringify(raData));
    setCookie('ra', raData.uniqueArticles.length);
  }
  catch (error) {
    return null;
  }
  return null;
}


export default {
  update,
};
