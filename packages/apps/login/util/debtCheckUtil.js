import { saveUserData, getUserData, } from '../pages/queryutil/userDetailsOperations';

const checkAndGetProducts = (dataObj = '') => (dataObj.data && dataObj.data.user && dataObj.data.user.products
  ? dataObj.data.user.products
  : null);

const getAndSaveDebtParams = client => {
  if (typeof window !== undefined) {
    const url = new URL(window.location.href);
    const debtParam = url.searchParams.get('dbtusr');
    saveUserData(client)({
      userData: { hasDebt: !!debtParam, __typename: 'SsoUser', },
    });
    return debtParam || null;
  }
};

const checkUserDebt = client => {
  const debt = getUserData(client).hasDebt;
  saveUserData(client)({
    userData: { hasDebt: false, __typename: 'SsoUser', },
  });
  return debt;
};

const getDebtReferrer = userProduct => {
  const products = checkAndGetProducts(userProduct);
  return products
    ? `https://promotions.haaretz.co.il/payment-change?productId=${products[0].prodNum}`
    : false;
};

export { getDebtReferrer, getAndSaveDebtParams, checkUserDebt, };
