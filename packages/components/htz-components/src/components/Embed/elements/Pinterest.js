/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.PinterestEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

const pinterestWrapper = props => {
  const width = props.embedType === 'pin' ? 'auto' : '100%';
  return {
    margin: '0 0 -3px',
    direction: 'ltr',
    width,
  };
};

const PinterestWrapper = createComponent(pinterestWrapper, 'figure', props =>
  Object.keys(props)
);

const updateScript = () => {
  // eslint-disable-next-line no-undef
  doBuild();
};

export default class Pinterest extends React.Component {
  static propTypes = {
    /**
     * The type of this pinterest element
     * ('pin', 'board' or 'profile').
     */
    embedType: PropTypes.string.isRequired,
    /**
     * Pinterest item's URL.
     */
    source: PropTypes.string.isRequired,
    settings: PropTypes.shape({
      /**
       * Should it display the item's caption ('false' || 'true').
       */
      showCaption: PropTypes.string,
    }).isRequired,
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
      src: '//assets.pinterest.com/js/pinit.js',
      id: 'pinterest-js',
      isAsync: true,
      onLoadFunction: this.props.onLoadCallback,
      updateFunction: updateScript,
      attributes: {
        'data-pin-build': 'doBuild',
      },
    });
  }

  render() {
    const type = this.props.embedType;

    const tag =
      type === 'pin' ? (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          data-pin-do="embedPin"
          data-pin-width="large"
          data-pin-terse={this.props.settings.showCaption ? 'true' : 'false'}
          href={this.props.source}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          data-pin-do={type === 'board' ? 'embedBoard' : 'embedUser'}
          data-pin-board-width="350"
          data-pin-scale-height="500"
          data-pin-scale-width="240"
          href={this.props.source}
        />
      );
    return <PinterestWrapper>{tag}</PinterestWrapper>;
  }
}
