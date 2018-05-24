import React from 'react';
import PropTypes from 'prop-types';

import MessageBlock from './MessageBlock';

class Announcer extends React.Component {
  static propTypes = {
    politeMessage: PropTypes.string,
    assertiveMessage: PropTypes.string,
  };

  static defaultProps = {
    politeMessage: '',
    assertiveMessage: '',
  };

  state = {
    assertiveMessage1: '',
    assertiveMessage2: '',
    politeMessage1: '',
    politeMessage2: '',
  };

  componentWillReceiveProps(nextProps) {
    const {
      politeMessage: oldPoliteMessage,
      assertiveMessage: oldAssertiveMessage,
    } = this.props;
    const { politeMessage, assertiveMessage, } = nextProps;

    if (oldPoliteMessage !== politeMessage) {
      this.setState({
        politeMessage1: this.setAlternatePolite ? '' : politeMessage,
        politeMessage2: this.setAlternatePolite ? politeMessage : '',
      });
      this.setAlternatePolite = !this.setAlternatePolite;
    }

    if (oldAssertiveMessage !== assertiveMessage) {
      this.setState({
        assertiveMessage1: this.setAlternateAssertive ? '' : assertiveMessage,
        assertiveMessage2: this.setAlternateAssertive ? assertiveMessage : '',
      });
      this.setAlternateAssertive = !this.setAlternateAssertive;
    }
  }

  setAlternatePolite = false;
  setAlternateAssertive = false;

  render() {
    const {
      assertiveMessage1,
      assertiveMessage2,
      politeMessage1,
      politeMessage2,
    } = this.state;
    return (
      <div>
        <MessageBlock aria-live="assertive" message={assertiveMessage1} />
        <MessageBlock aria-live="assertive" message={assertiveMessage2} />
        <MessageBlock aria-live="polite" message={politeMessage1} />
        <MessageBlock aria-live="polite" message={politeMessage2} />
      </div>
    );
  }
}

export default Announcer;
