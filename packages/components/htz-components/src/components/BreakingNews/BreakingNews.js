// @flow
import * as React from 'react';
import { format, } from 'date-fns';
import BreakingNewsSingleDay from './BreakingNewsSingleDay';

export type Props = {
  items: {
    title: string,
    creationDateTime: number,
    url: string,
    inputTemplate: string,
    contentId: string,
  }[],
};

const getDayFromTimeStamp = (time: number) => format(time, 'DDD');

export default function BreakingNews({ items, }: Props): React.Node {
  let prevDay = null;
  const itemsDividedToDays = items.reduce((accumulator, item, idx) => {
    const currentDay = getDayFromTimeStamp(item.creationDateTime);
    if (currentDay !== prevDay) {
      console.log(
        'pushing a new array to the accumulator, currentDay: ',
        currentDay,
        'prevDay: ',
        prevDay
      );
      accumulator.push([]);
    }
    prevDay = currentDay;
    console.log('prevDay after updating', prevDay);
    accumulator[accumulator.length - 1].push(item);
    console.log('accumulator after updating', accumulator);
    return accumulator;
  }, []);
  console.log('items divided: ', itemsDividedToDays);
  return (
    <div>
      {itemsDividedToDays.map(dayItems => (
        <BreakingNewsSingleDay items={dayItems} />
      ))}
    </div>
  );
}
