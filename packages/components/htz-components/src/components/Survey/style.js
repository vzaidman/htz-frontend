const tooMenyItems = 12;
export default {
  wrapper: { padding: '3rem', },
  surveyWrapper: ({ theme, itemsAmount, }) => ({
    width: '100%',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            display: 'flex',
            flexWrap: 'nowrap',
            height: '50rem',
          }
        ),
    ],
  }),
  legendsWrapper: theme => ({ textAlign: 'center', marginBottom: '2rem', }),
  legend: theme => ({
    margin: '2rem',
    display: 'inline-block',
    extend: [
      theme.mq(
        { until: 'm', },
        { width: '100%', textAlign: 'start', paddingInlineStart: '30%', margin: '0.3rem', }
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
  chartWrapper: ({ theme, itemsAmount, }) => ({
    display: 'flex',
    marginBottom: '2rem',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            width: `${100 / itemsAmount}%`,
            marginBottom: '0rem',
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }
        ),
    ],
  }),
  labal: ({ theme, itemsAmount, }) => ({
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            position: 'absolute',
            start: '10px',
            whiteSpace: 'nowrap',
          }
        ),
    ],
  }),
  labalWrapper: ({ theme, itemsAmount, }) => ({
    display: 'flex',
    ...theme.type(-2),
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '0rem',
            position: 'relative',
            textAlign: 'start',
            transform: 'rotate(-72deg)',
            ...theme.type(-2),
          }
        ),
      theme.mq(itemsAmount > tooMenyItems ? { until: 'xl', } : { until: 'm', }, {
        textAlign: 'end',
        flexBasis: '28%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginInlineEnd: '2%',
      }),
    ],
  }),
  barsWrapper: ({ theme, itemsAmount, }) => ({
    display: 'flex',
    flex: '70%',
    flexDirection: 'column',
    height: '5rem',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            flexDirection: 'row',
            height: 'auto',
          }
        ),
    ],
  }),
  barWrapper: ({ theme, itemsAmount, }) => ({
    display: 'flex',
    flex: 'calc(70% - 4rem)',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            flexDirection: 'column-reverse',
            justifyContent: 'flex-start',
          }
        ),
    ],
  }),
  barValue: ({ theme, itemsAmount, }) => ({
    textAlign: 'center',
    ...theme.type(-2),
    flexBasis: 'auto',
    marginInlineStart: '0.5rem',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            marginInlineStart: '0',
          }
        ),
    ],
  }),
  bar: ({ theme, value, barColor, itemsAmount, }) => ({
    background: theme.color(...barColor),
    width: `${(Math.max(value, 1) / 40) * 100}% `,
    marginTop: '0rem',
    extend: [
      itemsAmount > tooMenyItems
        ? {}
        : theme.mq(
          { from: 'm', },
          {
            width: '2rem',
            height: `${(Math.max(value, 1) / 40) * 100}% `,
          }
        ),
    ],
  }),
  comment: theme => ({
    ...theme.type(-1),
  }),
};
