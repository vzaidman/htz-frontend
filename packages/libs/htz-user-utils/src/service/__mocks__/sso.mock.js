export const loginSuccessResponse = 'null(\'success\',\'{"0":"https://devsso.themarker.com/sso/sso/setDomainCookie?userId=7726894474&password=3dbe00a167653a1aaee01d93e77e730e&ticketId=3839373836323134393235353239343034373937&site=80&returnType=image","1":"https://devsso.mouse.co.il/sso/sso/setDomainCookie?userId=7726894474&password=3dbe00a167653a1aaee01d93e77e730e&ticketId=3839373836323134393235353239343034373937&site=80&returnType=image","2":"https://devsso.haaretz.co.il/sso/sso/setDomainCookie?userId=7726894474&password=3dbe00a167653a1aaee01d93e77e730e&ticketId=3839373836323134393235353239343034373937&site=80&returnType=image"}\')';
export const loginFailureResponse = "null('error','nothing','הדואר האלקטרוני או הסיסמה שהוזנו אינם קיימים במערכת')";
export const logoutFailureResponse = "null('error','nothing','המערכת נתקלה בבעיה בתהליך, נסה שנית מאוחר יותר')";
export const registerFailureResponse = "null('error','nothing','כתובת הדואר האלקטרוני הזו קיימת במערכת . אנא נסו כתובת אחרת')";
export const loginFailureServiceData = {
  data: null,
  message: 'הדואר האלקטרוני או הסיסמה שהוזנו אינם קיימים במערכת',
  status: 'error',
};
export const registerFailureServiceData = {
  data: null,
  message: 'כתובת הדואר האלקטרוני הזו קיימת במערכת . אנא נסו כתובת אחרת',
  status: 'error',
};
export const logoutFailureServiceData = {
  data: null,
  message: 'המערכת נתקלה בבעיה בתהליך, נסה שנית מאוחר יותר',
  status: 'error',
};
export const logoutSuccessResponse = 'null(\'success\',\'{"0":"https://devsso.themarker.com/sso/sso/clearDomainCookie?userId=7726894474&password=d41d8cd98f00b204e9800998ecf8427e&ticketId=null&site=10&returnType=image","1":"https://devsso.mouse.co.il/sso/sso/clearDomainCookie?userId=7726894474&password=d41d8cd98f00b204e9800998ecf8427e&ticketId=null&site=10&returnType=image","2":"https://devsso.haaretz.co.il/sso/sso/clearDomainCookie?userId=7726894474&password=d41d8cd98f00b204e9800998ecf8427e&ticketId=null&site=10&returnType=image"}\')';
export const imageSuccessResponse = 'https://devsso.haaretz.co.il/sso/sso/setDomainCookie?userId=7726894474&password=3dbe00a167653a1aaee01d93e77e730e&ticketId=3839373836323134393235353239343034373937&site=80&returnType=image';
export const abuseClearedResponse = '{"result":"0","msg":"Not abuser"}';
export const abuseDetectionResponse = '{"result":"1","msg":"null"}';

const login = (username, password) => new Promise((resolve, reject) => {
  if (username === 'orentest@haaretz.com' && password === 'aaaaaaaa') {
    resolve(loginSuccessResponse);
  }
  else {
    reject();
  }
});

export default {
  login,
  loginSuccessResponse,
  loginFailureResponse,
  loginFailureServiceData,
  logoutSuccessResponse,
  imageSuccessResponse,
  abuseClearedResponse,
  abuseDetectionResponse,
};
