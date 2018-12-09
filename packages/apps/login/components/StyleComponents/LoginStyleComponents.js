/* --------------------------------- */
/* Styled Components for Login Pages */
/* --------------------------------- */

// Imports ---------------------------------------------
import { createComponent, } from 'react-fela';

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

    formWrapper: () => ({
      width: '500px',
      maxWidth: '95%',
      margin: '0 auto',
      '&>form>div': {
        paddingBottom: '1rem',
      },
      '& label': {
        fontSize: '2rem',
        marginTop: '2rem !important',
      },
      '& input[type="email"]': {
        direction: 'ltr',
        textAlign: 'right',
      },
      '& input[type="tel"]': {
        direction: 'ltr',
        textAlign: 'right',
      },
      '& h5': {
        fontSize: '2.3rem',
      },

      '@media (max-width: 768px)': {
        maxWidth: '85%',
        '& label': {
          fontSize: '2.7rem',
        },
        '& h5': {
          width: '100%',
          fontSize: '3rem',
        },
      },
    }),

    itemCenterer: () => ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      clear: 'both',
      paddingBottom: '0 !important',
      '> button': {
        margin: '25px 0',
        textAlign: 'center',
      },
      '> h5': {
        margin: '20px 0',
        textAlign: 'center',
      },
      '> h4': {
        textAlign: 'center',
        fontSize: '2.3rem',
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
      margin: '0 auto 17px auto',
      padding: '23px 0 0 0',
    }),

    footerWrapper: () => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '315px',
      marginTop: '55px',
      backgroundColor: '#00537a',
      color: '#ffffff',

      '@media (max-width: 768px)': {
        display: 'none',
      },
    }),
    footerContentHolder: () => ({
      display: 'flex',
      width: '1263px',
      flexWrap: 'wrap',

      '> div': {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '14px 0',
        '&:first-child': {
          borderBottom: '1px solid #fff',
        },
      },
    }),
  },

  MiscLayout: {
    inputLinkButton: () => ({
      fontSize: '16px',
      color: '#0b7eb5',

      '> button': {
        float: 'left',
        marginTop: '-20px',
        cursor: 'pointer',
        fontSize: '2rem',
        fontFamily: 'Open Sans Hebrew,"Helvetica Neue",Helvetica,Arial,sans-serif',
      },
    }),
    textBoxStyle: () => ({
      margin: '20px auto 0 auto',
      width: '300px',
      maxWidth: '90%',
      textAlign: 'center',
      fontSize: '2.3rem',
      lineHeight: '3.5rem',
      '>h5': {
        margin: '0 auto',
      },
    }),
    errorBoxStyle: () => ({
      maxWidth: '90%',
      marginTop: '2rem',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: '#a8001c',
      '&.hidden': {
        display: 'none',
      },
    }),
    termsStyle: () => ({
      lineHeight: '17px',
      '& a': {
        color: '#0895c3 !important',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      '& div': {
        fontSize: '1.8rem',
        '@media (max-width: 768px)': {
          fontSize: '2.2rem',
        },
      },
    }),
    mobileFooterSpacerStyle: () => ({
      display: 'none',
      '@media (max-width: 768px)': {
        display: 'block',
        height: '35rem',
      },
    }),
  },

  Dialog: {
    dialogWrapperStyle: () => ({
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: '100',
    }),
    dialogContentStyle: () => ({
      position: 'relative',
      width: '450px',
      maxWidth: '90%',
      margin: '0 auto',
      padding: '30px 15px 20px 15px',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      border: 'solid 1px #acd2ed',
    }),
    closeButtonStyle: () => ({
      position: 'absolute',
      top: '7px',
      left: '7px',
      width: '14px',
      height: '14px',
      '> button': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: '0',
        lineHeight: '14px',
        left: '0',
        top: '0',
        backgroundImage: 'url(../../static/images/close.png)',
      },
    }),
  },
};

// Components ------------------------------------------
const LoginContentStyles = {
  PageWrapper: createComponent(Styles.Content.loginPageWrapper),
  ContentWrapper: createComponent(Styles.Content.loginContentWrapper),
  FormWrapper: createComponent(Styles.Content.formWrapper),
  ItemCenterer: createComponent(Styles.Content.itemCenterer),
};

const LoginGeneralLayoutStyles = {
  HeaderWrapper: createComponent(Styles.GeneralLayout.loginHeaderWrapper),
  FooterWrapper: createComponent(Styles.GeneralLayout.footerWrapper),
  FooterContentHolder: createComponent(Styles.GeneralLayout.footerContentHolder),
};

const LoginMiscLayoutStyles = {
  InputLinkButton: createComponent(Styles.MiscLayout.inputLinkButton),
  TextBox: createComponent(Styles.MiscLayout.textBoxStyle),
  ErrorBox: createComponent(Styles.MiscLayout.errorBoxStyle),
  TermsWrapper: createComponent(Styles.MiscLayout.termsStyle),
  MobileFooterSpacer: createComponent(Styles.MiscLayout.mobileFooterSpacerStyle),
};

const LoginDialogBox = {
  DialogWrapper: createComponent(Styles.Dialog.dialogWrapperStyle),
  DialogContent: createComponent(Styles.Dialog.dialogContentStyle),
  CloseButton: createComponent(Styles.Dialog.closeButtonStyle),
};

// Export ----------------------------------------------
export { LoginContentStyles, LoginGeneralLayoutStyles, LoginMiscLayoutStyles, LoginDialogBox, };
