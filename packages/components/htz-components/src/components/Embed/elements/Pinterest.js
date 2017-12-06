import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';
import { appendScript, } from '../lib/scriptTools';

const pinterestWrapper = props => {
  const width = props.embedType === 'pin' ? 'auto' : '100%';
  return {
    textAlign: 'center',
    margin: '0 0 -3px',
    direction: 'ltr',
    width,
  };
};

const PinterestWrapper = createComponent(pinterestWrapper, 'figure', props =>
  Object.keys(props)
);

export default class Pinterest extends React.Component {
  static propTypes = {
    inputTemplate: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
    settings: PropTypes.shape({
      showCaption: PropTypes.bool,
    }).isRequired,
  };

  static defaultProps = {
    caption: '',
    credit: '',
  };

  componentDidMount() {
    const src = '//assets.pinterest.com/js/pinit.js';
    const async = true;
    const id = 'pinterest-js';

    appendScript(src, id, async);
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
          href={this.props.content}
        />
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          data-pin-do={type === 'board' ? 'embedBoard' : 'embedUser'}
          data-pin-board-width="350"
          data-pin-scale-height="500"
          data-pin-scale-width="240"
          href={this.props.content}
        />
      );
    return (
      <PinterestWrapper>
        {tag}
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </PinterestWrapper>
    );
  }
}
