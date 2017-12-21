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
import Caption from '../../Caption/Caption';
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
  };

  componentDidMount() {
    const src = '//platform.instagram.com/en_US/embeds.js';
    const async = true;
    const id = 'instagram-js';

    appendScript(src, id, async, null, updateScript);
  }

  render() {
    return (
      <InstagramWrapper>
        <div dangerouslySetInnerHTML={{ __html: this.props.content, }} />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
        />
      </InstagramWrapper>
    );
  }
}
