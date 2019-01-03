/* global window navigator location */
import { Component, } from 'react';
import { appendScript, } from '../../utils/scriptTools';

// orogonal script from polopoly:
/* <script type="text/javascript" defer>
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0011/5351.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
</script> */

class CrazyEgg extends Component {
  componentDidMount() {
    appendScript({
      id: 'carzy_egg',
      src: `https://script.crazyegg.com/pages/scripts/0011/5351.js?${Math.floor(
        new Date().getTime() / 3600000
      )}`,
      isAsync: true,
      attributes: { type: 'text/javascript', },
    });
  }

  render() {
    return null;
  }
}

export default CrazyEgg;
