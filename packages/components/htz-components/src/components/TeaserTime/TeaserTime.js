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
  const relevantDateTime = lastUpdate || publishDate || null;
  if (relevantDateTime == null) {
    return null;
  }
  const now = Date.now();
  const format = (differenceInHours(now, relevantDateTime) < 24)
    ? 'HH:mm'
    : 'DD.MM.YYYY';
  return <Time className={className} time={relevantDateTime} format={format} />;
};

TeaserTime.defaultProps = {
  className: null,
  publishDate: null,
  lastUpdate: null,
};

export default TeaserTime;
