import React from 'react';

class OutbrainPlaceholder extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        className="OUTBRAIN"
        data-src="DROP_PERMALINK_HERE"
        data-widget-id="AR_34"
        data-ob-template="haaretz-heb"
      />
    );
  }
}

export default OutbrainPlaceholder;
