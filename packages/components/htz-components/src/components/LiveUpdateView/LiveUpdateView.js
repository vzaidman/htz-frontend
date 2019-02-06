import React from 'react';
import { FelaComponent, } from 'react-fela';

function LiveUpdateView() {
  return (
    <FelaComponent
      style={theme => ({
        // marginTop: '3rem',
        display: 'inline-flex',
        alignItems: 'center',
        // extend: [
        //   theme.mq({ from: 'l', }, { display: 'inline-flex', }),
        //   theme.mq({ until: 'l', }, { display: 'none', }),
        // ],
      })}
      render={({ className, theme, }) => (
        <span className={className}>
          <FelaComponent
            style={{
              color: theme.color('tertiary'),
              margin: 'auto',
              fontWeight: 'bold',
              extend: [ theme.type(-3), ],
            }}
            render={({ className, }) => (
              <span className={className}>{theme.liveBlogI18n.liveUpdate}</span>
            )}
          />
          <FelaComponent
            style={{
              height: '1.3rem',
              width: '1.3rem',
              borderRadius: '48%',
              backgroundColor: theme.color('tertiary'),
              marginInlineStart: '0.5rem',
              marginInlineEnd: '1rem',
              marginBottom: '0.2rem',
              animationDuration: '2.5s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'alternate',
              animationName: {
                '0%': { opacity: '0.5', },
                '50%': { opacity: '1', },
                '100%': { opacity: '0', },
              },
            }}
            render={({ className, }) => <span className={className} />}
          />
        </span>
      )}
    />
  );
}

export default LiveUpdateView;
