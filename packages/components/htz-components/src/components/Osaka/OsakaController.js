/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { graphql, compose, } from 'react-apollo';

import { appendScript, } from '../../utils/scriptTools';
import ListQuery from './queries/fetchList';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import Osaka from './Osaka';
import WrappedScroll from '../Scroll/Scroll';

const propTypes = {
  /**
   * Passed implicitly by Apollo, not directly as an attribute on the component
   */
  data: PropTypes.shape({
    /** Indicates data loading state */
    loading: PropTypes.bool,
    /** Indicates data error state */
    error: PropTypes.bool,
    list: PropTypes.object,
  }).isRequired,
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * The scroll speed and direction (Y axis), as brought to us by: [`Scroll`](./#scroll)
   */
  velocity: PropTypes.number,
  width: PropTypes.number,
};

const defaultProps = {
  velocity: null,
  width: null,
};

const wrapperStyle = ({ shouldDisplay, width, theme, }) => ({
  transform: `translate(50%, ${shouldDisplay ? '0' : '-100'}%)`,
  top: '0',
  position: 'fixed',
  width: width ? `${width}px` : '100%',
  start: '50%',
  zIndex: '6',
  transitionProperty: 'transform',
  ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
});
const Wrapper = createComponent(wrapperStyle);

class OsakaWrapper extends React.Component {
  state = {
    display: false,
    breakPoint: null,
    articles: null,
  };

  componentDidMount() {
    this.setBreakPoint();
    appendScript({
      src: '//widgets.outbrain.com/outbrain.js',
      id: 'outbrain-widget',
      isAsync: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const breakPointChange = nextState.breakPoint !== this.state.breakPoint;
    const articlesChange = nextState.articles !== this.state.articles;
    const apolloChange = nextProps.data.loading !== this.props.data.loading;
    const scrollChange =
      // prettier-ignore
      (nextProps.velocity > 0) !== this.state.display;
    return articlesChange || breakPointChange || apolloChange || scrollChange;
  }

  componentWillUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ display: nextProps.velocity > 0, });

    !this.props.data.loading &&
      !this.state.articles &&
      typeof OBR !== 'undefined' &&
      this.getArticles();
  }

  getArticles = () => {
    OBR &&
      OBR.extern.callRecs(
        {
          permalink:
            'https://www.haaretz.co.il/news/world/america/.premium-1.5889230',
          installationKey: 'HAAREPDLHNAQD24GF05E6D3F5',
          widgetId: 'APP_1',
        },
        json => {
          const articles = json.doc;
          const promoted = this.props.data.list.items;
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
          // eslint-disable-next-line no-undef
          window.addEventListener('resize', evt => this.setBreakPoint());
        }
      );
  };

  setBreakPoint = () => {
    this.setState({
      // eslint-disable-next-line react/prop-types
      breakPoint: mediaMatchesQuery(this.props.theme.bps, {
        queries: [
          { until: 'm', value: null, },
          { until: 'l', value: 'm', },
          { until: 'xl', value: 'l', },
          { from: 'xl', value: 'xl', },
        ],
      }),
    });
  };

  render() {
    if (this.props.data.loading) {
      return <div>loading ...</div>;
    }
    if (this.props.data.error) {
      return <h1>ERROR</h1>;
    }
    return this.state.breakPoint && this.state.articles ? (
      <Wrapper shouldDisplay={this.state.display} width={this.props.width}>
        <Osaka
          nextArticleUrl="2.351"
          sectionName="חדשות"
          bp={this.state.breakPoint}
          lists={{ ...this.state.articles, }}
        />
      </Wrapper>
    ) : null;
  }
}

OsakaWrapper.propTypes = propTypes;
OsakaWrapper.defaultProps = defaultProps;

// eslint-disable-next-line react/prop-types
function OsakaController({ data, width, }) {
  const StyledOsaka = withTheme(OsakaWrapper);
  return (
    <WrappedScroll
      render={({ velocity, }) => (
        <StyledOsaka width={width} data={data} velocity={velocity} />
      )}
    />
  );
}

export default compose(
  graphql(ListQuery, {
    options: props => ({
      variables: { path: '7.7473', },
    }),
    props: props => ({
      data: props.data,
    }),
  })
)(OsakaController);
