/* global sessionStorage */
import Router from 'next/router';

export default () => {
  const productId = sessionStorage.getItem('userProduct');
  console.log('getting userProduct from sessionStorage: ', productId);

  if (productId) {
    Router.replace(`/promotions-page/thankYou?msg=thank_user&product=${productId}`);
  }
};
