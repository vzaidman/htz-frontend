webpackJsonp([3],{1163:function(e,n,t){"use strict";t.d(n,"a",function(){return o});var a=t(102),r=t.n(a),i=t(3),o=Object(i.c)(function videoWrapper(e){var n=e.aspectRatio,t=e.nyt,a=n?n.split("/"):[16,9],i=r()(a,2),o=i[0];return{margin:"0",paddingBottom:i[1]/o*100+"%",height:"0",overflow:"hidden",position:"relative",paddingTop:t?"69px":""}},"figure")},1164:function(e,n,t){"use strict";t.d(n,"a",function(){return o});var a=t(73),r=t.n(a),i=t(3),o=Object(i.c)(function videoElement(){return{margin:"0",padding:"0",height:"100% !important",width:"100% !important",left:"0",top:"0",position:"absolute",display:"block",border:"none"}},"iframe",function(e){return r()(e)})},259:function(e,n,t){"use strict";function Waze(e){var n=e.settings,t=n.pin?"&pin=1":"",a=n.language,i=n.coordinates;return r.a.createElement(o.a,{__source:{fileName:u,lineNumber:47}},r.a.createElement(c.a,{width:"600",height:"450",src:"https://embed.waze.com/"+a+"/iframe"+i[0]+"&"+i[1]+"&"+i[2]+"&"+t,frameBorder:"0",allowFullScreen:"",onLoad:e.onLoadCallback,__source:{fileName:u,lineNumber:48}}))}Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),r=t.n(a),i=t(1),o=(t.n(i),t(1163)),c=t(1164),u="src/components/Embed/elements/Waze.js";Waze.defaultProps={onLoadCallback:null},n.default=Waze}});