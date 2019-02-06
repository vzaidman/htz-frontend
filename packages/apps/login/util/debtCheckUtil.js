import { saveUserData, getUserData, } from '../pages/queryutil/userDetailsOperations';

const getDebtProd = (products) => {
  // returns the 1st product that has debt
  for(var i = 0; i < products.length; i++) {
    let prod = products[i];
    if(prod && prod.debtActive) {
      return prod.prodNum;
    }
  }
}

const checkAndGetProducts = (dataObj = '') => (dataObj.data && dataObj.data.user && dataObj.data.user.products
  ? getDebtProd(dataObj.data.user.products)
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
  // check for user debt on apollo
  const debt = getUserData(client).hasDebt;
  saveUserData(client)({
    userData: { hasDebt: false, __typename: 'SsoUser', },
  });
  return debt;
};

const getDebtReferrer = userProduct => {
  const debtProd = checkAndGetProducts(userProduct);
  return debtProd
    ? `https://promotions.haaretz.co.il/payment-change?productId=${debtProd}`
    : false;
};

export { getDebtReferrer, getAndSaveDebtParams, checkUserDebt, };
