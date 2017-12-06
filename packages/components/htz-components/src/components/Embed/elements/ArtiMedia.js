/* globals window document */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';

const videoWrapper = ({ aspectRatio, }) => {
  const [ width, height, ] = aspectRatio ? aspectRatio.split('/') : [ 16, 9, ];
  const aspect = `${(height / width) * 100}%`;

  return {
    margin: '0',
    paddingBottom: aspect,
    height: '0',
    overflow: 'hidden',
    position: 'relative',
  };
};

const VideoWrapper = createComponent(videoWrapper, 'figure');

const videoElement = () => ({
  margin: '0',
  padding: '0',
  height: '100% !important',
  width: '100% !important',
  left: '0',
  top: '0',
  position: 'absolute',
  display: 'block',
  border: 'none',
});

const VideoElement = createComponent(videoElement, 'div', props =>
  Object.keys(props)
);

export default class ArtiMedia extends React.Component {
  static propTypes = {
    embedType: PropTypes.string.isRequired,
    inputTemplate: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
    settings: PropTypes.shape({
      publisherId: PropTypes.string.isRequired,
      sitekey: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      playerId: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    caption: '',
    credit: '',
  };

  componentDidMount() {
    const script = document.createElement('script');

    script.src = '//p.artipbox.net/amapi.js';
    script.async = true;

    document.body.appendChild(script);

    const settings = {};

    Object.keys(this.props.settings).forEach(key => {
      settings[key] = this.props.settings[key].replace(/'/g, '');
    });

    script.addEventListener('load', () =>
      // eslint-disable-next-line no-undef
      embedArtiPlayer({ targetId: settings.playerId, ...settings, })
    );
  }

  render() {
    const settings = this.props.settings;
    const playerId = settings.playerId;

    return (
      <div>
        <VideoWrapper aspectRatio={'16/9'}>
          <VideoElement id={playerId} className="arti-media-video" />
        </VideoWrapper>
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </div>
    );
  }
}
