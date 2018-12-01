/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.PinterestEmbed,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */
/* global doBuild */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { appendScript, } from '../../../utils/scriptTools';

// eslint-disable-next-line react/prop-types
const PinterestWrapper = ({ embedType, children, }) => {
  const width = embedType === 'pin' ? 'auto' : '100%';
  return (
    <FelaComponent
      style={{
        margin: '0 0 -3px',
        direction: 'ltr',
        width,
      }}
    >
      {children}
    </FelaComponent>
  );
};

const updateScript = () => {
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
    const { embedType: type, source, settings: { showCaption, }, } = this.props;

    const tag = type === 'pin' ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        data-pin-do="embedPin"
        data-pin-width="large"
        data-pin-terse={showCaption ? 'true' : 'false'}
        href={source}
      />
    ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        data-pin-do={type === 'board' ? 'embedBoard' : 'embedUser'}
        data-pin-board-width="350"
        data-pin-scale-height="500"
        data-pin-scale-width="240"
        href={source}
      />
    );
    return <PinterestWrapper>{tag}</PinterestWrapper>;
  }
}
