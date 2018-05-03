import { createComponent, } from 'react-fela';

const circleStyle = ({ theme, isHighlighted = false, }) => ({
  width: '2rem',
  height: '2rem',
  backgroundColor: '#2f872a',
  borderRadius: '50%',
});
export default createComponent(circleStyle);
