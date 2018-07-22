/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.TwitterEmbed,
  ]
 * *************************************************************** */

/* eslint-disable react/no-danger */
/* globals twttr */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const TwitterWrapper = ({ embedType, children, }) => {
  let height;

  switch (embedType) {
    case 'collection timeline':
    case 'moment':
      break;

    case 'search timeline':
      height = 'auto';
      break;

    case 'video':
      height = 'auto';
      break;

    case 'single tweet':
      height = 'auto';
      break;

    default:
  }
  return (
    <FelaComponent
      style={{
        overflow: 'auto',
        height: height || '400px',
        maxHeight: '800px',
        position: 'relative',
        margin: '0 auto',
        '& .twitter-tweet': {
          marginBottom: '0!important',
        },
      }}
    >
      {children}
    </FelaComponent>
  );
};

export default class Twitter extends React.Component {
  static propTypes = {
    /**
     * The type of this twitter element
     * ('single tweet', 'video', 'search', etc).
     */
    embedType: PropTypes.string.isRequired,
    /**
     * Twitter's HTML tag (supplied by Twitter).
     */
    source: PropTypes.string.isRequired,
    /**
     * A function to be called when the element finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    /* istanbul ignore next */
    appendScript({
      src: '//platform.twitter.com/widgets.js',
      id: 'twitter-js',
      isAsync: true,
      onLoadFunction: this.initScript,
      updateFunction: this.updateScript,
    });
  }

  initScript = () => {
    twttr.events.bind('rendered', () => {
      console.log('twitter embed is loaded');
      this.props.onLoadCallback && this.props.onLoadCallback();
    });
  };

  updateScript = () => {
    twttr.widgets.load();
  };

  render() {
    const { source, embedType, } = this.props;

    return (
      <TwitterWrapper embedType={embedType}>
        <div dangerouslySetInnerHTML={{ __html: source, }} />
      </TwitterWrapper>
    );
  }
}
