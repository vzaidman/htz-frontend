/* *************************************************************** *
 * This element accepts these inputTemplates:
[
com.polobase.TlineEmbed,
]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../../Caption/Caption';
import { appendScript, } from '../../../utils/scriptTools';

const tlineWrapper = () => ({
  textAlign: 'center',
  margin: '0 auto',
});

const TlineWrapper = createComponent(tlineWrapper, 'figure', props =>
  Object.keys(props)
);

export default class Tline extends React.Component {
  static propTypes = {
    /**
     * The settings values extracted from the Tline source code.
     */
    settings: PropTypes.shape({
      src: PropTypes.string.isRequired,
      'data-alias': PropTypes.string.isRequired,
      'data-version': PropTypes.string.isRequired,
    }).isRequired,
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
    const src = 'https://tline.io/assets/js/release/loader.js';
    const async = true;
    const id = 'tline-js';

    appendScript(src, id, async);
  }

  render() {
    const settings = this.props.settings;
    const src = settings.src;
    const alias = settings['data-alias'];
    const version = settings['data-version'];

    return (
      <TlineWrapper
        data-alias={alias}
        data-version={version}
        className="tline-iframe op-interactive"
      >
        <iframe
          title="video embed"
          className="tline-iframe-nojs"
          src={src}
          height="700"
          width="100%"
          scrolling="yes"
          frameBorder="0"
        />
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
        />
      </TlineWrapper>
    );
  }
}
