webpackJsonp([8],{1190:function(e,n,t){"use strict";t.d(n,"a",function(){return s});var r=t(457),i=t.n(r),o=t(103),a=t.n(o),u=t(3),c=function(){return function(e,n){if(Array.isArray(e))return e;if(i()(Object(e)))return function sliceIterator(e,n){var t=[],r=!0,i=!1,o=void 0;try{for(var u,c=a()(e);!(r=(u=c.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(i)throw o}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=Object(u.c)(function videoWrapper(e){var n=e.aspectRatio,t=e.nyt,r=n?n.split("/"):[16,9],i=c(r,2),o=i[0];return{margin:"0",paddingBottom:i[1]/o*100+"%",height:"0",overflow:"hidden",position:"relative",paddingTop:t?"69px":""}},"figure")},1191:function(e,n,t){"use strict";t.d(n,"a",function(){return a});var r=t(74),i=t.n(r),o=t(3),a=Object(o.c)(function videoElement(){return{margin:"0",padding:"0",height:"100% !important",width:"100% !important",left:"0",top:"0",position:"absolute",display:"block",border:"none"}},"iframe",function(e){return i()(e)})},460:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(74),i=t.n(r),o=t(19),a=t.n(o),u=t(34),c=t.n(u),s=t(35),l=t.n(s),p=t(20),d=t.n(p),f=t(17),b=t.n(f),h=t(2),m=t.n(h),v=t(0),y=t.n(v),g=t(1),_=(t.n(g),t(1190)),w=t(1191),M="src/components/Embed/elements/ArtiMedia.js",A=m.a||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},E=function(){function defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),b()(e,r.key,r)}}return function(e,n,t){return n&&defineProperties(e.prototype,n),t&&defineProperties(e,t),e}}(),k=function(e){function ArtiMedia(){return function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,ArtiMedia),function _possibleConstructorReturn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==(void 0===n?"undefined":d()(n))&&"function"!=typeof n?e:n}(this,(ArtiMedia.__proto__||a()(ArtiMedia)).apply(this,arguments))}return function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+(void 0===n?"undefined":d()(n)));e.prototype=l()(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(c.a?c()(e,n):e.__proto__=n)}(ArtiMedia,y.a.Component),E(ArtiMedia,[{key:"componentDidMount",value:function componentDidMount(){var e=this,n=document.createElement("script");n.src="//p.artipbox.net/amapi.js",n.async=!0,document.body.appendChild(n);var t={};i()(this.props.settings).forEach(function(n){t[n]=e.props.settings[n].replace(/'/g,"")}),n.addEventListener("load",function(){embedArtiPlayer(A({targetId:t.playerId},t)),e.props.onLoadCallback&&e.props.onLoadCallback()})}},{key:"render",value:function render(){var e=this.props.settings.playerId;return y.a.createElement(_.a,{aspectRatio:"16/9",__source:{fileName:M,lineNumber:62}},y.a.createElement(w.a,{as:"div",id:e,className:"arti-media-video",artiMedia:!0,__source:{fileName:M,lineNumber:63}}))}}]),ArtiMedia}();k.defaultProps={onLoadCallback:null},n.default=k}});