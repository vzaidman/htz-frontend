/* globals OBR */
import React from 'react';
import { createComponent, withTheme, } from 'react-fela';

import { appendScript, } from '../../utils/scriptTools';
import mediaMatchesQuery from '../../utils/mediaMatchesQuery';
import Osaka from './Osaka';
import Scroll from '../Scroll/Scroll'; // eslint-disable-line import/no-named-as-default

const wrapperStyle = ({ shouldDisplay, theme, }) => ({
  top: shouldDisplay ? '0' : '-16rem',
  position: 'fixed',
  width: '100%',
  left: '0',
  zIndex: '6',
  transitionProperty: 'top',
  ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
});
const Wrapper = createComponent(wrapperStyle);

class OsakaWrapper extends React.Component {
  state = { display: false, breakPoint: null, outbrainArticle: null, };

  componentDidMount() {
    this.setBreakPoint();
    appendScript(
      '//widgets.outbrain.com/outbrain.js',
      'outbrain-widget',
      false,
      this.getOutBrain
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    const breakPointChange = nextState.breakPoint !== this.state.breakPoint;
    const outbrainChange =
      nextState.outbrainArticle !== this.state.outbrainArticle;
    const scrollChange =
      // prettier-ignore
      (nextProps.velocity > 0) !== this.state.display; // eslint-disable-line react/prop-types
    return breakPointChange || scrollChange || outbrainChange;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ display: nextProps.velocity > 0, });
  }

  getOutBrain = () => {
    OBR &&
      OBR.extern.callRecs(
        {
          permalink:
            'https://www.haaretz.co.il/news/world/america/.premium-1.5889230',
          installationKey: 'HAAREPDLHNAQD24GF05E6D3F5',
          widgetId: 'APP_1',
        },
        json => {
          const article = json.doc[4];
          this.setState({
            outbrainArticle: {
              title: article.content,
              imageUrl: article.thumbnail.url,
              url: article.url,
              sourceName: article.source_display_name,
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
    return this.state.breakPoint && this.state.outbrainArticle ? (
      <Wrapper shouldDisplay={this.state.display}>
        <Osaka
          nextArticleUrl="2.351"
          sectionName="חדשות"
          bp={this.state.breakPoint}
          lists={{
            outbrain: [ this.state.outbrainArticle, ],
            promoted: [
              {
                exclusive: '',
                title: 'חמש להקות ישראליות שאסור לכם לפספס',
                imageUrl:
                  'https://images.haarets.co.il/image/upload/w_1954,h_1464,x_16,y_4,c_crop,g_north_west/w_120,h_90,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1517220812/1.5769945.1760156483.jpg',
                url: '',
              },
            ],
            local: [
              {
                exclusive: 'דעות',
                title: 'בישראל של נתניהו אין גבול לבושה',
                imageUrl:
                  'https://images.haarets.co.il/image/upload/w_1954,h_1464,x_16,y_4,c_crop,g_north_west/w_120,h_90,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1517220812/1.5769945.1760156483.jpg',
                url: '',
              },
              {
                exclusive: 'גלריה',
                title: 'מסע היסטורי אל ההשמדה האידיאולוגית של עמי אפריקה',
                imageUrl:
                  'https://images.haarets.co.il/image/upload/w_1954,h_1464,x_16,y_4,c_crop,g_north_west/w_120,h_90,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1517220812/1.5769945.1760156483.jpg',
                url: '',
              },
            ],
          }}
        />
      </Wrapper>
    ) : null;
  }
}

function OsakaController() {
  const ThemedOsaka = withTheme(OsakaWrapper);
  return (
    <Scroll render={({ velocity, }) => <ThemedOsaka velocity={velocity} />} />
  );
}

export default OsakaController;
