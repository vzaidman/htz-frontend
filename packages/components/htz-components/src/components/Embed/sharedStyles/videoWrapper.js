import { createComponent, } from 'react-fela';

const videoWrapper = ({ aspectRatio, nyt, }) => {
  const [ width, height, ] = aspectRatio ? aspectRatio.split('/') : [ 16, 9, ];
  // prettier-ignore
  const aspect = `${(height / width) * 100}%`;
  const paddingTop = nyt ? '69px' : '';

  return {
    margin: '0',
    paddingBottom: aspect,
    height: '0',
    overflow: 'hidden',
    position: 'relative',
    paddingTop,
  };
};

export const VideoWrapper = createComponent(videoWrapper, 'figure');
