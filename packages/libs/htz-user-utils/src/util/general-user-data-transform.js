const mobileNumberParser = mobileNum => {
  if (typeof mobileNum === 'undefined' || mobileNum === null) {
    return { prefix: '', suffix: '', };
  }
  let mobilePrefix;
  let mobileSuffix;

  if (mobileNum.startsWith('+')) {
    mobilePrefix = '00';
    mobileSuffix = mobileNum.substring(1);
  }
  else {
    mobilePrefix = mobileNum.substring(0, 3);
    mobileSuffix = mobileNum.substring(3);
  }
  return { prefix: mobilePrefix, suffix: mobileSuffix, };
};

export { mobileNumberParser, };
