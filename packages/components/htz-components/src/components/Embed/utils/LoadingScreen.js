import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

const loadingStyle = ({ height, opacity, }) => ({
  width: '100%',
  height,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(0,0,0,0.5)',
  opacity,
  position: 'absolute',
  transition: `opacity 1s, height 0.5s linear ${opacity === '0' ? ' 1s' : ''}`,
  zIndex: '6',
});

const Loading = createComponent(loadingStyle, 'div', props => Object.keys(props)
);

const wrapperStyle = ({ props, }) => ({
  width: '150px',
  height: '150px',
  transform: 'translate(-50%, -50%)',
  left: '50%',
  top: '50%',
  position: 'absolute',
  display: props,
});

const Wrapper = createComponent(wrapperStyle, 'div', props => Object.keys(props)
);

const spinnerRotation = () => ({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const spinnerStyle = (props, renderer) => ({
  width: '100%',
  height: '100%',
  borderWidth: '4px 6px 8px 6px',
  borderStyle: 'dotted',
  borderColor: 'white',
  borderRadius: '50%',
  animationName: renderer.renderKeyframe(spinnerRotation),
  animationDuration: '3s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});

const Spinner = createComponent(spinnerStyle, 'div', props => Object.keys(props)
);

const textStyle = () => ({
  fontSize: '3rem',
  fontWeight: '700',
  color: 'white',
  textAlign: 'center',
  marginTop: '1rem',
  letterSpacing: '2px',
});

const Text = createComponent(textStyle, 'p', props => Object.keys(props));

export default class LoadingScreen extends React.Component {
  componentStatus = {
    height: '0',
    opacity: '0',
    display: 'none',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      this.componentStatus.opacity = '1';
      this.componentStatus.display = 'block';
      this.componentStatus.height = '100%';
    }
    else {
      this.componentStatus.opacity = '0';
      this.componentStatus.display = 'none';
      this.componentStatus.height = '0';
    }
  }

  render() {
    return (
      <Loading {...this.componentStatus}>
        <Wrapper props={this.componentStatus.display}>
          <Spinner />
          <Text>{this.props.loadingMessage}</Text>
        </Wrapper>
      </Loading>
    );
  }
}

LoadingScreen.propTypes = {
  loadingMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

LoadingScreen.defaultProps = {
  loadingMessage: 'Loading',
  isLoading: false,
};
