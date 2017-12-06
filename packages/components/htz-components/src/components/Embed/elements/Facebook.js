/* globals FB */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Caption from '../Caption';
import { appendScript, } from '../lib/scriptTools';

const facebookWrapper = props => {
  const { type, } = props;

  const width =
    type === 'post' ? '552px' : type === 'comment' ? '620px' : '100%';

  return {
    width,
    margin: '0 auto',
  };
};

const FacebookWrapper = createComponent(facebookWrapper, 'figure');

const initScript = () => {
  FB.init({
    appId: '110687712359084',
    status: true,
    xfbml: true,
    version: 'v2.9',
  });
};

export default class Facebook extends React.Component {
  static propTypes = {
    inputTemplate: PropTypes.string.isRequired,
    embedType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    caption: PropTypes.string,
    credit: PropTypes.string,
    settings: PropTypes.shape({
      showText: PropTypes.bool,
      width: PropTypes.string,
      height: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    caption: '',
    credit: '',
  };

  componentWillMount() {
    const src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9';
    const async = true;
    const id = 'facebook-jssdk';

    appendScript(src, id, async, initScript);
  }

  render() {
    const type = this.props.embedType;
    const showText = this.props.settings.showText || false;

    const tag =
      type === 'post' ? (
        <div className="fb-post" data-width="" data-href={this.props.content} />
      ) : type === 'comment' ? (
        <div
          className="fb-comment-embed"
          data-width="auto"
          data-href={this.props.content}
        />
      ) : (
        <div
          className="fb-video"
          data-width="auto"
          data-href={this.props.content}
          data-allowfullscreen="true"
          data-autoplay="false"
          data-show-text={showText}
        />
      );

    return (
      <FacebookWrapper type={this.props.embedType}>
        {tag}
        <Caption
          caption={this.props.caption}
          credit={this.props.credit}
          inputTemplate={this.props.inputTemplate}
          embedType={this.props.embedType}
        />
      </FacebookWrapper>
    );
  }
}
