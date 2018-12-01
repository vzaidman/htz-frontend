import React, { Fragment, } from 'react';

import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import BlockLink from '../../../BlockLink/BlockLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import Image from '../../../Image/Image';
import IconComment from '../../../Icon/icons/IconComment';
import HtzLink from '../../../HtzLink/HtzLink';
import H from '../../../AutoLevels/H';
import Section from '../../../AutoLevels/Section';

// eslint-disable-next-line react/prop-types
const Nibbler = ({ data, }) => {
  if (data.loading) return null;
  if (data.error) return null;

  const itemsToRender = data.list.items.slice(0, 4);
  return (
    <Section>
      <FelaComponent
        style={theme => ({
          fontWeight: 'bold',
          color: theme.color('primary'),
          marginBottom: '2rem',
          extend: [
            borderTop('2px', 1, 'solid', 'primary'),
            theme.type(3, { fromBp: 's', }),
          ],
        })}
        render={({ className, }) => (
          <H className={className}>{data.list.title}</H>
        )}
      />
      <Grid gutter={1}>
        {itemsToRender.map(item => (
          <GridItem
            width={[ { until: 's', value: 1, }, { from: 's', value: 1 / 4, }, ]}
            miscStyles={{ marginBottom: [ { until: 's', value: '2rem', }, ], }}
          >
            <Section isFragment>
              <BlockLink
                href={item.path}
                miscStyles={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Image
                    data={item.image}
                    imgOptions={{
                      transforms: {
                        width: '600',
                        aspect: 'regular',
                        quality: 'auto',
                      },
                    }}
                  />
                  <FelaComponent
                    style={theme => ({
                      fontWeight: 'bold',
                      marginInlineEnd: '1rem',
                      marginTop: '1rem',
                      extend: [
                        theme.type(1, { fromBp: 'xl', }),
                        theme.type(-1, { fromBp: 's', untilBp: 'xl', }),
                      ],
                    })}
                    render={({ className, }) => (
                      <H className={className}>{item.title}</H>
                    )}
                  />
                </div>
                <div>
                  <FelaComponent
                    style={theme => ({
                      color: theme.color('neutral', '-3'),
                      extend: [
                        theme.type(-1, { fromBp: 'xl', }),
                        theme.type(-2, { fromBp: 's', untilBp: 'xl', }),
                        theme.mq({ until: 's', }, { display: 'none', }),
                      ],
                    })}
                    render="span"
                  >
                    {item.authors.map(author => (
                      <Fragment>
                        {author.url ? (
                          <AboveBlockLink>
                            {() => (
                              <HtzLink
                                href={author.url}
                                content={author.contentName}
                              />
                            )}
                          </AboveBlockLink>
                        ) : (
                          <span>{author.name}</span>
                        )}
                        <FelaComponent
                          style={{
                            marginInlineEnd: '1rem',
                            marginInlineStart: '1rem',
                          }}
                          render="span"
                        >
                          |
                        </FelaComponent>
                      </Fragment>
                    ))}
                    <IconComment
                      color="primary"
                      miscStyles={{
                        marginInlineEnd: '1rem',
                        marginInlineStart: '1rem',
                      }}
                    />
                    {item.commentsCount}
                  </FelaComponent>
                </div>
              </BlockLink>
            </Section>
          </GridItem>
        ))}
      </Grid>
    </Section>
  );
};

export default Nibbler;
