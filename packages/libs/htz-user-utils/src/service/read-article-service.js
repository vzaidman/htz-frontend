// @flow
/* global localStorage */
import { setCookie, } from '../util/cookie-utils';

type RaData = {
  month: number,
  uniqueArticles: Array<string>,
};

const localStorageKey = 'raData';


function getThisMonthData(thisMonth: number): ?RaData {
  const raValue = localStorage.getItem(localStorageKey);
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

function getThisMonth(): number {
  return (new Date().getMonth()) + 1;
}

function uniq<T>(arr: Array<T>): Array<T> {
  return [ ...new Set(arr), ];
}


function update(articleId: string): null {
  const thisMonth = getThisMonth(); // (0 - 11) =>  (1 - 12)
  try {
    const raData = getThisMonthData(thisMonth) || createRaData(thisMonth);
    raData.uniqueArticles = uniq([ ...raData.uniqueArticles, articleId, ]);
    localStorage.setItem(localStorageKey, JSON.stringify(raData));
    setCookie('ra', raData.uniqueArticles.length);
  }
  catch (error) {
    return null;
  }
  return null;
}


function getArticleCount(): ?number {
  const defaultValue = null;
  try {
    const data = getThisMonthData(getThisMonth());
    return data
      ? data.uniqueArticles.length
      : defaultValue;
  }
  catch (error) {
    return defaultValue;
  }
}


export default {
  update,
  getArticleCount,
};
