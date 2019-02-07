export default {
  wrapper: { padding: '3rem', },
  surveyWrapper: ({ theme, mode, }) => ({
    width: '100%',
    extend: [
      mode === 'horizental'
        ? {}
        : {
          display: 'flex',
          flexWrap: 'nowrap',
          height: '40rem',
        },
    ],
  }),
  legendsWrapper: theme => ({ textAlign: 'center', marginBottom: '2rem', }),
  legend: theme => ({
    margin: '2rem',
    display: 'inline-block',
    extend: [
      theme.mq(
        { until: 'm', },
        { width: '100%', textAlign: 'start', paddingInlineStart: '5%', margin: '0.3rem', }
      ),
    ],
  }),
  legendLabel: theme => ({
    margin: '2rem',
  }),
  legendcolor: ({ theme, color, }) => ({
    background: theme.color(...color),
    display: 'inline-block',
    width: '2rem',
    height: '2rem',
  }),
  chartWrapper: ({ theme, mode, itemsAmount, }) => ({
    display: 'flex',
    marginBottom: '2rem',
    extend: [
      mode === 'horizental'
        ? {}
        : {
          width: `${100 / itemsAmount}%`,
          marginBottom: '0rem',
          flexDirection: 'column-reverse',
          alignItems: 'center',
        },
    ],
  }),
  labal: ({ theme, mode, }) => ({
    extend: [
      mode === 'horizental'
        ? {}
        : {
          position: 'absolute',
          start: '10px',
          whiteSpace: 'nowrap',
        },
    ],
  }),
  labalWrapper: ({ theme, mode, }) => ({
    display: 'flex',
    ...theme.type(-2),
    extend: [
      mode === 'horizental'
        ? {
          textAlign: 'end',
          flexBasis: '28%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginInlineEnd: '2%',
        }
        : {
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '0rem',
          position: 'relative',
          textAlign: 'start',
          transform: 'rotate(-72deg)',
          ...theme.type(-2),
        },
    ],
  }),
  barsWrapper: ({ theme, mode, }) => ({
    display: 'flex',
    flex: '70%',
    flexDirection: 'column',
    height: '5rem',
    extend: [
      mode === 'horizental'
        ? {}
        : {
          flexDirection: 'row',
          height: 'auto',
        },
    ],
  }),
  barWrapper: ({ theme, mode, }) => ({
    display: 'flex',
    flex: 'calc(70% - 4rem)',
    extend: [
      mode === 'horizental'
        ? {}
        : {
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
        },
    ],
  }),
  barValue: ({ theme, mode, }) => ({
    textAlign: 'center',
    ...theme.type(-2),
    flexBasis: 'auto',
    marginInlineStart: '0.5rem',
    extend: [
      mode === 'horizental'
        ? {}
        : {
          marginInlineStart: '0',
        },
    ],
  }),
  bar: ({ theme, value, barColor, mode, load, }) => ({
    background: theme.color(...barColor),
    width: !load ? '0' : `${(Math.max(value, 1) / 40) * 100}% `,
    marginTop: '0rem',    
    ...theme.getDelay('transition', 1),
    ...theme.getDuration('transition', 1),
    ...theme.getTimingFunction('transition', 'linear'),
    extend: [
      mode === 'horizental'
        ? {
          transitionProperty: 'width, opacity',
        }
        : {
          width: '3rem',
          transitionProperty: 'height, opacity',
          height: !load ? '0' : `${(Math.max(value, 1) / 40) * 100}% `,
        },
    ],
    ':HOVER': {
      opacity: '0.5',
    }
  }),
  comment: theme => ({
    ...theme.type(-1),
    marginTop: '3rem',
  }),
  buttonWrapper: ({ theme, mode, }) => ({
    textAlign: 'center',
    marginTop: '15rem',
    ...(mode === 'horizental'
      ? {
        marginTop: '5rem',
      }
      : {}),
  }),
  button: theme => ({}),
};
