// @flow
import * as React from 'react';
import differenceInHours from 'date-fns/difference_in_hours';
import Time from '../Time/Time';

type TeaserTimePropTypes = {
  /**
   * The article publish time in unixtime (ms)
   */
  publishDate: ?number,
  /**
   * The article last update time in unixtime (ms)
   */
  lastUpdate: ?number,
};

const TeaserTime = ({ publishDate, lastUpdate, }: TeaserTimePropTypes): React.Node => {
  const now = Date.now();
  if (publishDate) {
    if (lastUpdate) {
      if (differenceInHours(now, lastUpdate) < 24) {
        return (<Time time={lastUpdate} format="HH:mm" />);
      }
      return (<Time time={lastUpdate} format="DD.MM.YYYY" />);
    }
    return (<Time time={publishDate} format="DD.MM.YYYY" />);
  }
  return null;
};

TeaserTime.defaultProps = {
  publishDate: null,
  lastUpdate: null,
};

export default TeaserTime;
