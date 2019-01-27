export default {
  strip: {
    wrapper: theme => ({
      backgroundImage: 'radial-gradient(circle at 50% 50%, #169fd1, #0b7eb5)',
      color: theme.color('white'),
      extend: [
        theme.type(-1),
        theme.mq(
          {
            until: 'm',
          },
          {
            minHeight: '8rem',
            width: '100%',
            padding: '1rem 2rem',
            lignHeight: '130%',
          }
        ),
      ],
    }),
    innerWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '7rem',
    },
    text1: theme => ({
      fontWeight: 'bold',
      extend: [ theme.mq({ until: 'm', }, { fontWeight: '400', }), ],
    }),
    text2: theme => ({}),
    button: theme => ({
      ...theme.mq(
        { from: 'm', },
        {
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          marginInlineStart: '2rem',
        }
      ),
    }),
    icon: theme => ({}),
    buttonVariant: 'salesOpaque',
  },
  popup: {
    wrapper: theme => ({
      color: theme.color('neutral', '-1'),
      textAlign: 'center',
      extend: [ theme.type(4), ],
    }),
    innerWrapper: {},
    text1: theme => ({
      marginTop: '3rem',
      lineHeight: '140%',
    }),
    text2: theme => ({
      fontWeight: 'bold',
      marginTop: '0rem',
      lineHeight: '140%',
    }),
    icon: theme => ({}),
    button: theme => ({
      marginTop: '4rem',
      ...theme.type(1),
    }),
    closeButton: theme => ({
      position: 'absolute',
      top: '0',
      left: '0',
      fontSize: '3.5rem',
      cursor: 'pointer',
      color: theme.color('primary'),
    }),
    buttonVariant: 'salesOpaque',
  },
  popup2: {
    wrapper: theme => ({
      color: theme.color('neutral', '-1'),
      textAlign: 'center',
      extend: [ theme.type(4), ],
    }),
    innerWrapper: {},
    text1: theme => ({
      marginTop: '3rem',
      lineHeight: '140%',
      ...theme.type(2),
    }),
    text2: theme => ({
      fontWeight: 'bold',
      marginTop: '0',
      lineHeight: '140%',
      color: theme.color('primary', '+1'),
      ...theme.type(9),
    }),
    icon: theme => ({}),
    button: theme => ({
      marginTop: '4rem',
      paddingRight: '2rem',
      paddingLeft: '2rem',
      ...theme.type(1),
    }),
    closeButton: theme => ({
      position: 'absolute',
      top: '0',
      left: '0',
      fontSize: '3.5rem',
      cursor: 'pointer',
      color: theme.color('primary'),
    }),
    buttonVariant: 'salesOpaque',
  },
  opinions: {
    wrapper: theme => ({
      color: theme.color('secondary'),
      width: '27rem',
    }),
    innerWrapper: {},
    text1: theme => ({
      fontWeight: 'bold',
      extend: [ theme.mq({ from: 'l', }, theme.type(-1)), theme.mq({ until: 'l', }, theme.type(-2)), ],
    }),
    text2: theme => ({
      color: theme.color('neutral', -2),
      extend: [ theme.type(-2), ],
    }),
    button: theme => ({
      paddingTop: '0',
      paddingBottom: '0',
      marginTop: '1rem',
    }),
    icon: theme => ({
      color: theme.color('secondary'),
    }),
    buttonVariant: 'salesOpaque',
  },
  weekllyPopup: {
    wrapper: theme => ({
      backgroundImage: 'linear-gradient(to right, #faefca, #f7f5e6)',
      width: '100%',
      height: '71rem',
    }),
    innerWrapper: theme => ({
      width: '170rem',
      margin: '0 auto',
      display: 'inline-block',
      float: 'start',
      marginInlineStart: '50%',
      transform: 'translateX(50%)',
      position: 'relative',
      height: '71rem',
    }),
    text1: theme => ({
      fontWeight: 'bold',
      marginTop: '8rem',
      width: '60rem',
      float: 'start',
      extend: [ theme.type(9), ],
    }),
    text2: theme => ({
      width: '60rem',
      float: 'start',
      marginTop: '3rem',
      marginBottom: '3rem',
      extend: [ theme.type(5), ],
    }),
    button: theme => ({ float: 'start', }),
    icon: theme => ({
      position: 'relative',
      top: '-10rem',
      display: 'inline-block',
      float: 'start',
      size: 95,
    }),
    closeButton: theme => ({
      fontSize: '3.5rem',
      position: 'absolute',
      top: '3rem',
      end: '3rem',
      cursor: 'pointer',
    }),
    buttonVariant: 'salesOpaque',
  },
  emailConfirmation: {
    wrapper: theme => ({
      background: theme.color('white'),
      height: '46rem',
    }),
    innerWrapper: theme => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    text1: theme => ({
      fontWeight: 'bold',
      marginTop: '2rem',
      marginBottom: '1rem',
      extend: [ theme.type(5), ],
    }),
    text2: theme => ({
      marginBottom: '3rem',
      extend: [ theme.type(2), ],
    }),
    button: theme => ({ paddingTop: '0.5rem', paddingBottom: '0.5rem', }),
    icon: theme => ({
      marginTop: '-7rem',
      height: '27rem',
      overflow: 'hidden',
      size: 60,
    }),
    closeButton: theme => ({
      fontSize: '3.5rem',
      position: 'absolute',
      top: '3rem',
      end: '3rem',
      color: theme.color('primary'),
      cursor: 'pointer',
    }),
    buttonVariant: 'salesOpaque',
  },

  mobile: {
    wrapper: theme => ({
      color: theme.color('primary'),
      extend: [ theme.mq({ from: 'm', }, { display: 'none', }), ],
      paddingTop: '20rem',
      paddingInlineStart: '5rem',
      paddingInlineEnd: '5rem',
    }),
    innerWrapper: theme => ({}),
    text1: theme => ({
      fontWeight: 'bold',
      marginTop: '3rem',
      lineHeight: '140%',
      extend: [ theme.type(8), ],
    }),
    text2: theme => ({
      fontWeight: 'bold',
      marginTop: '3.5rem',
      extend: [ theme.type(3), ],
    }),
    button: theme => ({
      marginTop: '4.5rem',
    }),
    icon: theme => ({
      fontSize: '7rem',
    }),
    closeButton: theme => ({
      position: 'absolute',
      top: '4rem',
      start: '1rem',
    }),
    buttonVariant: 'salesOpaque',
  },
};
