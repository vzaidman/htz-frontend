/* globals OBR */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';
import BlockLink from '../../../BlockLink/BlockLink';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';
import Section from '../../../AutoLevels/Section';
import HtzLink from '../../../HtzLink/HtzLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';

// eslint-disable-next-line react/prop-types
const Fry = ({ list, lazyLoad, gaAction, biAction, listId, }) => (
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
          <H>{theme.fryListI18n.title}</H>
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
        <Section>
          {list.items.map((item, index) => {
            // eslint-disable-next-line camelcase
            const { title, image, path, source_display_name, } = item;
            return (
              <ListItem key={item.contentId}>
                <BlockLink
                  href={path}
                  onClick={() => {
                    biAction({
                      actionCode: 109,
                      additionalInfo: {
                        ArticleId: item.path.match(/(?:.*-?)(1\.\d+.*)/)[1],
                        ListId: listId,
                        Platform: 'desktop',
                        NoInList: index + 1,
                        ViewName: 'Fry',
                      },
                    });
                  }}
                  miscStyles={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    width: '20rem',
                    marginBottom: '3rem',
                    ':nth-of-type(odd)': {
                      marginEnd: '2rem',
                    },
                  }}
                >
                  <div>
                    <Image
                      data={image}
                      imgOptions={{
                        transforms: {
                          width: '125',
                          aspect: 'regular',
                          quality: 'auto',
                        },
                      }}
                      miscStyles={{
                        marginBottom: '1rem',
                        flexShrink: '0',
                        flexGrow: '0',
                      }}
                    />
                  </div>
                  <AboveBlockLink>
                    {({ className, }) => {
                      const aboveBlockLinkClasses = className;
                      return (
                        <FelaComponent
                          style={{
                            flexGrow: '1',
                            fontWeight: '700',
                            extend: [ theme.type(-1), ],
                          }}
                          render={({ className, }) => (
                            <H className={`${aboveBlockLinkClasses} ${className}`}>
                              <HtzLink href={path}>{title}</HtzLink>
                              <FelaComponent
                                style={{
                                  color: theme.color('tertiary'),
                                  fontWeight: '700',
                                  marginBottom: '1rem',
                                  extend: [ theme.type(-2), ],
                                }}
                                render="p"
                              >
                                {/* eslint-disable-next-line camelcase */}
                                {source_display_name}
                                {' '}
                              </FelaComponent>
                            </H>
                          )}
                        />
                      );
                    }}
                  </AboveBlockLink>
                </BlockLink>
              </ListItem>
            );
          })}
        </Section>
      </div>
    )}
  />
);

export default Fry;
