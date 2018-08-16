/* globals OBR */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';
import Image from '../../../Image/Image';

// eslint-disable-next-line react/prop-types
const Fry = ({ list, }) => (
  <FelaComponent
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: `${300 / 7}rem`,
    }}
    render={({ className, theme, }) => (
      <div className={className}>
        <FelaComponent
          style={{
            ...theme.type(1),
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontWeight: '700',
            color: theme.color('primary'),
            ...borderBottom('2px', 1, 'solid', theme.color('primary')),
            marginBottom: '2rem',
          }}
        >
          {theme.fryListI18n.title}
          <FelaComponent
            style={{
              ...theme.type(-3),
              fontWeight: '300',
              color: theme.color('neutral', '-3'),
              marginBottom: '0.25rem',
              marginStart: '1rem',
              marginTop: '1rem',
              position: 'relative',
              paddingStart: '3rem',
              ':after': {
                background:
                  'url(//widgets.outbrain.com/images/widgetIcons/ob_logo_16x16.png) no-repeat center top',
                backgroundSize: '100% 200%',
                content: '""',
                height: '2.3rem',
                position: 'absolute',
                right: '0',
                bottom: '55%',
                transform: 'translateY(50%)',
                width: '2.3rem',
              },
              ':hover': {
                color: theme.color('neutral'),
                textDecoration: 'underline',
                lineSkip: 'ink',
                ':after': {
                  backgroundPosition: 'center bottom',
                },
              },
            }}
            render="a"
            href="#"
            onMouseDown={event => {
              // eslint-disable-next-line no-param-reassign
              event && event.cancelBubble && (event.cancelBubble = true);
              event && event.stopPropagation && event.stopPropagation();
              return true;
            }}
            onClick={() => {
              OBR.extern.callWhatIs(
                'https://www.outbrain.com/what-is/default/he',
                '',
                -1,
                -1,
                true,
                null
              );
              return false;
            }}
          >
            <span>Recommended by</span>
          </FelaComponent>
        </FelaComponent>
        {list.items.map(item => {
          // eslint-disable-next-line camelcase
          const { title, image, path, source_display_name, } = item;
          return (
            <ListItem key={item.contentId}>
              <FelaComponent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: `${143 / 7}rem`,
                  marginBottom: '3rem',
                  ':nth-of-type(odd)': {
                    marginEnd: '2rem',
                  },
                }}
                render="a"
                href={path}
              >
                <FelaComponent
                  style={{
                    flexShrink: '0',
                    marginBottom: '1rem',
                  }}
                >
                  <Image
                    data={image}
                    imgOptions={{
                      transforms: {
                        width: '125',
                        aspect: 'regular',
                        quality: 'auto',
                      },
                    }}
                    hasWrapper={false}
                  />
                </FelaComponent>
                <FelaComponent
                  style={{
                    ...theme.type(-1),
                    fontWeight: '700',
                  }}
                  render="p"
                >
                  {title}
                </FelaComponent>
                <FelaComponent
                  style={{
                    ...theme.type(-2),
                    color: theme.color('tertiary'),
                    fontWeight: '700',
                    marginBottom: '1rem',
                  }}
                  render="p"
                >
                  {source_display_name} {/* eslint-disable-line camelcase */}
                </FelaComponent>
              </FelaComponent>
            </ListItem>
          );
        })}
      </div>
    )}
  />
);

export default Fry;
