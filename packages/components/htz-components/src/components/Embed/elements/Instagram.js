/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';
import { appendScript, } from '../lib/scriptTools';

const instagramWrapper = () => ({
  width: '661px',
  clear: 'both',
  overflow: 'hidden',
  position: 'relative',
  margin: '0 auto',
  marginBottom: '-12px',
});

const InstagramWrapper = createComponent(instagramWrapper, 'figure', props =>
  Object.keys(props)
);

export default class Instagram extends React.Component {
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
    const src = '//platform.instagram.com/en_US/embeds.js';
    const async = true;
    const id = 'instagram-js';

    appendScript(src, id, async);
  }

  render() {
    return (
      <InstagramWrapper>
        <div dangerouslySetInnerHTML={{ __html: this.props.content, }} />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </InstagramWrapper>
    );
  }
}
