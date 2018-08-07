/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import { appendScript, } from '../../utils/scriptTools';
import { fromCache, } from './queries/getData';
import WrappedScroll from '../Scroll/Scroll';
import OsakaWrapper from './OsakaWrapper';

const propTypes = {
  /**
   * This is an array of clickTrackers data objects.
   */
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class OsakaWithOutbrain extends React.Component {
  state = {
    articles: null,
  };

  componentDidMount() {
    appendScript({
      src: '//widgets.outbrain.com/outbrain.js',
      id: 'outbrain-widget',
      isAsync: false,
      onLoadFunction: this.getArticles,
      updateFunction: this.getArticles,
    });
  }

  getArticles = () => {
    // eslint-disable-next-line react/prop-types
    const { promotedElement, hostname, canonicalUrl, } = this.props;
    const url = canonicalUrl ? this.changeSubDomain(canonicalUrl) : '';
    const promoted = promotedElement[0].banners[0];
    const siteKey = this.keys.get(hostname);
    OBR &&
      OBR.extern.callRecs(
        {
          permalink: url,
          installationKey: siteKey,
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
                  title: promoted.text || '',
                  image: promoted.clicktrackerimage,
                  url: promoted.link,
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

  keys = new Map([
    [ 'haaretz.co.il', 'HAAREPDLHNAQD24GF05E6D3F5', ],
    [ 'themarker.com', 'THEMA156KEJ20O1N23B59L29D', ],
  ]);

  // TODO: Temporary until outbrain will ignore the subDomain
  changeSubDomain = url => {
    const subDomain = url.match(
      /^https?:\/\/(\S+)\.(?:(?:haaretz)|(?:themarker))/
    )[1];
    return subDomain === 'www' ? url : url.replace(subDomain, 'www');
  };

  render() {
    const { articles, } = this.state;
    return articles ? <OsakaWrapper {...{ ...this.props, articles, }} /> : null;
  }
}

// eslint-disable-next-line react/prop-types
const OsakaWithApollo = ({ articleId, ...props }) => (
  <Query query={fromCache} variables={{ path: articleId, }}>
    {({ loading, error, data, }) => {
      if (loading) return null;
      if (error) return null;
      const {
        page: { seoData: { canonicalUrl, }, },
        hostname,
        articleParent,
      } = data;
      const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
      return (
        <OsakaWithOutbrain
          {...{ ...props, articleParent, host, canonicalUrl, }}
        />
      );
    }}
  </Query>
);

// eslint-disable-next-line react/prop-types
function OsakaController({ items, articleId, }) {
  return (
    <WrappedScroll
      render={scrollProps => (
        <OsakaWithApollo
          {...{ ...scrollProps, promotedElement: items, articleId, }}
        />
      )}
    />
  );
}

OsakaController.propTypes = propTypes;

export default OsakaController;
