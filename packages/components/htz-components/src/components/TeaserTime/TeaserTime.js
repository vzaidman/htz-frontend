// @flow
import * as React from 'react';
import differenceInHours from 'date-fns/difference_in_hours';
import Time from '../Time/Time';

type TeaserTimePropTypes = {
  /**
   * className passed on to the Time component
   */
  className: ?string,
  /**
   * The article publish time in unixtime (ms)
   */
  publishDate: ?number,
  /**
   * The article last update time in unixtime (ms)
   */
  lastUpdate: ?number,
};

const TeaserTime = ({ className, publishDate, lastUpdate, }: TeaserTimePropTypes): React.Node => {
  const now = Date.now();
  if (publishDate) {
    if (lastUpdate) {
      if (differenceInHours(now, lastUpdate) < 24) {
        return <Time className={className} time={lastUpdate} format="HH:mm" />;
      }
      return <Time className={className} time={lastUpdate} format="DD.MM.YYYY" />;
    }
    return <Time className={className} time={publishDate} format="DD.MM.YYYY" />;
  }
  return null;
};

TeaserTime.defaultProps = {
  className: null,
  publishDate: null,
  lastUpdate: null,
};

export default TeaserTime;
