/* global window */
/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.InstagramEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

const instagramWrapper = () => ({
  clear: 'both',
  overflow: 'hidden',
  position: 'relative',
  margin: '0 auto',
  marginBottom: '-12px',
});

const InstagramWrapper = createComponent(instagramWrapper, 'figure', props =>
  Object.keys(props)
);

const updateScript = () => {
  window.instgrm.Embeds.process();
};

export default class Instagram extends React.Component {
  static propTypes = {
    /**
     * Instagram's HTML tag (supplied by Instagram `<blockquote>....</blockquote>`).
     */
    content: PropTypes.string.isRequired,
    /**
     * A function to be called when the audio element finishes to load.
     */
    onLoadCallback: PropTypes.func,
  };

  static defaultProps = {
    onLoadCallback: null,
  };

  componentDidMount() {
    appendScript({
      src: '//platform.instagram.com/en_US/embeds.js',
      id: 'instagram-js',
      isAsync: true,
      onLoadFunction: this.props.onLoadCallback,
      updateFunction: updateScript,
    });
  }

  render() {
    return (
      <InstagramWrapper>
        <div dangerouslySetInnerHTML={{ __html: this.props.content, }} />
      </InstagramWrapper>
    );
  }
}
