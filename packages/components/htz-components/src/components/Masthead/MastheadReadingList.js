import React from 'react';
import { FelaComponent, } from 'react-fela';
import ClickArea from '../ClickArea/ClickArea';
import hoverableButtonRule from '../ClickArea/hoverableButtonRule';
import IconReading from '../Icon/icons/IconReading';
import HtzLink from '../HtzLink/HtzLink';

export default function MastheadReadingList() {
  return (
    <FelaComponent
      rule={hoverableButtonRule}
      render={({ theme, className, }) => {
        const { url, } = theme.readingListMenuI18n;
        return (
          <FelaComponent
            rule={hoverableButtonRule}
            render={({ theme, className, }) => (
              <HtzLink
                className={className}
                href={url}
              >
                <ClickArea href={url} tagName="span" size={6}>
                  <IconReading size={3.5} />
                </ClickArea>
              </HtzLink>
            )}
          />
        );
      }}
    />
  );
}
