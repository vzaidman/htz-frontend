webpackJsonp([6],{1190:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n(457),i=n.n(r),o=n(103),a=n.n(o),u=n(3),l=function(){return function(e,t){if(Array.isArray(e))return e;if(i()(Object(e)))return function sliceIterator(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var u,l=a()(e);!(r=(u=l.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(i)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=Object(u.c)(function videoWrapper(e){var t=e.aspectRatio,n=e.nyt,r=t?t.split("/"):[16,9],i=l(r,2),o=i[0];return{margin:"0",paddingBottom:i[1]/o*100+"%",height:"0",overflow:"hidden",position:"relative",paddingTop:n?"69px":""}},"figure")},1191:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var r=n(74),i=n.n(r),o=n(3),a=Object(o.c)(function videoElement(){return{margin:"0",padding:"0",height:"100% !important",width:"100% !important",left:"0",top:"0",position:"absolute",display:"block",border:"none"}},"iframe",function(e){return i()(e)})},468:function(e,t,n){"use strict";function NYT(e){return i.a.createElement(a.a,{aspectRatio:"16/9",nyt:!0,__source:{fileName:l,lineNumber:31}},i.a.createElement(u.a,{title:"New York Times Video - Embed Player",width:"auto",frameBorder:"0",scrolling:"no",allowFullScreen:"true",marginHeight:"0",marginWidth:"0",id:"nyt_video_player",src:e.content,onLoad:e.onLoadCallback,__source:{fileName:l,lineNumber:32}}))}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n.n(r),o=n(1),a=(n.n(o),n(1190)),u=n(1191),l="src/components/Embed/elements/NYT.js";NYT.defaultProps={onLoadCallback:null},t.default=NYT}});