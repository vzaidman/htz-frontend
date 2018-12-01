import { createComponent, } from 'react-fela';

const videoElement = () => ({
  margin: '0',
  padding: '0',
  height: '100% !important',
  width: '100% !important',
  left: '0',
  top: '0',
  position: 'absolute',
  display: 'block',
  border: 'none',
});

export const VideoElement = createComponent(videoElement, 'iframe', props => Object.keys(props)
);
