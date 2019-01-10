// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderStart, } from '@haaretz/htz-css-tools';
import Time from '../Time/Time';
import HtzLink from '../HtzLink/HtzLink';

type Props = {
  items: {
    title: string,
    creationDateTime: number,
    url: string,
    inputTemplate: string,
    contentId: string,
  }[],
};

const itemStyle = ({ theme, isFirstItem, isLastItem, }) => ({
  paddingInlineStart: '2rem',
  paddingBottom: '4rem',
  extend: [
    borderStart({
      width: '1px',
      style: 'solid',
      color: '#ccc',
    }),
    isFirstItem
      ? {
        ':before': {
          backgroundColor: 'white',
          height: '0.5em',
          top: '0',
          // borderBottom: '1px solid #ccc',
        },
      }
      : {},
    isLastItem
      ? {
        paddingBottom: '0',
        ':before': {
          backgroundColor: 'white',
          height: 'calc(100% - 0.5em)',
          top: '0.5em',
          // borderTop: '1px solid #bbb',
        },
      }
      : {},
    isFirstItem || isLastItem
      ? {
        position: 'relative',
        ':before': {
          position: 'absolute',
          content: '""',
          width: '1rem',
          right: '-0.5em',
          ...theme.mq({ until: 's', }, { right: '-0.4em', }),
          ...theme.mq({ from: 's', until: 'l', }, { right: '-0.4em', }),
          transform: 'translate(-50%,0)',
        },
      }
      : {},
    theme.mq(
      { from: 's', until: 'l', },
      {
        display: 'flex',
        alignItems: 'baseline',
        paddingBottom: '3rem',
      }
    ),
    theme.type(-1, { fromBp: 'xl', }),
  ],
});

const TimeHeadlineStyle = ({ theme, }) => ({
  position: 'relative',
  //   display: 'block',
  color: theme.color('tertiary', 'base'),
  fontWeight: 'bold',
  marginInlineEnd: '1rem',
  ':before': {
    position: 'absolute',
    content: '""',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: theme.color('neutral', '-6'),
    border: '1px solid #ccc',
    top: '45%',
    right: '-1.6em',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  extend: [
    theme.mq({ until: 's', }, { ':before': { right: '-1.35em', }, }),
    theme.mq(
      { from: 's', until: 'l', },
      { marginInlineEnd: '2rem', ':before': { right: '-1.35em', }, }
    ),
    theme.mq({ from: 'l', until: 'xl', }, { ':before': { right: '-1.4em', }, }),
  ],
});

export default function BreakingNewsTimeLine({ items, }: Props): React.Node {
  return (
    <FelaComponent
      style={{
        paddingInlineStart: '2rem',
        paddingTop: '2rem',
        paddingBottom: '3rem',
        backgroundColor: 'white',
      }}
      render="ul"
    >
      {items.map((item, idx) => (
        <FelaComponent
          isFirstItem={idx === 0}
          isLastItem={idx === items.length - 1}
          rule={itemStyle}
          key={item.contentId}
          render="li"
        >
          <FelaComponent
            isFirstItem={idx === 0}
            isLastItem={idx === items.length - 1}
            rule={TimeHeadlineStyle}
            render={({ className, }) => (
              <Time time={item.creationDateTime} format="HH:mm" className={className} />
            )}
          />
          <HtzLink href={item.url}>{item.title}</HtzLink>
        </FelaComponent>
      ))}
    </FelaComponent>
  );
}
