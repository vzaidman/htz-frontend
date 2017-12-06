/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';
import { appendScript, } from '../lib/scriptTools';

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
    inputTemplate: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
    content: PropTypes.string.isRequired,
  };

  static defaultProps = {
    caption: '',
    credit: '',
  };

  componentDidMount() {
    const src = '//platform.twitter.com/widgets.js';
    const async = true;
    const id = 'twitter-js';

    appendScript(src, id, async);
  }

  render() {
    const { content, } = this.props;

    return (
      <TwitterWrapper embedType={this.props.embedType}>
        <div dangerouslySetInnerHTML={{ __html: content, }} />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </TwitterWrapper>
    );
  }
}
