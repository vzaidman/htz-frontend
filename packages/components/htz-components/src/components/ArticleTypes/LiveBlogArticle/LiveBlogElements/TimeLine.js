import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Time from '../../../Time/Time';
// import Grid from '../../../Grid/Grid';
// import GridItem from '../../../Grid/GridItem';

const propTypes = {
  timeLineItems: PropTypes.arrayOf(
    PropTypes.shape({
      keyEvent: PropTypes.string,
      pubDate: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
//   miscStyles: stylesPropType,
};

// const defaultProps = {
//   miscStyles: null,
// };

const itemStyle =  ({ theme, displayBorderInMBreak, itemBorderTop, }) => ({
    paddingInlineEnd: '2rem',
    //change this border
    borderLeft: '1px solid #bbb',
    
    // > h2 {
    //   position: 'relative',
    
    //   ':before': {
    //     position: absolute;
    //     content: "";
    //     width: 7px;
    //     height: 7px;
    //     background-color: #eee;
    //     border: 1px solid #bbb;
    //     top: 50%;
    //     left: -12px;
    //     border-radius: 50%;
    //     transform: translate(-50%,-50%);
    //   }
    // }
  
    // &--first,
    // &--last {
    //   position: relative;
      
    //   &:before {
    //     background-color: #fff;
    //     position: absolute;
    //     content: "";
    //     width: 7px;
    //     left: 0;
    //     transform: translate(-50%,0);
    //   }
      
    //   > h2::before {
    //     content: none;
    //   }
    // }
    
    // &--first::before {
    //   height: .5em;
    //   top: 0;
    //   border-bottom: 1px solid #bbb;
    // }
      
    // &--last {
    //   padding-bottom: 0;
    //   &:before {
    //     height: calc(100% - 0.5em);
    //     border-top: 1px solid #bbb;
    //     top: 0.5em;
    //   }
    // }
})
function TimeLine({ timeLineItems, }) {
  return (
    <React.Fragment>
     <ul>
       {timeLineItems.map((item, i) => {
          return(
            <FelaComponent
                rule={itemStyle}
                render={({ className, }) => (
                  <li className={className}>
                    <h2><Time time={item.pubDate} format="HH:mm" /></h2>
                    <p>{item.keyEvent}</p>
                  </li>
                )}
              />
           )
        })  
      }
     </ul>
   </React.Fragment>
  );
}

TimeLine.propTypes = propTypes;
// TimeLine.defaultProps = defaultProps;

export default TimeLine;
