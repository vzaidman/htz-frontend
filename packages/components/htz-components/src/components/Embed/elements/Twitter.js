/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.TwitterEmbed,
]
 * *************************************************************** */

/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../../Caption/Caption';
import { appendScript, } from '../../../utils/scriptTools';

const twitterWrapper = ({ embedType, }) => {
  let maxWidth;
  let height;

  switch (embedType) {
    case 'collection timeline':
    case 'moment':
      maxWidth = '100%';
      break;

    case 'search timeline':
      maxWidth = '520px';
      height = 'auto';
      break;

    case 'video':
      maxWidth = 'auto';
      height = 'auto';
      break;

    case 'single tweet':
      maxWidth = '500px';
      height = 'auto';
      break;

    default:
      maxWidth = '550px';
  }
  return {
    maxWidth,
    overflow: 'auto',
    height: height || '400px',
    maxHeight: '800px',
    position: 'relative',
    margin: '0 auto',
    '& .twitter-tweet': {
      marginBottom: '0!important',
    },
  };
};

const TwitterWrapper = createComponent(twitterWrapper, 'figure');

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
    content: PropTypes.string.isRequired,
    /**
     * A function to be called when the element finishes to load.
     */
    onLoadCallback: PropTypes.func,
    /**
     * Caption for this element (Passes down to the [***Caption***](./#caption) component).
     */
    caption: PropTypes.string,
    /**
     * Credit (Passes, along with the Caption, down to the [***Caption***](./#caption) component).
     */
    credit: PropTypes.string,
  };

  static defaultProps = {
    caption: '',
    credit: '',
    onLoadCallback: null,
  };

  componentDidMount() {
    const src = '//platform.twitter.com/widgets.js';
    const async = true;
    const id = 'twitter-js';
    /* istanbul ignore next */
    appendScript(src, id, async, this.initScript, this.updateScript);
  }

  initScript = () => {
    twttr.events.bind(
      'rendered', event => {
        console.log('twitter embed is loaded');
        this.props.onLoadCallback ? this.props.onLoadCallback() : '';
      }
    );
  };

  updateScript = () => {
    twttr.widgets.load();
  };

  render() {
    const { content, } = this.props;

    return (
      <TwitterWrapper embedType={this.props.embedType}>
        <div dangerouslySetInnerHTML={{ __html: content, }} />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
        />
      </TwitterWrapper>
    );
  }
}
