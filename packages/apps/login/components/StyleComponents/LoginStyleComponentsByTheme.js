/* --------------------------------- */
/* Styled Components for Login Pages */
/* --------------------------------- */

// Imports ---------------------------------------------
import { createComponent, } from 'react-fela';

// Functions -------------------------------------------
const getColors = host => ({
  main: host == 'themarker.com' ? '#008838' : '#0b7eb5',
  secondry: host == 'themarker.com' ? '#00c800' : '#006B96',
  light: host == 'themarker.com' ? '#00c800' : '#acd2ed',
  links: host == 'themarker.com' ? '#00c800' : '#0895c3',
});

// Styles ----------------------------------------------
const Styles = {
  Content: {
    topLinks: ({ main, }) => () => ({
      display: 'flex',
      width: '95%',
      margin: '0 auto 5rem auto',
      border: `solid 1px ${main}`,
      '@media (max-width: 768px)': {
        width: '85%',
        marginBottom: '5.5rem',
      },
      '>span': {
        flexGrow: '1',
        textAlign: 'center',
        color: main,
        fontWeight: 'bold',
        '>input': {
          display: 'none',
        },
        '>label': {
          display: 'block',
          marginTop: '0 !important',
          lineHeight: '4.5rem',
          fontSize: '1.75rem',
          '@media (max-width: 768px)': {
            fontSize: '2rem',
            lineHeight: '5.5rem',
          },
        },
        '>a': {
          display: 'block',
          marginTop: '0 !important',
          lineHeight: '1.75rem',
        },
        '&.on': {
          backgroundColor: main,
          color: '#fff',
          '>a': {
            cursor: 'default',
          },
        },
      },
    }),
  },

  MiscLayout: {
    inputLinkButton: ({ links, }) => () => ({
      fontSize: '16px',
      color: links,

      '> button': {
        float: 'left',
        marginTop: '-20px',
        cursor: 'pointer',
        fontSize: '2rem',
        fontFamily: 'Open Sans Hebrew,"Helvetica Neue",Helvetica,Arial,sans-serif',
      },
    }),
    termsStyle: ({ links, }) => () => ({
      lineHeight: '17px',
      '& a': {
        color: `${links} !important`,
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
  },

  Dialog: {
    dialogWrapperStyle: ({ light, }) => () => ({
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
      border: `solid 1px ${light}`,
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
const LoginContentStylesThemed = host => {
  const colors = getColors(host);
  return {
    TopLinks: createComponent(Styles.Content.topLinks(colors)),
  };
};

const LoginMiscLayoutStylesThemed = host => {
  const colors = getColors(host);
  return {
    InputLinkButton: createComponent(Styles.MiscLayout.inputLinkButton(colors)),
    TermsWrapper: createComponent(Styles.MiscLayout.termsStyle(colors)),
  };
};

const LoginDialogBoxThemed = host => {
  const colors = getColors(host);
  return {
    DialogWrapper: createComponent(Styles.Dialog.dialogWrapperStyle),
    DialogContent: createComponent(Styles.Dialog.dialogContentStyle),
    CloseButton: createComponent(Styles.Dialog.closeButtonStyle),
  };
};

// Export ----------------------------------------------
export { LoginContentStylesThemed, LoginMiscLayoutStylesThemed, LoginDialogBoxThemed, };
