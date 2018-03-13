/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';

import { appendScript, } from '../../utils/scriptTools';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import Osaka from './Osaka';
import WrappedScroll from '../Scroll/Scroll';

const propTypes = {
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * The scroll speed and direction (Y axis), as brought to us by: [`Scroll`](./#scroll)
   */
  velocity: PropTypes.number.isRequired,
};

const wrapperStyle = ({ shouldDisplay, theme, }) => ({
  transform: `translateY(${shouldDisplay ? '0' : '-100'}%)`,
  top: '0',
  position: 'fixed',
  width: '100%',
  left: '0',
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
    appendScript(
      '//widgets.outbrain.com/outbrain.js',
      'outbrain-widget',
      false,
      this.getArticles
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const breakPointChange = nextState.breakPoint !== this.state.breakPoint;
    const articlesChange = nextState.articles !== this.state.articles;
    const scrollChange =
      // prettier-ignore
      (nextProps.velocity > 0) !== this.state.display;
    return articlesChange || breakPointChange || scrollChange;
  }

  componentWillUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ display: nextProps.velocity > 0, });
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
    console.log(this.state.breakPoint, this.state.articles);
    return this.state.breakPoint && this.state.articles ? (
      <Wrapper shouldDisplay={this.state.display}>
        <Osaka
          nextArticleUrl="2.351"
          sectionName="חדשות"
          bp={this.state.breakPoint}
          lists={{
            outbrain: this.state.articles.outbrain,
            promoted: [
              {
                exclusive: '',
                title: 'חמש להקות ישראליות שאסור לכם לפספס',
                image: {
                  alt: 'לברוב בכנס הביטחון במינכן, היום',
                  credit: ' RALPH ORLOWSKI/רויטרס',
                  title: 'לברוב בכנס הביטחון במינכן, היום',
                  aspects: {
                    regular: {
                      width: 1918,
                      height: 1438,
                      x: 196,
                      y: 12,
                    },
                    headline: {
                      width: 2184,
                      height: 1270,
                      x: 16,
                      y: 27,
                    },
                    square: {
                      width: 1428,
                      height: 1426,
                      x: 678,
                      y: 24,
                    },
                  },
                  isAnimated: false,
                  imgArray: [
                    {
                      imgName: 'image/3837301089.jpg',
                      version: '1518875453',
                    },
                  ],
                  imageType: 'image',
                  inputTemplate: 'com.tm.Image',
                  contentId: '1.5825441',
                  contentName: 'לברוב בכנס הביטחון במינכן, היום',
                },
                url: '',
              },
            ],
            local: this.state.articles.local,
          }}
        />
      </Wrapper>
    ) : null;
  }
}

OsakaWrapper.propTypes = propTypes;

function OsakaController() {
  const StyledOsaka = withTheme(OsakaWrapper);
  return (
    <WrappedScroll
      render={({ velocity, }) => <StyledOsaka velocity={velocity} />}
    />
  );
}

export default OsakaController;
