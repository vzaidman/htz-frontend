webpackJsonp([13],{1165:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var o=t(73),a=t.n(o),c={},r=function appendScript(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;if(c[n])c[n].isLoaded?r&&r():c[n].callbacks.push(o);else{var i=document.createElement("script");i.src=e,i.async=t,i.id=n,s&&a()(s).map(function(e){return i.setAttribute(e,s[e])}),document.body.appendChild(i),c[n]={tag:i,isLoaded:!1,callbacks:[o]},i.addEventListener("load",function runCallbacks(e){return function(){c[e].isLoaded=!0,c[e].callbacks.map(function(e){return e()})}}(n))}}},248:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t(22),a=t.n(o),c=t(14),r=t.n(c),s=t(15),i=t.n(s),l=t(23),d=t.n(l),u=t(24),m=t.n(u),p=t(0),b=t.n(p),f=t(1),k=(t.n(f),t(1165)),v=function(e){function FacebookComments(){var e,n,t,o;r()(this,FacebookComments);for(var c=arguments.length,s=Array(c),i=0;i<c;i++)s[i]=arguments[i];return n=t=d()(this,(e=FacebookComments.__proto__||a()(FacebookComments)).call.apply(e,[this].concat(s))),t.initScript=function(){FB.init({appId:"110687712359084",status:!0,xfbml:!0,version:"v2.9"}),FB.Event.subscribe("xfbml.render",function(){console.log("fb embed is loaded"),t.props.onLoadCallback&&t.props.onLoadCallback()})},t.updateScript=function(){FB.XFBML.parse()},o=n,d()(t,o)}return m()(FacebookComments,e),i()(FacebookComments,[{key:"componentDidMount",value:function componentDidMount(){Object(k.a)("//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.9","facebook-jssdk",!0,this.initScript,this.updateScript)}},{key:"render",value:function render(){var e=this.props,n=e.content,t=e.embedType;return b.a.createElement("div",{className:"fb-comments","data-width":"100%","data-href":location.href,"data-order-by":t,"data-numposts":n,__source:{fileName:"src/components/Embed/elements/FacebookComments.js",lineNumber:62}})}}]),FacebookComments}(b.a.Component);v.defaultProps={onLoadCallback:null},n.default=v}});