// @flow
import * as React from 'react';
import differenceInHours from 'date-fns/difference_in_hours';
import Time from '../Time/Time';

type TeaserTimePropTypes = {
  /** className passed on to the Time component */
  className: ?string,
  /** The article publish time in unixtime (ms) */
  publishDate: ?number,
  /** The article last update time in unixtime (ms) */
  lastUpdate: ?number,
};

TeaserTime.defaultProps = {
  className: null,
  publishDate: null,
  lastUpdate: null,
};
export default function TeaserTime({
  className,
  publishDate,
  lastUpdate,
}: TeaserTimePropTypes): React.Node {
  const pertinentDate = lastUpdate || publishDate;
  if (!pertinentDate) return null;
  const timeFormat = isToday(pertinentDate) ? 'HH:mm' : 'DD.MM.YY';

  return (
    <Time className={className} format={timeFormat} time={pertinentDate} />
  );
}

function isToday(time) {
  return differenceInHours(Date.now(), time) < 24;
}
