webpackJsonp([12],{1397:function(n,e,t){"use strict";t.d(e,"a",function(){return i});var a=t(23),r=t.n(a),o={},i=function appendScript(n,e){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;if(o[e])o[e].isLoaded?i&&i():o[e].callbacks.push(a);else{var u=document.createElement("script");u.src=n,u.async=t,u.id=e,s&&r()(s).map(function(n){return u.setAttribute(n,s[n])}),document.body.appendChild(u),o[e]={tag:u,isLoaded:!1,callbacks:[a]},u.addEventListener("load",function runCallbacks(n){return function(){o[n].isLoaded=!0,o[n].callbacks.map(function(n){return n()})}}(e))}}},292:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t(17),r=t.n(a),o=t(10),i=t.n(o),s=t(11),u=t.n(s),c=t(18),l=t.n(c),d=t(19),m=t.n(d),p=t(23),f=t.n(p),g=t(0),b=t.n(g),v=t(1),h=(t.n(v),t(3)),_=t(1397),k="src/components/Embed/elements/Instagram.js",I=Object(h.d)(function instagramWrapper(){return{clear:"both",overflow:"hidden",position:"relative",margin:"0 auto",marginBottom:"-12px"}},"figure",function(n){return f()(n)}),y=function updateScript(){window.instgrm.Embeds.process()},L=function(n){function Instagram(){return i()(this,Instagram),l()(this,(Instagram.__proto__||r()(Instagram)).apply(this,arguments))}return m()(Instagram,n),u()(Instagram,[{key:"componentDidMount",value:function componentDidMount(){Object(_.a)("//platform.instagram.com/en_US/embeds.js","instagram-js",!0,this.props.onLoadCallback,y)}},{key:"render",value:function render(){return b.a.createElement(I,{__source:{fileName:k,lineNumber:57}},b.a.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.content},__source:{fileName:k,lineNumber:58}}))}}]),Instagram}(b.a.Component);L.defaultProps={onLoadCallback:null},e.default=L}});