import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderEnd, } from '@haaretz/htz-css-tools';
import Button from '../../Button/Button';

export default function MobileReadingList() {
  return (
    <FelaComponent
      style={theme => ({
        display: 'flex',
        flexGrow: '1',
        extend: [ borderEnd('1px', 'solid', theme.color('primary', '+1')), ],
      })}
      render={({ theme, className, }) => {
        const { url, buttonText, } = theme.mobileReadingList;

        return (
          <div className={className}>
            <Button
              isFull
              variant="secondaryOpaque"
              boxModel={{ vp: 2, hp: 2, }}
              fontSize={-1}
              href={url}
            >
              {buttonText}
            </Button>
          </div>
        );
      }}
    />
  );
}
