import React from 'react';

class FirstImpressionPlaceholder extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="FI_PH" />;
  }
}

export default FirstImpressionPlaceholder;
