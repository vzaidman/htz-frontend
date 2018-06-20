/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { Query, } from 'react-apollo';

import { appendScript, } from '../../utils/scriptTools';
import ListQuery from './queries/fetchList';
import Media from '../Media/Media';
import Osaka from './Osaka';
import WrappedScroll from '../Scroll/Scroll';
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default

const propTypes = {
  /**
   * The scroll speed and direction (Y axis), as brought to us by: [`Scroll`](./#scroll)
   */
  velocity: PropTypes.number,
  y: PropTypes.number,
};

const defaultProps = {
  velocity: null,
  y: 0,
};

const wrapperStyle = ({ shouldDisplay, theme, }) => ({
  transform: `translateY(${shouldDisplay ? '0' : '-100'}%)`,
  transitionProperty: 'transform',
  ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
});
const Wrapper = createComponent(wrapperStyle);

class OsakaWrapper extends React.Component {
  state = {
    display: false,
    articles: null,
  };

  componentDidMount() {
    appendScript({
      src: '//widgets.outbrain.com/outbrain.js',
      id: 'outbrain-widget',
      isAsync: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const articlesChange = nextState.articles !== this.state.articles;
    const scrollChange =
      // prettier-ignore
      (nextProps.velocity > 0 && nextProps.y > 0) !== this.state.display;
    return articlesChange || scrollChange;
  }

  componentWillUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ display: nextProps.velocity > 0 && nextProps.y > 0, });
  }

  getArticles = promoted => {
    OBR &&
      OBR.extern.callRecs(
        {
          permalink:
            'https://www.haaretz.co.il/news/world/america/.premium-1.5889230',
          installationKey: 'HAAREPDLHNAQD24GF05E6D3F5',
          widgetId: 'APP_3',
        },
        json => {
          const articles = json.doc;
          this.setState({
            articles: {
              local: [
                {
                  title: articles[0].content,
                  image: articles[0].thumbnail.url,
                  url: articles[0].url,
                },
                {
                  title: articles[1].content,
                  image: articles[1].thumbnail.url,
                  url: articles[1].url,
                },
              ],
              promoted: [
                {
                  title: promoted[0].title,
                  image: promoted[0].image,
                  url: promoted[0].path,
                },
              ],
              outbrain: [
                {
                  title: articles[4].content,
                  image: articles[4].thumbnail.url,
                  url: articles[4].url,
                  sourceName: articles[4].source_display_name,
                },
              ],
            },
          });
        }
      );
  };

  render() {
    return (
      <Media
        query={{ from: 'm', }}
        render={() => (
          <Query query={ListQuery} variables={{ path: '7.7473', }}>
            {({ loading, error, data, }) => {
              if (loading) return <p>loading...</p>;
              if (error) return null;
              !this.state.articles &&
                typeof OBR !== 'undefined' &&
                this.getArticles(data.list.items);
              return this.state.articles ? (
                <LayoutContainer
                  miscStyles={{
                    backgroundColor: 'transparent',
                    position: 'fixed',
                    start: '50%',
                    top: '0',
                    transform: 'translateX(50%)',
                    width: '100%',
                    zIndex: '6',
                  }}
                >
                  <Wrapper shouldDisplay={this.state.display}>
                    <Osaka
                      nextArticleUrl="2.351"
                      sectionName="חדשות"
                      lists={{ ...this.state.articles, }}
                    />
                  </Wrapper>
                </LayoutContainer>
              ) : null;
            }}
          </Query>
        )}
      />
    );
  }
}

OsakaWrapper.propTypes = propTypes;
OsakaWrapper.defaultProps = defaultProps;

// eslint-disable-next-line react/prop-types
function OsakaController() {
  return (
    <WrappedScroll
      render={({ velocity, y, }) => <OsakaWrapper velocity={velocity} y={y} />}
    />
  );
}

export default OsakaController;
