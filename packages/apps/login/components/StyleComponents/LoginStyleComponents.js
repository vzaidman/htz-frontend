/* --------------------------------- */
/* Styled Components for Login Pages */
/* --------------------------------- */

// Imports ---------------------------------------------
import { createComponent, FelaTheme, } from 'react-fela';

// Styles ----------------------------------------------
const Styles = {
  Content: {
    loginPageWrapper: () => ({
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }),

    loginContentWrapper: () => ({
      flex: '1 0 auto',
    }),

    formHolder: () => ({
      width: '414px',
      maxWidth: '95%',
      margin: '0 auto',
    }),

    bottomLinks: () => ({
      margin: '35px 0 180px 0',
      '> a': {
        display: 'block',
        margin: '20px auto',
        fontSize: '14px',
        color: '#0b7eb5',
        textAlign: 'center',
        textDecoration: 'underline',
      },
    }),

    itemCenterer: () => ({
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      clear: 'both',
      '> h5, button': {
        margin: '25px 0',
        textAlign: 'center',
      },
    }),
  },

  GeneralLayout: {
    loginHeaderWrapper: () => ({
      display: 'flex',
      itemAlign: 'center',
      justifyContent: 'space-around',
      width: '1263px',
      maxWidth: '100%',
      margin: '0 auto 49px auto',
      padding: '23px 0 0 0',
    }),

    loginFooterWrapper: () => ({
      flexShrink: '0',
      width: '100%',
      height: '315px',
      backgroundColor: '#00537a',
      color: '#ffffff',

      '@media (max-width: 768px)': {
        height: '150px',
      },
    }),
  },

  MiscLayout: {
    inputLinkButton: () => ({
      fontSize: '16px',
      color: '#0b7eb5',

      '> span': {
        float: 'left',
        marginTop: '-20px',
        cursor: 'pointer',
      },
    }),
  },
};

// Components ------------------------------------------
const LoginContentStyles = {
  PageWrapper: createComponent(Styles.Content.loginPageWrapper),
  ContentWrapper: createComponent(Styles.Content.loginContentWrapper),
  FormWrapper: createComponent(Styles.Content.formHolder),
  BottomLinks: createComponent(Styles.Content.bottomLinks),
  ItemCenterer: createComponent(Styles.Content.itemCenterer),
};

const LoginGeneralLayoutStyles = {
  HeaderWrapper: createComponent(Styles.GeneralLayout.loginHeaderWrapper),
  FooterWrapper: createComponent(Styles.GeneralLayout.loginFooterWrapper),
};

const LoginMiscLayoutStyles = {
  InputLinkButton: createComponent(Styles.MiscLayout.inputLinkButton),
};

// Export ----------------------------------------------
export { LoginContentStyles, LoginGeneralLayoutStyles, LoginMiscLayoutStyles, };
