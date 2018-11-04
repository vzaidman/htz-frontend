import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { border, } from '@haaretz/htz-css-tools';
import Time from '../../../Time/Time';
import ActionButtons from '../../../ActionButtons/ActionButtons';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';

import ArticleBody from '../../../ArticleBody/ArticleBody';

const wrapperStyle = ({ theme, }) => ({
  width: '100%',
  // extend: [
  //   border('2px', 1, 'solid', 'gray'),
  // ],
});

// const itemContainerStyle = ({ theme, }) => ({
//   //   width: '100%',
//   // extend: [
//   //   border('2px', 1, 'solid', 'gray'),
//   // ],
// });

function LiveBlogContainer({ liveblogItems, }) {
  return (
    <Fragment>
      <FelaComponent
        rule={wrapperStyle}
        render={({ className, theme, }) => (
          <div className={className}>
            {liveblogItems.map((item, i) => (
              <Grid
                id={item.contentId}
                miscStyles={{
                //   paddingTop: '3rem',
                //   paddingBottom: '4rem',
                //   paddingInlineStart: '2rem',
                //   paddingInilneEnd: '5rem',
                  marginBottom: '2rem',
                  marginTop: '4rem',
                  border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                }}
              >
                <GridItem width={1 / 4}>
                  <FelaComponent
                    style={theme => ({ ...theme.type(0), fontWeight: 'bold', paddingTop: '3rem', })}
                    render={({ className, }) => (
                      <div className={className}>
                        <Time time={item.pubDate} format="HH:mm" />
                      </div>
                    )}
                  />
                  <FelaComponent
                    // style={{ padding: '1rem', }}
                    render={({ className, }) => (
                      <div className={className}>
                        <Time time={item.pubDate} format="DD.MM.YYYY" />
                      </div>
                    )}
                  />
                  <ActionButtons
                    miscStyles={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginTop: '1rem',
                    }}
                    size={4}
                    buttons={[
                      {
                        name: 'facebookLogo',
                        buttonText: 78,
                        iconStyles: {
                          color: 'blue',
                        },
                      },
                      {
                        name: 'whatsapp',
                        iconStyles: {
                          color: 'blue',
                        },
                      },
                      'mail',
                    ]}
                    vertical
                  />
                </GridItem>

                <GridItem 
                  width={ 3 / 4 } 
                  miscStyles={{
                    paddingTop: '3rem',
                    paddingBottom: '4rem',
                    // paddingInlineStart: '2rem',
                    paddingInlineEnd: '5rem',
                  }}
                >
                  <div style={{ fontWeight: 'bold', }}>{item.title}</div>
                  <ArticleBody body={item.body} />
                </GridItem>
              </Grid>
            ))}
          </div>
        )}
      />
    </Fragment>
  );
}

export default LiveBlogContainer;
