/* --------------------------------- */
/* Styled Components for Login Pages */
/* --------------------------------- */

// Imports ---------------------------------------------
import { createComponent, } from 'react-fela';

// Functions -------------------------------------------
const getColors = (host) => {
  return {
    main: host == 'haaretz.co.il' ? "#0b7eb5" : "",
    secondry: host == 'haaretz.co.il' ? "#006B96" : "",
    links: host == 'haaretz.co.il' ? "#0895c3" : "",
  }
}

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
      width: '414px',
      maxWidth: '95%',
      margin: '0 auto',
      '& label': {
        height: '35px',
        fontSize: '2rem',
        marginTop: '2rem !important',
      },
      '& h5': {
        fontSize: '2.3rem',
      },

      '@media (max-width: 768px)': {
        '& label': {
          fontSize: '2.7rem',
        },
        '& h5': {
          width: '70%',
          fontSize: '3rem',
        },
      },
    }),

    topLinks: ({main,}) => () => ({
      display: 'flex',
      margin: '0 auto 4rem auto',
      border: `solid 1px ${main}`,
      '>span': {
        flexGrow: '1',
        textAlign: 'center',
        color: main,
        fontSize: '1.75rem',
        fontWeight: 'bold',
        '>input': {
          display: 'none',
        },
        '>label': {
          display: 'block',
          marginTop: '0 !important',
          lineHeight: '37px',
        },
        '>a': {
          display: 'block',
          marginTop: '0 !important',
          lineHeight: '37px',
        },
        '&.on': {
          backgroundColor: '#0b7eb5',
          color: '#fff',
          '>a': {
            cursor: 'default',
          },
        },
      },
    }),

    itemCenterer: () => ({
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      clear: 'both',
      '> h5, button': {
        margin: '25px 0',
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
      margin: '0 auto 49px auto',
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
        height: '150px',
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
    inputLinkButton: ({main,}) => () => ({
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
      margin: '0 auto',
      width: '300px',
      maxWidth: '90%',
      textAlign: 'center',
      fontSize: '2rem',
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
    termsStyle: ({links,}) => () => ({
      lineHeight: '17px',
      '& a': {
        color: `${links} !important`,
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      '& div': {
        fontSize: '2.3rem',
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
      backgroundColor: "#ffffff",
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
const LoginContentStyles = (host) => {
  const colors = getColors(host);
  return {
    PageWrapper: createComponent(Styles.Content.loginPageWrapper),
    ContentWrapper: createComponent(Styles.Content.loginContentWrapper),
    FormWrapper: createComponent(Styles.Content.formWrapper),
    TopLinks: createComponent(Styles.Content.topLinks(colors)),
    ItemCenterer: createComponent(Styles.Content.itemCenterer),
  }
};

const LoginGeneralLayoutStyles = (host) => {
  const colors = getColors(host);
  return {
    HeaderWrapper: createComponent(Styles.GeneralLayout.loginHeaderWrapper),
    FooterWrapper: createComponent(Styles.GeneralLayout.footerWrapper),
    FooterContentHolder: createComponent(Styles.GeneralLayout.footerContentHolder),
  }
};

const LoginMiscLayoutStyles = (host) => {
  const colors = getColors(host);
  return {
    InputLinkButton: createComponent(Styles.MiscLayout.inputLinkButton),
    TextBox: createComponent(Styles.MiscLayout.textBoxStyle),
    ErrorBox: createComponent(Styles.MiscLayout.errorBoxStyle),
    TermsWrapper: createComponent(Styles.MiscLayout.termsStyle(colors)),
  }
};

const LoginDialogBox = (host) => {
  const colors = getColors(host);
  return {
    DialogWrapper: createComponent(Styles.Dialog.dialogWrapperStyle),
    DialogContent: createComponent(Styles.Dialog.dialogContentStyle),
    //DialogContentCreator: (bgColor) => createComponent(Styles.Dialog.dialogContentStyle(bgColor)),
    CloseButton: createComponent(Styles.Dialog.closeButtonStyle),
  }
};

// Export ----------------------------------------------
export { LoginContentStyles, LoginGeneralLayoutStyles, LoginMiscLayoutStyles, LoginDialogBox, };
