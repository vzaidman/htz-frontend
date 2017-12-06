import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';
import { appendScript, } from '../lib/scriptTools';

const playBuzzWrapper = () => ({
  width: '100%',
  overflow: 'auto',
  maxHeight: '700px',
  position: 'relative',
  margin: '0 auto',
});

const PlayBuzzWrapper = createComponent(playBuzzWrapper, 'figure', props =>
  Object.keys(props)
);

export default class PlayBuzz extends React.Component {
  static propTypes = {
    inputTemplate: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
    settings: PropTypes.shape({
      'data-item': PropTypes.string.isRequired,
      facebook: PropTypes.bool.isRequired,
      share: PropTypes.bool.isRequired,
      recommendations: PropTypes.bool.isRequired,
      'data-embed-by': PropTypes.string.isRequired,
      'data-version': PropTypes.string.isRequired,
      info: PropTypes.bool.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    caption: '',
    credit: '',
  };

  componentDidMount() {
    const src = '//cdn.playbuzz.com/widget/feed.js';
    const async = true;
    const id = 'playbuzz-js';

    appendScript(src, id, async);
  }

  render() {
    const settings = this.props.settings;
    const info = settings.info || false;
    const share = settings.share || false;
    const facebook = settings.facebook || false;
    const recommendations = settings.recommendations || false;

    const dataItem =
      settings['data-item'].substring(
        settings['data-item'].indexOf('"') + 1,
        settings['data-item'].lastIndexOf('"')
      ) || '';
    const dataEmbedBy =
      settings['data-embed-by'].substring(
        settings['data-embed-by'].indexOf('"') + 1,
        settings['data-embed-by'].lastIndexOf('"')
      ) || '';
    const dataVersion =
      settings['data-version'].substring(
        settings['data-version'].indexOf('"') + 1,
        settings['data-version'].lastIndexOf('"')
      ) || '';

    return (
      <PlayBuzzWrapper>
        <div
          className="pb_feed"
          data-item={dataItem}
          data-embed-by={dataEmbedBy}
          data-version={dataVersion}
          data-game-info={info}
          data-shares={share}
          data-comments={facebook}
          data-recommend={recommendations}
        />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </PlayBuzzWrapper>
    );
  }
}
