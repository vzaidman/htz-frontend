webpackJsonp([6],{1163:function(e,t,o){"use strict";o.d(t,"a",function(){return r});var n=o(102),i=o.n(n),a=o(3),r=Object(a.c)(function videoWrapper(e){var t=e.aspectRatio,o=e.nyt,n=t?t.split("/"):[16,9],a=i()(n,2),r=a[0];return{margin:"0",paddingBottom:a[1]/r*100+"%",height:"0",overflow:"hidden",position:"relative",paddingTop:o?"69px":""}},"figure")},1164:function(e,t,o){"use strict";o.d(t,"a",function(){return r});var n=o(73),i=o.n(n),a=o(3),r=Object(a.c)(function videoElement(){return{margin:"0",padding:"0",height:"100% !important",width:"100% !important",left:"0",top:"0",position:"absolute",display:"block",border:"none"}},"iframe",function(e){return i()(e)})},251:function(e,t,o){"use strict";function GoogleMap(e){var t=e.settings,o=e.embedType,n=e.content,i=void 0,a=void 0,s=void 0,c=void 0,m=void 0,g=void 0,f="streetView"!==o&&t.zoom?"&zoom="+t.zoom:"",v="streetView"!==o&&t.satellite?"&maptype=satellite":"",h="static"===o?"place?q="+n:"search"===o?"search?q="+n:"directions"===o?"directions?origin="+n+"&destination="+t.destination:"streetView"===o?"streetview?location="+t.coordinates:"";"directions"===o?(i=t.waypoints?'&waypoints=("'+t.waypoints+'")':"",a="&mode="+t.mode,s="&units="+t.units):"streetView"===o&&(c=t.heading&&"none"!==t.heading?"&heading="+t.heading:"",m="&fov="+t.fov,g="&pitch="+t.pitch);return r.a.createElement(l.a,{__source:{fileName:u,lineNumber:142}},r.a.createElement(d.a,{width:"600",height:"450",src:"https://www.google.com/maps/embed/v1/"+h+"&key=AIzaSyBIAxVLUwr1Lls-usIxb0HxCRpCXMhJtlU&language="+t.language+(i||"")+(a||"")+(s||"")+(v||"")+(m||"")+(c||"")+(f||"")+(g||""),frameBorder:"0",allowFullScreen:"",onLoad:e.onLoadCallback,__source:{fileName:u,lineNumber:143}}),r.a.createElement(p,{onClick:function removeCover(e){e.target.remove()},__source:{fileName:u,lineNumber:154}}))}Object.defineProperty(t,"__esModule",{value:!0});var n=o(73),i=o.n(n),a=o(0),r=o.n(a),s=o(1),c=(o.n(s),o(3)),l=o(1163),d=o(1164),u="src/components/Embed/elements/GoogleMap.js";GoogleMap.defaultProps={onLoadCallback:null};var p=Object(c.c)(function mapCover(){return{bottom:"0",left:"0",right:"0",top:"0",cursor:"pointer",position:"absolute",zIndex:"1"}},"div",function(e){return i()(e)});t.default=GoogleMap}});