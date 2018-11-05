import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { border, } from '@haaretz/htz-css-tools';
import Time from '../../../Time/Time';
import ActionButtons from '../../../ActionButtons/ActionButtons';
import RadioButton from '../../../RadioButton/RadioButton';
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

// function SortUpdates({ value, changeState, }) {
//   return (
//     <Fragment>
//         <FelaComponent
//             style={ theme => ({ backgroundColor:  theme.color('primary', '-6'), width: '100%', display: 'flex', justifyContent: 'space-between', })}
//             render={({ className, theme, }) => (
//               <div className={className}>
//                 <FelaComponent
//                   style={{}}
//                   render={({ className, })=> (
//                     <span>{theme.liveBlogI18n.updatesTitle}</span>
//                   )}
//                 />
//                 <FelaComponent
//                   style={{ display: 'flex', }}
//                   render={({ className, })=> (

//                   )}
//                 />
//               <div>
//             )}
//         />
//     </Fragment>
//   );
// }

class LiveBlogContainer extends React.Component {
  static propTypes = {
    liveblogItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    canonicalUrl: PropTypes.string.isRequired,
  };

  state = {
    value: 'descending',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.value === 'descending') {
      return { items: props.liveblogItems, };
    }
    return { items: props.liveblogItems.slice().reverse(), };
  }

  render() {
    const { items, } = this.state;
    const { canonicalUrl, } = this.props;
    console.warn('items: ', typeof items, items);
    return (
      <Fragment>
        <FelaComponent
          style={theme => ({
            backgroundColor: theme.color('primary', '-6'),
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          })}
          render={({ className, theme, }) => (
            <div className={className}>
              <FelaComponent
                style={{ color: 'red', }}
                render={({ className, }) => <span>{theme.liveBlogI18n.updatesTitle}</span>}
              />
              <FelaComponent
                style={{ display: 'flex', }}
                render={({ className, }) => (
                  <div className={className}>
                    <RadioButton
                      label={theme.liveBlogI18n.lastToFirstLabel}
                      value="descending"
                      onChange={evt => this.setState({ value: evt.target.value, })}
                      checked={this.state.value === 'descending'}
                      miscStyles={{ marginInlineEnd: '5rem', ...theme.type(-1), }}
                    />
                    <RadioButton
                      label={theme.liveBlogI18n.firstToLastLabel}
                      value="ascending "
                      onChange={evt => this.setState({ value: evt.target.value, })}
                      checked={this.state.value === 'ascending '}
                      miscStyles={{ ...theme.type(-1), }}
                    />
                  </div>
                )}
              />
            </div>
          )}
        />
        <FelaComponent
          rule={wrapperStyle}
          render={({ className, theme, }) => (
            <div className={className}>
              {items.map((item, i) => (
                <Grid
                  tagName="article"
                  attrs={{ itemid: `${canonicalUrl}#${item.contentId}`, }}
                  id={item.contentId}
                  miscStyles={{
                    marginBottom: '2rem',
                    marginTop: '4rem',
                    border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                  }}
                >
                  <GridItem width={1 / 4}>
                    <FelaComponent
                      style={theme => ({
                        ...theme.type(0),
                        fontWeight: 'bold',
                        paddingTop: '3rem',
                      })}
                      render={({ className, }) => (
                        <div className={className}>
                          <Time time={item.pubDate} format="HH:mm" />
                        </div>
                      )}
                    />
                    <FelaComponent
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
                        marginTop: '5rem',
                      }}
                      size={3}
                      buttons={[
                        {
                          name: 'facebookLogo',
                          buttonText: 78,
                          iconStyles: {
                            color: theme.color('primary'),
                          },
                        },
                        {
                          name: 'whatsapp',
                          iconStyles: {
                            color: theme.color('primary'),
                          },
                        },
                        {
                          name: 'mail',
                          iconStyles: {
                            color: theme.color('primary'),
                          },
                        },
                      ]}
                      vertical
                    />
                  </GridItem>
                  <GridItem
                    width={3 / 4}
                    miscStyles={{
                      paddingTop: '3rem',
                      paddingBottom: '4rem',
                      paddingInlineEnd: '6rem',
                      maxWidth: '69rem',
                    }}
                  >
                    {/* <div style={{ fontWeight: 'bold', }}>{item.title}</div> */}
                    <a href={`#${item.contentId}`}>
                      <h1>{item.title}</h1>
                    </a>
                    <ArticleBody body={item.body} showSurvey={false} />
                  </GridItem>
                </Grid>
              ))}
            </div>
          )}
        />
      </Fragment>
    );
  }
}

export default LiveBlogContainer;
